import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { timingSafeEqual } from "crypto";
import { SITE_URL, unsubscribeApiUrl, unsubscribePageUrl } from "@/lib/newsletter";
import { echeancesAnnee, formatJour, Periodicite } from "@/lib/echeances";

export const dynamic = "force-dynamic";
const JOURS_AVANT = 5;

function authorized(req: NextRequest): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected || expected.length < 16) return false;
  const given = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: "RESEND_API_KEY manquante" }, { status: 500 });

  const cible = new Date();
  cible.setDate(cible.getDate() + JOURS_AVANT);
  const jour = iso(cible);
  const aujourdhui = iso(new Date());

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data, error } = await supabase.from("echeance_abonnes").select("email, periodicite, derniere_envoyee").eq("actif", true);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = `Avenlib <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`;
  let envoyes = 0;
  for (const a of data ?? []) {
    if (a.derniere_envoyee === aujourdhui) continue;
    const e = echeancesAnnee(cible.getFullYear(), a.periodicite as Periodicite).find((x) => x.date === jour);
    if (!e) continue;
    const { error: sendErr } = await resend.emails.send({
      from, to: a.email,
      subject: `Dans ${JOURS_AVANT} jours : ${e.titre}`,
      html: `<div style="font-family:Arial,sans-serif;color:#2C2C2A;max-width:560px;margin:0 auto;padding:24px;background:#F1EFE8"><p style="font-size:18px;font-weight:bold;color:#1F4A3F">Avenlib</p><p>Rappel : <b>${e.titre}</b></p><p style="text-transform:capitalize">${formatJour(e.date)}</p><p>${e.detail}</p><p style="margin:24px 0"><a href="${SITE_URL}/outils/echeances-independant" style="background:#15805F;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Voir toutes mes échéances</a></p><p style="font-size:12px;color:#6B6B67">Tu reçois cet email car tu as demandé ces rappels. <a href="${unsubscribePageUrl(a.email)}" style="color:#6B6B67">Me désinscrire</a></p></div>`,
      headers: { "List-Unsubscribe": `<${unsubscribeApiUrl(a.email)}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    });
    if (!sendErr) {
      await supabase.from("echeance_abonnes").update({ derniere_envoyee: aujourdhui }).eq("email", a.email);
      envoyes++;
    }
  }
  return NextResponse.json({ ok: true, envoyes });
}
