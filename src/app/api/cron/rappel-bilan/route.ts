import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { timingSafeEqual } from "crypto";
import { SITE_URL, unsubscribeApiUrl, unsubscribePageUrl } from "@/lib/newsletter";

export const dynamic = "force-dynamic";

const MAX_PAR_PASSAGE = 50;

function authorized(req: NextRequest): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected || expected.length < 16) return false;
  const given = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

function html(prenom: string | null, email: string) {
  const salut = prenom ? `Bonjour ${esc(prenom)},` : "Bonjour,";
  return `<div style="font-family:Arial,sans-serif;color:#2C2C2A;max-width:560px;margin:0 auto;padding:24px;background:#F1EFE8">
<p style="font-size:18px;font-weight:bold;color:#1F4A3F">Avenlib</p>
<p>${salut}</p>
<p>Ton bilan Avenlib date d'il y a environ 6 mois. Depuis, ton activité, tes revenus ou ta protection ont peut-être changé.</p>
<p>Le refaire prend 3 minutes et te montre où tu en es aujourd'hui.</p>
<p style="margin:24px 0"><a href="${SITE_URL}/diagnostic" style="background:#15805F;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Refaire mon bilan</a></p>
<p style="font-size:12px;color:#6B6B67">Tu reçois cet email car tu as accepté de recevoir les emails d'Avenlib. <a href="${unsubscribePageUrl(email)}" style="color:#6B6B67">Me désinscrire</a></p>
</div>`;
}

// Appelé chaque jour par Vercel Cron (en-tête Authorization: Bearer CRON_SECRET).
export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: "RESEND_API_KEY manquante" }, { status: 500 });

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const limite = new Date(Date.now() - 183 * 24 * 3600 * 1000).toISOString();

  const { data, error } = await supabase
    .from("profiles")
    .select("email, prenom")
    .eq("newsletter_consent", true)
    .not("statut", "is", null)
    .is("rappel_bilan_at", null)
    .is("newsletter_unsubscribed_at", null)
    .lte("created_at", limite)
    .limit(MAX_PAR_PASSAGE);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = `Avenlib <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`;
  let envoyes = 0;
  for (const p of data ?? []) {
    if (!p.email) continue;
    const { error: sendErr } = await resend.emails.send({
      from,
      to: p.email,
      subject: "Ton bilan Avenlib a 6 mois : on le met à jour ?",
      html: html(p.prenom, p.email),
      headers: {
        "List-Unsubscribe": `<${unsubscribeApiUrl(p.email)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
    if (!sendErr) {
      await supabase.from("profiles").update({ rappel_bilan_at: new Date().toISOString() }).eq("email", p.email);
      envoyes++;
    }
  }
  return NextResponse.json({ ok: true, candidats: data?.length ?? 0, envoyes });
}
