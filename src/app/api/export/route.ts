import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "avenlib-admin-2024";

type ProfileRow = {
  id: unknown;
  created_at: unknown;
  email: unknown;
  prenom: unknown;
  nom: unknown;
  statut: unknown;
  secteur: unknown;
  anciennete: unknown;
  revenus: unknown;
  situation_familiale: unknown;
  age: unknown;
  existant: unknown;
  prevoyance_niveau: unknown;
  objectifs: unknown;
  sentiment_financier: unknown;
  logement: unknown;
  compte_bancaire_pro: unknown;
  assurance_rc_pro: unknown;
  newsletter_consent: unknown;
};

const HEADERS = [
  "id", "created_at", "email", "prenom", "nom",
  "statut", "secteur", "anciennete", "revenus",
  "situation_familiale", "age", "existant",
  "prevoyance_niveau", "objectifs", "sentiment_financier",
  "logement", "compte_bancaire_pro", "assurance_rc_pro", "newsletter_consent",
];

function formatDate(v: unknown): string {
  if (!v) return "";
  const d = new Date(String(v));
  if (isNaN(d.getTime())) return String(v);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function escape(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = Array.isArray(v) ? v.join(", ") : String(v);
  return `"${s.replace(/"/g, '""')}"`;
}

function rowToCsv(row: ProfileRow): string {
  return [
    escape(row.id),
    escape(formatDate(row.created_at)),
    escape(row.email),
    escape(row.prenom),
    escape(row.nom),
    escape(row.statut),
    escape(row.secteur),
    escape(row.anciennete),
    escape(row.revenus),
    escape(row.situation_familiale),
    escape(row.age),
    escape(row.existant),
    escape(row.prevoyance_niveau),
    escape(row.objectifs),
    escape(row.sentiment_financier),
    escape(row.logement),
    escape(row.compte_bancaire_pro),
    escape(row.assurance_rc_pro),
    escape(row.newsletter_consent),
  ].join(";");
}

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
    .select(HEADERS.join(", "))
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const header = HEADERS.join(";");
  const rows = (data ?? []).map((row) => rowToCsv(row as unknown as ProfileRow));
  const csv = [header, ...rows].join("\n");

  const bom = "﻿";
  return new NextResponse(bom + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="avenlib-inscriptions-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
