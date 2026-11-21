"use client";

import Link from "next/link";
import { useBilanFait } from "@/components/BilanLink";
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

export function Layout({ form, result, slug, resume }: { form: ReactNode; result: ReactNode; slug?: string; resume?: string[] }) {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="rounded-2xl p-6 space-y-5" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}>{form}</div>
        <div className="rounded-2xl p-6 md:sticky md:top-28" style={{ backgroundColor: "#1F4A3F", color: "#FFFFFF" }} aria-live="polite">{result}</div>
      </div>
      {slug && resume && <EmailCapture slug={slug} resume={resume} />}
    </div>
  );
}

export function EmailCapture({ slug, resume }: { slug: string; resume: string[] }) {
  const [email, setEmail] = useState("");
  const [news, setNews] = useState(false);
  const [site, setSite] = useState("");
  const [etat, setEtat] = useState<"idle" | "envoi" | "ok" | "erreur">("idle");
  const [msg, setMsg] = useState("");

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setEtat("envoi");
    try {
      const r = await fetch("/api/outils/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug, resume, newsletter: news, website: site }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { setMsg(d.error ?? "Une erreur est survenue."); setEtat("erreur"); return; }
      setEtat("ok");
    } catch {
      setMsg("Connexion impossible, réessaie."); setEtat("erreur");
    }
  }

  return (
    <div className="mt-6 rounded-2xl p-6" style={{ backgroundColor: "#E1F5EE", border: "0.5px solid #9FE1CB" }}>
      {etat === "ok" ? (
        <p className="text-sm font-semibold" style={{ color: "#085041" }}>C&apos;est envoyé. Regarde ta boîte mail (et les courriers indésirables si tu ne vois rien).</p>
      ) : (
        <form onSubmit={envoyer} className="space-y-3">
          <p className="font-bold" style={{ color: "#085041" }}>Recevoir ce résultat par email</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" required placeholder="ton@email.fr" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 rounded-lg px-3 py-3 text-base" style={fieldStyle} aria-label="Ton email" />
            <input type="text" tabIndex={-1} autoComplete="off" value={site} onChange={(e) => setSite(e.target.value)} className="hidden" aria-hidden="true" name="website" />
            <button type="submit" disabled={etat === "envoi"} className="rounded-lg px-5 py-3 text-sm font-bold disabled:opacity-60" style={{ backgroundColor: "#15805F", color: "#FFFFFF" }}>
              {etat === "envoi" ? "Envoi..." : "Envoyer"}
            </button>
          </div>
          <label className="flex items-start gap-3 text-sm cursor-pointer" style={{ color: "#085041" }}>
            <input type="checkbox" checked={news} onChange={(e) => setNews(e.target.checked)} className="h-5 w-5 mt-0.5 accent-[#1D9E75]" />
            <span>Je veux aussi recevoir la newsletter Avenlib, une fois par mois (désabonnement en un clic).</span>
          </label>
          <p className="text-xs" style={{ color: "#4B4B47" }}>Ton email sert à t&apos;envoyer ce résultat. Il n&apos;est utilisé pour rien d&apos;autre sans ton accord. <Link href="/mentions-legales" className="underline">En savoir plus</Link></p>
          {etat === "erreur" && <p className="text-sm font-semibold" style={{ color: "#B3261E" }}>{msg}</p>}
        </form>
      )}
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

export function Cta({ text = "Faire mon bilan complet gratuit", href = "/diagnostic", pitch }: { text?: string; href?: string; pitch?: string }) {
  const fait = useBilanFait();
  const voir = fait && href === "/diagnostic";
  return (
    <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }}>
      {!voir && (
        <p className="text-sm leading-relaxed mb-3" style={{ color: "#E1F5EE" }}>
          {pitch ?? "Ce résultat n'est qu'une pièce du puzzle."} Le bilan Avenlib passe en revue retraite, prévoyance, impôts et épargne en 3 minutes, gratuit.
        </p>
      )}
      <Link href={voir ? "/resultats" : href} className="block text-center rounded-lg px-5 py-3 text-sm font-bold" style={{ backgroundColor: "#15805F", color: "#FFFFFF" }}>
        {voir ? "Voir mon bilan" : text}
      </Link>
    </div>
  );
}
