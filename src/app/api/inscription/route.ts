import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { user_id, prenom, nom, email, newsletter, answers } = await request.json();

    if (!prenom || !email || !answers) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    // Supabase — lazy init pour éviter les erreurs de build
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
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Avenlib <bonjour@avenlib.fr>",
          to: email,
          subject: `${prenom}, ton diagnostic Avenlib est prêt`,
          html: buildEmailHtml(prenom, answers),
        });
      } catch (emailErr) {
        console.error("Email error:", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inscription error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function buildEmailHtml(prenom: string, answers: Record<string, string | string[]>) {
  const existant = Array.isArray(answers.existant)
    ? answers.existant.join(", ")
    : answers.existant || "Non renseigné";

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: Inter, Arial, sans-serif; color: #2C2C2A; background: #f9f9f9; margin: 0; padding: 0;">
  <div style="max-width: 560px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5;">
    <div style="background: #085041; padding: 32px 40px;">
      <p style="color: white; font-size: 22px; font-weight: 700; margin: 0;">
        <span style="color: #1D9E75;">●</span> Avenlib
      </p>
    </div>
    <div style="padding: 40px;">
      <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 8px;">
        Bonjour ${prenom} 👋
      </h1>
      <p style="color: #666; margin: 0 0 24px; line-height: 1.6;">
        Ton diagnostic financier est prêt. Voici un résumé de ta situation :
      </p>
      <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <p style="margin: 0 0 8px; font-size: 14px;"><strong>Statut :</strong> ${answers.statut}</p>
        <p style="margin: 0 0 8px; font-size: 14px;"><strong>Revenus :</strong> ${answers.revenus}/an</p>
        <p style="margin: 0 0 8px; font-size: 14px;"><strong>Déjà en place :</strong> ${existant}</p>
        <p style="margin: 0; font-size: 14px;"><strong>Prévoyance :</strong> ${answers.prevoyance_niveau}</p>
      </div>
      <a href="https://avenlib.fr/resultats"
         style="display: inline-block; background: #1D9E75; color: white; text-decoration: none;
                padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">
        Voir mon diagnostic complet →
      </a>
      <p style="margin-top: 32px; font-size: 12px; color: #999;">
        © 2026 Avenlib ·
        <a href="https://avenlib.fr/mentions-legales" style="color: #999;">Mentions légales</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}
