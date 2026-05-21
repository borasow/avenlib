import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token manquant" }, { status: 400 });
  }

  const { data: tokenRow } = await supabase
    .from("partenaire_tokens")
    .select("partenaire_slug, partenaire_nom")
    .eq("token", token)
    .maybeSingle();

  if (!tokenRow) {
    return NextResponse.json({ error: "Token invalide" }, { status: 403 });
  }

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .eq("partenaire_slug", tokenRow.partenaire_slug)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }

  return NextResponse.json({ partenaire_nom: tokenRow.partenaire_nom, leads });
}
