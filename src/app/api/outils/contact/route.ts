import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { OUTILS } from "@/lib/outils";
import { unsubscribeApiUrl, SITE_URL } from "@/lib/newsletter";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Limite simple par IP (par instance serveur), en plus du champ piège.
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
    const { email, slug, resume, newsletter, website } = await request.json();
    if (website) return NextResponse.json({ ok: true }); // champ piège
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnu";
    if (limited(ip)) return NextResponse.json({ error: "Trop de demandes, réessaie dans quelques minutes." }, { status: 429 });

    const mail = String(email ?? "").trim().toLowerCase();
    const outil = OUTILS.find((o) => o.slug === slug);
    if (!EMAIL_RE.test(mail) || mail.length > 200 || !outil) {
      return NextResponse.json({ error: "Email ou outil invalide" }, { status: 400 });
    }
    const lignes: string[] = Array.isArray(resume) ? resume.slice(0, 12).map((l) => String(l).slice(0, 200)) : [];
    const consent = newsletter === true;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      const { error } = await supabase.from("outil_contacts").insert({ email: mail, outil: slug, newsletter_consent: consent, resume: lignes });
      if (error) console.error("[outils/contact] Supabase :", error);
      if (consent) {
        const { error: pErr } = await supabase.from("profiles").upsert(
          { email: mail, newsletter_consent: true, newsletter_consent_at: new Date().toISOString(), newsletter_unsubscribed_at: null, updated_at: new Date().toISOString() },
          { onConflict: "email" }
        );
        if (pErr) console.error("[outils/contact] profiles :", pErr);
      }
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
      const pied = consent
        ? `Tu as accepté de recevoir la newsletter Avenlib. <a href="${unsubscribeApiUrl(mail)}" style="color:#6B6B67">Se désabonner</a>.`
        : "Cet email t'a été envoyé une seule fois, à ta demande. Nous ne t'écrirons pas d'autre message sans ton accord.";
      const html = `<div style="font-family:Arial,sans-serif;background:#F1EFE8;padding:24px"><div style="max-width:560px;margin:auto;background:#fff;border-radius:16px;padding:32px;color:#2C2C2A">
<h1 style="font-size:22px;margin:0 0 8px">${esc(outil.titre)}</h1>
<p style="color:#6B6B67;margin:0 0 20px">Voici le résultat de ton calcul sur Avenlib.</p>
<ul style="padding-left:18px;line-height:1.7">${lignes.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
<p style="font-size:13px;color:#6B6B67">Estimation indicative, pas un conseil personnalisé. Chiffres 2026.</p>
<p style="margin:24px 0"><a href="${SITE_URL}/diagnostic" style="background:#15805F;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Faire mon bilan gratuit</a></p>
<p style="font-size:12px;color:#6B6B67;margin:0">${pied}</p></div></div>`;
      const { error } = await resend.emails.send({ from: `Avenlib <${from}>`, to: mail, subject: `Ton résultat : ${outil.titre}`, html });
      if (error) console.error("[outils/contact] Resend :", JSON.stringify(error));
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[outils/contact]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
