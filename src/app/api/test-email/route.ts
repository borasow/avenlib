import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  console.log("[test-email] RESEND_API_KEY présente :", !!process.env.RESEND_API_KEY);
  console.log("[test-email] RESEND_FROM_EMAIL :", process.env.RESEND_FROM_EMAIL);

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY manquante" }, { status: 500 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromAddress = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    const { data, error } = await resend.emails.send({
      from: `Avenlib <${fromAddress}>`,
      to: "bora.sow@gmail.com",
      subject: "Test Resend — Avenlib ✅",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 40px auto; padding: 32px; border: 1px solid #e5e5e5; border-radius: 12px;">
          <h1 style="color: #085041; margin: 0 0 16px;">✅ Resend fonctionne</h1>
          <p style="color: #444; line-height: 1.6;">
            Cet email de test confirme que la configuration Resend est correcte pour Avenlib.
          </p>
          <p style="color: #999; font-size: 13px; margin-top: 24px;">
            From : <strong>${fromAddress}</strong><br/>
            Envoyé le : ${new Date().toLocaleString("fr-FR")}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[test-email] Erreur :", JSON.stringify(error));
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    console.log("[test-email] Envoyé, id :", data?.id);
    return NextResponse.json({ success: true, id: data?.id, from: fromAddress });
  } catch (err) {
    console.error("[test-email] Exception :", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
