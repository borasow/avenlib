import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { token, statut, notes } = await req.json();

    if (!token || !statut) {
      return NextResponse.json({ error: "token et statut requis" }, { status: 400 });
    }

    // Vérifier que le token est valide et récupérer le slug partenaire
    const { data: tokenRow } = await supabase
      .from("partenaire_tokens")
      .select("partenaire_slug")
      .eq("token", token)
      .maybeSingle();

    if (!tokenRow) {
      return NextResponse.json({ error: "Token invalide" }, { status: 403 });
    }

    // Vérifier que le lead appartient à ce partenaire
    const { data: lead } = await supabase
      .from("leads")
      .select("partenaire_slug")
      .eq("id", params.id)
      .maybeSingle();

    if (!lead || lead.partenaire_slug !== tokenRow.partenaire_slug) {
      return NextResponse.json({ error: "Lead introuvable" }, { status: 404 });
    }

    const update: Record<string, string> = { statut };
    if (notes !== undefined) update.notes = notes;

    const { error } = await supabase.from("leads").update(update).eq("id", params.id);
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PATCH /api/leads/:id]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
