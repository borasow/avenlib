import { createHmac, timingSafeEqual } from "crypto";

export const SITE_URL = "https://avenlib.fr";

function secret(): string {
  const s = process.env.NEWSLETTER_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!s) throw new Error("Secret newsletter manquant");
  return s;
}

export function signEmail(email: string): string {
  return createHmac("sha256", secret()).update("unsub:" + email.trim().toLowerCase()).digest("hex").slice(0, 40);
}

export function verifyEmail(email: string, token: string): boolean {
  try {
    const expected = Buffer.from(signEmail(email));
    const given = Buffer.from(token ?? "");
    return expected.length === given.length && timingSafeEqual(expected, given);
  } catch {
    return false;
  }
}

export function unsubscribePageUrl(email: string): string {
  return `${SITE_URL}/desabonnement?e=${encodeURIComponent(email)}&t=${signEmail(email)}`;
}

export function unsubscribeApiUrl(email: string): string {
  return `${SITE_URL}/api/newsletter/unsubscribe?e=${encodeURIComponent(email)}&t=${signEmail(email)}`;
}
