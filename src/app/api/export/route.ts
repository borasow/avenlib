import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "avenlib-admin-2024";

const COLUMNS = [
  "id", "created_at", "email", "prenom", "nom",
  "statut", "secteur", "anciennete", "revenus",
  "situation_familiale", "age", "existant",
  "prevoyance_niveau", "objectifs", "sentiment_financier",
  "logement", "compte_bancaire_pro", "assurance_rc_pro", "newsletter_consent",
];

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("profiles")
    .select(COLUMNS.join(", "))
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const escape = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = Array.isArray(v) ? v.join(", ") : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };

  const header = COLUMNS.join(";");
  const rows = (data ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    return COLUMNS.map((col) => escape(r[col])).join(";");
  });
  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="avenlib-inscriptions-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
