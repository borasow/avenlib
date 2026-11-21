import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "avenlib_admin";

function secret(): string {
  const s = process.env.ADMIN_SECRET ?? "";
  return s.length >= 12 ? s : "";
}

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function checkPassword(given: string): boolean {
  const s = secret();
  return !!s && safeEqual(given, s);
}

export function sessionToken(): string {
  return createHmac("sha256", secret()).update("admin-session").digest("hex");
}

export function isAdminCookie(value: string | undefined): boolean {
  if (!secret() || !value) return false;
  return safeEqual(value, sessionToken());
}
