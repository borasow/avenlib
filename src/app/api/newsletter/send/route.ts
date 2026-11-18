import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { timingSafeEqual } from "crypto";
import { getIssue } from "@/lib/newsletters";
import { renderNewsletter } from "@/lib/newsletter-template";
import { unsubscribeApiUrl } from "@/lib/newsletter";

function authorized(req: NextRequest): boolean {
  const expected = process.env.NEWSLETTER_ADMIN_SECRET;
  const given = req.headers.get("x-admin-secret") ?? "";
  if (!expected || expected.length < 16) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Corps : { issue: "2026-12", mode: "test" | "dry" | "send", to?: "adresse", confirm?: "2026-12" }
 * - test : envoie le numéro à `to` uniquement
 * - dry  : compte les destinataires, n'envoie rien
 * - send : envoie aux abonnés consentants, une seule fois par numéro (journal newsletter_sends)
 */
export async function POST(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: "RESEND_API_KEY manquante" }, { status: 500 });

  const { issue: issueId, mode, to, confirm } = await req.json();
  const issue = getIssue(issueId);
  if (!issue) return NextResponse.json({ error: "Numéro inconnu" }, { status: 404 });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = `Avenlib <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`;

  const build = (email: string) => ({
    from,
    to: email,
    subject: issue.sujet,
    html: renderNewsletter(issue, email),
    headers: {
      "List-Unsubscribe": `<${unsubscribeApiUrl(email)}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });

  if (mode === "test") {
    if (!to) return NextResponse.json({ error: "Adresse 'to' manquante" }, { status: 400 });
    const { error } = await resend.emails.send(build(to));
    return NextResponse.json({ ok: !error, error: error?.message });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: subs, error: subsError } = await supabase
    .from("profiles")
    .select("email")
    .eq("newsletter_consent", true)
    .is("newsletter_unsubscribed_at", null)
    .not("email", "is", null);
  if (subsError) return NextResponse.json({ error: "Lecture des abonnés impossible" }, { status: 500 });

  const { data: already } = await supabase.from("newsletter_sends").select("email").eq("issue_id", issue.id);
  const done = new Set((already ?? []).map((r) => r.email));
  const recipients = Array.from(new Set((subs ?? []).map((s) => s.email as string))).filter((e) => !done.has(e));

  if (mode === "dry") return NextResponse.json({ recipients: recipients.length, dejaEnvoyes: done.size });
  if (mode !== "send" || confirm !== issue.id) {
    return NextResponse.json({ error: "Pour envoyer, passez mode 'send' et confirm égal à l'id du numéro" }, { status: 400 });
  }

  let sent = 0;
  for (let i = 0; i < recipients.length; i += 50) {
    const chunk = recipients.slice(i, i + 50);
    const { error } = await resend.batch.send(chunk.map(build));
    if (error) return NextResponse.json({ ok: false, sent, error: error.message }, { status: 502 });
    await supabase.from("newsletter_sends").insert(chunk.map((email) => ({ issue_id: issue.id, email })));
    sent += chunk.length;
  }
  return NextResponse.json({ ok: true, sent });
}
