"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";

export const eur = (n: number, d = 0) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d }) + " €";

const fieldStyle = { border: "2px solid #E8E6DF", backgroundColor: "#FFFFFF", color: "#2C2C2A" };

export function useNum(initial: number) {
  const [v, setV] = useState(String(initial));
  return [v, setV, Number(v.replace(",", ".")) || 0] as const;
}

export function Num({ label, hint, value, onChange, suffix }: { label: string; hint?: string; value: string; onChange: (v: string) => void; suffix?: string }) {
  return (
    <label className="block text-sm font-semibold" style={{ color: "#2C2C2A" }}>
      {label}
      <div className="relative mt-2">
        <input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value.replace(/[^0-9.,]/g, ""))} className="w-full rounded-lg px-3 py-3 text-base pr-12" style={fieldStyle} />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#6B6B67" }}>{suffix}</span>}
      </div>
      {hint && <span className="block mt-1 text-xs font-normal" style={{ color: "#6B6B67" }}>{hint}</span>}
    </label>
  );
}

export function Sel<T extends string>({ label, value, onChange, options, hint }: { label: string; value: T; onChange: (v: T) => void; options: { v: T; l: string }[]; hint?: string }) {
  return (
    <label className="block text-sm font-semibold" style={{ color: "#2C2C2A" }}>
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value as T)} className="mt-2 w-full rounded-lg px-3 py-3 text-base" style={fieldStyle}>
        {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
      {hint && <span className="block mt-1 text-xs font-normal" style={{ color: "#6B6B67" }}>{hint}</span>}
    </label>
  );
}

export function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 text-sm font-semibold cursor-pointer" style={{ color: "#2C2C2A" }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-[#1D9E75]" />
      {label}
    </label>
  );
}

export function Layout({ form, result }: { form: ReactNode; result: ReactNode }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="rounded-2xl p-6 space-y-5" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}>{form}</div>
      <div className="rounded-2xl p-6 md:sticky md:top-28" style={{ backgroundColor: "#1F4A3F", color: "#FFFFFF" }} aria-live="polite">{result}</div>
    </div>
  );
}

export function Big({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="mb-5">
      <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#9FE1CB" }}>{label}</p>
      <p className="text-5xl font-bold">{value}</p>
      {sub && <p className="text-sm mt-1" style={{ color: "#E1F5EE" }}>{sub}</p>}
    </div>
  );
}

export function Rows({ rows }: { rows: { l: string; v: string; strong?: boolean; tone?: "good" | "bad" }[] }) {
  return (
    <dl className="space-y-3 text-sm">
      {rows.map((r, i) => (
        <div key={i} className="flex justify-between gap-4" style={r.strong ? { borderTop: "1px solid #3C6A5D", paddingTop: 12 } : undefined}>
          <dt>{r.l}</dt>
          <dd className={r.strong ? "font-bold text-lg" : "font-semibold"} style={{ color: r.tone === "good" ? "#9FE1CB" : r.tone === "bad" ? "#F7A5A4" : undefined }}>{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed mt-4" style={{ color: "#E1F5EE" }}>{children}</p>;
}

export function Cta({ text = "Faire mon bilan gratuit", href = "/diagnostic" }: { text?: string; href?: string }) {
  return (
    <Link href={href} className="mt-6 block text-center rounded-lg px-5 py-3 text-sm font-bold" style={{ backgroundColor: "#1D9E75", color: "#FFFFFF" }}>
      {text}
    </Link>
  );
}
