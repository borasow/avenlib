import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DELAYS = [1, 3, 5, 7]; // jours

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prenom, nom, email, telephone, partenaire_nom, partenaire_slug, domaine, user_id } = body;

    if (!prenom || !nom || !email || !telephone || !partenaire_nom || !partenaire_slug || !domaine) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Compter les leads existants pour cet email
    const { count } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("email", email);

    const delayIndex = Math.min((count ?? 0), DELAYS.length - 1);
    const delayDays = DELAYS[delayIndex];
    const scheduled_at = new Date(Date.now() + delayDays * 24 * 60 * 60 * 1000).toISOString();

    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        prenom,
        nom,
        email,
        telephone,
        partenaire_nom,
        partenaire_slug,
        domaine,
        statut: "nouveau",
        scheduled_at,
        user_id: user_id ?? null,
      })
      .select()
      .single();

    if (error) throw error;

    // Récupérer l'email partenaire depuis partenaire_tokens
    const { data: tokenRow } = await supabase
      .from("partenaire_tokens")
      .select("email_partenaire")
      .eq("partenaire_slug", partenaire_slug)
      .maybeSingle();

    const emailPartenaire = tokenRow?.email_partenaire ?? "contact@avenlib.fr";

    // Envoyer les emails via Resend
    if (process.env.RESEND_API_KEY) {
      await sendEmails({ prenom, nom, email, telephone, partenaire_nom, domaine, emailPartenaire, lead_id: lead.id });
    }

    return NextResponse.json({ ok: true, lead_id: lead.id });
  } catch (err) {
    console.error("[POST /api/leads]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

async function sendEmails({
  prenom, nom, email, telephone, partenaire_nom, domaine, emailPartenaire, lead_id,
}: {
  prenom: string; nom: string; email: string; telephone: string;
  partenaire_nom: string; domaine: string; emailPartenaire: string; lead_id: string;
}) {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const DOMAINE_LABELS: Record<string, string> = {
    retraite: "Retraite", prevoyance: "Prévoyance arrêt maladie",
    sante: "Mutuelle santé", fiscalite: "Optimisation fiscale",
    deces: "Prévoyance décès/invalidité", banque_pro: "Banque professionnelle",
    assurance_pro: "Assurance RC Pro", epargne: "Épargne & investissement",
    credit: "Crédit immobilier", portage_salarial: "Portage salarial",
  };

  const domaineLabel = DOMAINE_LABELS[domaine] ?? domaine;

  await Promise.allSettled([
    // Email à l'utilisateur
    resend.emails.send({
      from: "Avenlib <bonjour@avenlib.fr>",
      to: email,
      subject: `Ta demande de contact chez ${partenaire_nom} est confirmée`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #2C2C2A;">
          <h2 style="color: #1D9E75;">Bonjour ${prenom},</h2>
          <p>Ta demande de contact auprès de <strong>${partenaire_nom}</strong> (${domaineLabel}) a bien été transmise.</p>
          <p>Un conseiller va te recontacter dans les prochains jours au <strong>${telephone}</strong>.</p>
          <p style="color: #6B6B67; font-size: 14px;">En attendant, tu peux consulter ton bilan complet sur <a href="https://avenlib.fr/resultats" style="color: #1D9E75;">avenlib.fr/resultats</a>.</p>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />
          <p style="color: #9B9B97; font-size: 12px;">Avenlib · Le bilan financier des indépendants</p>
        </div>
      `,
    }),
    // Email au partenaire
    resend.emails.send({
      from: "Avenlib <leads@avenlib.fr>",
      to: emailPartenaire,
      subject: `Nouveau lead Avenlib — ${prenom} ${nom} (${domaineLabel})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #2C2C2A;">
          <h2 style="color: #1D9E75;">Nouveau lead via Avenlib</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px 0; font-weight: 600; width: 140px;">Prénom</td><td>${prenom}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Nom</td><td>${nom}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td><a href="mailto:${email}" style="color: #1D9E75;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Téléphone</td><td>${telephone}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Domaine</td><td>${domaineLabel}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">ID Lead</td><td style="font-size: 12px; color: #9B9B97;">${lead_id}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />
          <p style="color: #9B9B97; font-size: 12px;">Lead transmis par Avenlib · avenlib.fr</p>
        </div>
      `,
    }),
  ]);
}
