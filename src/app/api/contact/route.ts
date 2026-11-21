import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOTIFS = ["Question sur mon bilan", "Partenariat", "Presse", "Signaler une erreur sur le site", "Supprimer mes données", "Autre"];
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 4;
}

export async function POST(request: NextRequest) {
  try {
    const b = await request.json();
    if (b.website) return NextResponse.json({ ok: true }); // champ piège
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnu";
    if (limited(ip)) return NextResponse.json({ error: "Trop de messages, réessaie dans quelques minutes." }, { status: 429 });

    const prenom = String(b.prenom ?? "").trim().slice(0, 80);
    const nom = String(b.nom ?? "").trim().slice(0, 80);
    const email = String(b.email ?? "").trim().toLowerCase().slice(0, 200);
    const motif = String(b.motif ?? "");
    const message = String(b.message ?? "").trim().slice(0, 4000);
    if (!prenom || !nom || !EMAIL_RE.test(email) || !MOTIFS.includes(motif) || message.length < 5) {
      return NextResponse.json({ error: "Merci de remplir tous les champs." }, { status: 400 });
    }

    let enregistre = false;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      const { error } = await supabase.from("contact_messages").insert({ prenom, nom, email, motif, message });
      enregistre = !error;
    }

    let envoye = false;
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: `Avenlib <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`,
        to: process.env.CONTACT_TO ?? "contact@avenlib.fr",
        replyTo: email,
        subject: `[Contact] ${motif} : ${prenom} ${nom}`,
        html: `<div style="font-family:Arial,sans-serif;color:#2C2C2A"><p><b>${esc(prenom)} ${esc(nom)}</b> (${esc(email)})</p><p>Motif : ${esc(motif)}</p><p style="white-space:pre-wrap">${esc(message)}</p></div>`,
      });
      envoye = !error;
    }

    if (!enregistre && !envoye) return NextResponse.json({ error: "Envoi impossible pour le moment. Réessaie plus tard." }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}
