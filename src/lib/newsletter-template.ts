import { NewsletterIssue } from "./newsletters";
import { unsubscribePageUrl } from "./newsletter";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function renderNewsletter(issue: NewsletterIssue, email: string): string {
  const blocs = issue.blocs
    .map(
      (b) => `
      <h2 style="margin:28px 0 8px;font-size:18px;color:#2C2C2A;">${esc(b.titre)}</h2>
      <p style="margin:0 0 10px;font-size:15px;line-height:1.6;color:#4A4A47;">${esc(b.texte)}</p>
      ${
        b.lien
          ? `<p style="margin:0;"><a href="${esc(b.lien.url)}" style="color:#1D9E75;font-weight:600;">${esc(b.lien.label)}</a></p>`
          : ""
      }`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="fr"><body style="margin:0;background:#F1EFE8;font-family:Arial,Helvetica,sans-serif;">
<span style="display:none;max-height:0;overflow:hidden;">${esc(issue.preheader)}</span>
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px;">
  <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#FFFFFF;border-radius:14px;overflow:hidden;">
    <tr><td style="background:#085041;padding:20px 28px;color:#FFFFFF;font-size:20px;font-weight:700;">&#9679; Avenlib</td></tr>
    <tr><td style="padding:28px;">
      <h1 style="margin:0 0 12px;font-size:24px;color:#2C2C2A;">${esc(issue.titre)}</h1>
      <p style="margin:0;font-size:15px;line-height:1.6;color:#4A4A47;">${esc(issue.intro)}</p>
      ${blocs}
      <div style="margin-top:32px;padding:20px;background:#E1F5EE;border-radius:12px;text-align:center;">
        <p style="margin:0 0 14px;font-size:15px;color:#085041;">${esc(issue.cta.texte)}</p>
        <a href="${esc(issue.cta.url)}" style="display:inline-block;background:#1D9E75;color:#FFFFFF;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:10px;">${esc(issue.cta.label)}</a>
      </div>
    </td></tr>
    <tr><td style="padding:20px 28px;border-top:1px solid #E8E6DF;font-size:12px;line-height:1.6;color:#6B6B67;">
      Vous recevez cet email car vous avez accepté la newsletter d'Avenlib lors de votre bilan.
      Avenlib peut être rémunéré par certains partenaires, sans modifier le prix que vous payez.
      Ces informations sont générales et ne constituent pas un conseil personnalisé.<br><br>
      <a href="${esc(unsubscribePageUrl(email))}" style="color:#6B6B67;">Me désinscrire</a> &middot;
      <a href="https://avenlib.fr/mentions-legales" style="color:#6B6B67;">Mentions légales</a>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}
