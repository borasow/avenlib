import { NewsletterIssue, NewsletterBloc } from "./newsletters";
import { unsubscribePageUrl } from "./newsletter";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const P = (t: string) => `<p style="margin:0 0 12px;font-size:16px;line-height:1.65;color:#3F3F3C;">${esc(t)}</p>`;

function bloc(b: NewsletterBloc): string {
  const parts: string[] = [];
  parts.push(`<h2 style="margin:36px 0 12px;font-size:21px;line-height:1.3;color:#2C2C2A;">${esc(b.titre)}</h2>`);
  b.paragraphes.forEach((p) => parts.push(P(p)));
  if (b.image) {
    parts.push(
      `<img src="${esc(b.image.src)}" alt="${esc(b.image.alt)}" width="504" style="display:block;width:100%;max-width:504px;height:auto;border:1px solid #E8E6DF;border-radius:10px;margin:8px 0 16px;">`
    );
  }
  if (b.liste) {
    parts.push(
      `<ul style="margin:0 0 14px;padding-left:20px;">${b.liste
        .map((l) => `<li style="margin:0 0 8px;font-size:16px;line-height:1.6;color:#3F3F3C;">${esc(l)}</li>`)
        .join("")}</ul>`
    );
  }
  if (b.etapes) {
    parts.push(
      b.etapes
        .map(
          (e, i) => `<table cellpadding="0" cellspacing="0" style="margin:0 0 10px;width:100%;"><tr>
            <td width="36" valign="top"><div style="width:28px;height:28px;border-radius:14px;background:#1D9E75;color:#FFFFFF;font-weight:700;font-size:14px;line-height:28px;text-align:center;">${i + 1}</div></td>
            <td valign="top" style="font-size:16px;line-height:1.6;color:#3F3F3C;padding-top:2px;">${esc(e)}</td></tr></table>`
        )
        .join("")
    );
  }
  if (b.lien) {
    parts.push(
      `<p style="margin:10px 0 0;"><a href="${esc(b.lien.url)}" style="color:#1D9E75;font-weight:700;font-size:16px;">${esc(b.lien.label)} &rarr;</a></p>`
    );
  }
  return parts.join("");
}

export function renderNewsletter(issue: NewsletterIssue, email: string): string {
  return `<!DOCTYPE html>
<html lang="fr"><body style="margin:0;background:#F1EFE8;font-family:Arial,Helvetica,sans-serif;">
<span style="display:none;max-height:0;overflow:hidden;">${esc(issue.preheader)}</span>
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px;">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:14px;overflow:hidden;">
    <tr><td><img src="${esc(issue.cover.src)}" alt="${esc(issue.cover.alt)}" width="600" style="display:block;width:100%;height:auto;"></td></tr>
    <tr><td style="padding:32px 48px 8px;">
      <h1 style="margin:0 0 14px;font-size:27px;line-height:1.25;color:#2C2C2A;">${esc(issue.titre)}</h1>
      ${P(issue.intro)}
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0 0;background:#E1F5EE;border-radius:12px;"><tr><td style="padding:22px;text-align:center;">
        <div style="font-size:46px;font-weight:700;color:#085041;line-height:1.1;">${esc(issue.chiffre.valeur)}</div>
        <div style="font-size:15px;color:#085041;margin-top:6px;">${esc(issue.chiffre.label)}</div>
      </td></tr></table>
      ${issue.blocs.map(bloc).join("")}
    </td></tr>
    <tr><td style="padding:8px 48px 8px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E6DF;border-radius:12px;overflow:hidden;">
        <tr><td><img src="${esc(issue.blog.image)}" alt="" width="502" style="display:block;width:100%;height:auto;"></td></tr>
        <tr><td style="padding:18px 20px;">
          <div style="font-size:18px;font-weight:700;color:#2C2C2A;line-height:1.35;margin-bottom:8px;">${esc(issue.blog.titre)}</div>
          <div style="font-size:15px;line-height:1.6;color:#3F3F3C;margin-bottom:12px;">${esc(issue.blog.texte)}</div>
          <a href="${esc(issue.blog.url)}" style="color:#1D9E75;font-weight:700;font-size:15px;">Lire l'article &rarr;</a>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:24px 48px 36px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#085041;border-radius:12px;"><tr><td style="padding:28px;text-align:center;">
        <p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#FFFFFF;">${esc(issue.cta.texte)}</p>
        <a href="${esc(issue.cta.url)}" style="display:inline-block;background:#FFFFFF;color:#085041;text-decoration:none;font-weight:700;padding:13px 28px;border-radius:10px;">${esc(issue.cta.label)}</a>
      </td></tr></table>
    </td></tr>
    <tr><td style="padding:20px 48px 28px;border-top:1px solid #E8E6DF;font-size:12px;line-height:1.7;color:#6B6B67;">
      Vous recevez cet email car vous avez accepté la newsletter d'Avenlib lors de votre bilan.
      Avenlib peut être rémunéré par certains partenaires, sans modifier le prix que vous payez.
      Ces informations sont générales et ne constituent pas un conseil personnalisé : vérifiez les règles et montants auprès des sources officielles.<br><br>
      <a href="${esc(unsubscribePageUrl(email))}" style="color:#6B6B67;">Me désinscrire</a> &middot;
      <a href="https://avenlib.fr/mentions-legales" style="color:#6B6B67;">Mentions légales</a>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}
