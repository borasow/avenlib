import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { SITE_URL, unsubscribeApiUrl, unsubscribePageUrl } from "@/lib/newsletter";
import { prochaines, formatJour, Periodicite } from "@/lib/echeances";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

export async function POST(request: NextRequest) {
  try {
    const { email, periodicite, website } = await request.json();
    if (website) return NextResponse.json({ ok: true });
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnu";
    if (limited(ip)) return NextResponse.json({ error: "Trop de demandes, réessaie dans quelques minutes." }, { status: 429 });
    const mail = String(email ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(mail) || mail.length > 200 || !["mensuelle", "trimestrielle"].includes(periodicite)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Service indisponible" }, { status: 500 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { error } = await supabase.from("echeance_abonnes").upsert({ email: mail, periodicite, actif: true }, { onConflict: "email" });
    if (error) return NextResponse.json({ error: "Enregistrement impossible, réessaie." }, { status: 500 });

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = `Avenlib <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`;
      const lignes = prochaines(periodicite as Periodicite, new Date(), 3).map((e) => `<li><b>${e.titre}</b> : ${formatJour(e.date)}</li>`).join("");
      await resend.emails.send({
        from, to: mail,
        subject: "Tes rappels d'échéances Avenlib sont activés",
        html: `<div style="font-family:Arial,sans-serif;color:#2C2C2A;max-width:560px;margin:0 auto;padding:24px;background:#F1EFE8"><p style="font-size:18px;font-weight:bold;color:#1F4A3F">Avenlib</p><p>C'est noté. Tu recevras un email 5 jours avant chaque échéance. Les prochaines :</p><ul>${lignes}</ul><p style="font-size:12px;color:#6B6B67">Tu reçois cet email car tu as demandé ces rappels sur ${SITE_URL}. <a href="${unsubscribePageUrl(mail)}" style="color:#6B6B67">Me désinscrire</a></p></div>`,
        headers: { "List-Unsubscribe": `<${unsubscribeApiUrl(mail)}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
      }).catch(() => null);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
