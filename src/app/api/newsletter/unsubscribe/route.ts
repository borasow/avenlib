import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyEmail } from "@/lib/newsletter";

async function unsubscribe(email: string, token: string) {
  if (!email || !token || !verifyEmail(email, token)) return false;
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { error } = await supabase
    .from("profiles")
    .update({ newsletter_consent: false, newsletter_unsubscribed_at: new Date().toISOString() })
    .eq("email", email);
  await supabase.from("echeance_abonnes").update({ actif: false }).eq("email", email);
  return !error;
}

// One-click (en-tête List-Unsubscribe-Post) et bouton de la page de désinscription
export async function POST(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("e") ?? "";
  const token = req.nextUrl.searchParams.get("t") ?? "";
  const ok = await unsubscribe(email, token);
  return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
}

// Un simple clic sur le lien ne désinscrit pas (les scanners d'emails ouvrent les liens) : on affiche la page de confirmation.
export async function GET(req: NextRequest) {
  const url = new URL("/desabonnement", req.nextUrl.origin);
  url.search = req.nextUrl.search;
  return NextResponse.redirect(url);
}
