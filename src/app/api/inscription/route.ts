import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { calculerScores, DiagnosticAnswers } from "@/lib/scoring";

export async function POST(request: NextRequest) {
  try {
    const { user_id, prenom, nom, email, newsletter, answers } = await request.json();

    if (!prenom || !email || !answers) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    // Supabase, lazy init pour éviter les erreurs de build
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      const record: Record<string, unknown> = {
        prenom,
        nom:                 nom || null,
        email,
        statut:              answers.statut,
        secteur:             answers.secteur,
        anciennete:          answers.anciennete,
        revenus:             answers.revenus,
        situation_familiale: answers.situation_familiale,
        age:                 answers.age,
        existant:            answers.existant,
        prevoyance_niveau:   answers.prevoyance_niveau,
        objectifs:           answers.objectifs,
        sentiment_financier: answers.ressenti,
        logement:            answers.logement,
        compte_bancaire_pro: answers.banque_pro,
        assurance_rc_pro:    answers.rc_pro,
        newsletter_consent:  newsletter ?? false,
        updated_at:          new Date().toISOString(),
      };

      if (user_id) record.user_id = user_id;

      const { error: dbError } = await supabase.from("profiles").upsert(record, { onConflict: "email" });
      if (dbError) console.error("Supabase error:", dbError);
    }

    // Email de bienvenue via Resend
    console.log("[Resend] Envoi tenté à :", email);
    console.log("[Resend] RESEND_API_KEY présente :", !!process.env.RESEND_API_KEY);
    console.log("[Resend] RESEND_FROM_EMAIL :", process.env.RESEND_FROM_EMAIL ?? "(non définie, fallback resend.dev)");

    if (!process.env.RESEND_API_KEY) {
      console.warn("[Resend] RESEND_API_KEY manquante — email non envoyé.");
    } else {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromAddress = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
        const { data: emailData, error: emailError } = await resend.emails.send({
          from: `Avenlib <${fromAddress}>`,
          to: email,
          subject: `${prenom}, voici ton bilan Avenlib 🎯`,
          html: buildEmailHtml(prenom, answers as DiagnosticAnswers),
        });
        if (emailError) {
          console.error("[Resend] Erreur Resend :", JSON.stringify(emailError));
        } else {
          console.log("[Resend] Résultat Resend : OK, id =", emailData?.id);
        }
      } catch (emailErr) {
        console.error("[Resend] Exception :", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inscription error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

const DOMAINE_LABELS: Record<string, string> = {
  retraite:      "Retraite",
  prevoyance:    "Prévoyance arrêt maladie",
  sante:         "Mutuelle santé",
  fiscalite:     "Optimisation fiscale",
  deces:         "Prévoyance décès / invalidité",
  banque_pro:    "Banque professionnelle",
  assurance_pro: "Assurance RC Pro",
  epargne:       "Épargne & investissement",
  credit:        "Crédit immobilier",
};

function niveauEmoji(niveau: string): string {
  if (niveau === "urgent")    return "🔴 Urgent";
  if (niveau === "optimiser") return "🟡 À optimiser";
  return "🟢 OK";
}

function niveauColor(niveau: string): string {
  if (niveau === "urgent")    return "#DC2626";
  if (niveau === "optimiser") return "#D97706";
  return "#059669";
}

function scoreRow(label: string, niveau: string): string {
  return `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
        <span style="font-size: 14px; color: #2C2C2A; font-weight: 500;">${label}</span>
      </td>
      <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right;">
        <span style="font-size: 13px; font-weight: 600; color: ${niveauColor(niveau)};">${niveauEmoji(niveau)}</span>
      </td>
    </tr>`;
}

function buildEmailHtml(prenom: string, answers: DiagnosticAnswers): string {
  const scores = calculerScores(answers);
  const scoreKeys = Object.keys(scores);
  const urgentCount = scoreKeys.filter((k) => scores[k].niveau === "urgent").length;
  const pension = scores.retraite?.pensionEstimee;

  const scoresHtml = scoreKeys
    .map((k) => scoreRow(DOMAINE_LABELS[k] ?? k, scores[k].niveau))
    .join("");

  const alertBanner = urgentCount > 0
    ? `<div style="background: #FFF1F1; border: 1px solid #FECACA; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;">
        <p style="margin: 0; font-size: 14px; font-weight: 600; color: #DC2626;">
          ⚠️ ${urgentCount} domaine${urgentCount > 1 ? "s" : ""} nécessite${urgentCount > 1 ? "nt" : ""} une action urgente
        </p>
        <p style="margin: 6px 0 0; font-size: 13px; color: #991B1B;">
          Consulte tes recommandations personnalisées pour agir rapidement.
        </p>
       </div>`
    : "";

  const pensionBlock = pension
    ? `<div style="background: #EFF9F5; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;">
        <p style="margin: 0 0 4px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #059669;">Pension retraite estimée</p>
        <p style="margin: 0; font-size: 28px; font-weight: 700; color: #2C2C2A;">~${pension} €<span style="font-size: 14px; font-weight: 400; color: #6B6B67;">/mois</span></p>
        <p style="margin: 6px 0 0; font-size: 12px; color: #6B6B67;">Estimation indicative selon ton statut et tes revenus.</p>
       </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; color: #2C2C2A; background: #F1EFE8; margin: 0; padding: 0;">
  <div style="max-width: 560px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; border: 1px solid #D3D1C7;">

    <!-- Header -->
    <div style="background: #085041; padding: 28px 40px;">
      <p style="color: white; font-size: 20px; font-weight: 700; margin: 0;">
        <span style="color: #1D9E75;">●</span> Avenlib
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 36px 40px;">
      <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 6px; color: #2C2C2A;">
        Bonjour ${prenom} 👋
      </h1>
      <p style="color: #6B6B67; margin: 0 0 28px; font-size: 15px; line-height: 1.6;">
        Ton bilan est prêt. Voici un résumé de ta situation.
      </p>

      ${alertBanner}
      ${pensionBlock}

      <!-- Scores -->
      <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #9B9B97; margin: 0 0 4px;">Tes scores par domaine</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
        ${scoresHtml}
      </table>

      <!-- CTA -->
      <div style="text-align: center;">
        <a href="https://avenlib.fr/compte"
           style="display: inline-block; background: #1D9E75; color: white; text-decoration: none;
                  padding: 14px 32px; border-radius: 10px; font-weight: 700; font-size: 15px;">
          Voir mes recommandations →
        </a>
        <p style="margin: 14px 0 0; font-size: 12px; color: #9B9B97;">
          Tes recommandations sont disponibles dans ton espace personnel.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #F9F8F4; border-top: 1px solid #E8E6DF; padding: 20px 40px; text-align: center;">
      <p style="margin: 0; font-size: 13px; font-weight: 600; color: #2C2C2A;">
        Avenlib, L'indépendance sans l'inquiétude
      </p>
      <p style="margin: 6px 0 0; font-size: 12px; color: #9B9B97;">
        <a href="https://avenlib.fr/mentions-legales" style="color: #9B9B97; text-decoration: underline;">Mentions légales</a>
        &nbsp;·&nbsp;
        <a href="https://avenlib.fr/cgu" style="color: #9B9B97; text-decoration: underline;">CGU</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}
