"use client";
import { Briefcase, CalendarClock, Check, Scale, ShieldPlus, Target, User, Users, Wallet, type LucideIcon } from "lucide-react";
import type { DiagnosticAnswers } from "@/lib/scoring";

const FAITS: { key: keyof DiagnosticAnswers; label: string; Icone: LucideIcon }[] = [
  { key: "statut", label: "Statut", Icone: Scale },
  { key: "secteur", label: "Secteur", Icone: Briefcase },
  { key: "anciennete", label: "Ancienneté", Icone: CalendarClock },
  { key: "revenus", label: "Revenus annuels", Icone: Wallet },
  { key: "situation_familiale", label: "Situation", Icone: Users },
  { key: "age", label: "Âge", Icone: User },
  { key: "prevoyance_niveau", label: "Prévoyance actuelle", Icone: ShieldPlus },
];

export default function ProfilCompte({ answers }: { answers: DiagnosticAnswers }) {
  const faits = FAITS.filter((f) => answers[f.key]);
  const enPlace = answers.existant ?? [];
  const objectifs = answers.objectifs ?? [];

  return (
    <section className="rounded-2xl bg-white p-6 sm:p-7" style={{ border: "1px solid #EEECE6" }} aria-labelledby="profil-titre">
      <h2 id="profil-titre" className="text-lg sm:text-xl font-bold mb-5" style={{ color: "#2C2C2A" }}>Ton profil</h2>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {faits.map(({ key, label, Icone }) => {
          const val = answers[key];
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "#EEF6F2", color: "#15805F" }}>
                <Icone size={19} />
              </span>
              <div className="min-w-0">
                <dt className="text-xs" style={{ color: "#6B6B67" }}>{label}</dt>
                <dd className="font-semibold leading-snug" style={{ color: "#2C2C2A" }}>{Array.isArray(val) ? val.join(", ") : val}</dd>
              </div>
            </div>
          );
        })}
      </dl>

      <div className="mt-6 pt-6 grid gap-6 sm:grid-cols-2" style={{ borderTop: "1px solid #F1EFE8" }}>
        <div>
          <h3 className="font-semibold mb-3" style={{ color: "#2C2C2A" }}>Déjà en place</h3>
          {enPlace.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {enPlace.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5 rounded-full py-1.5 pl-2.5 pr-3.5 text-sm" style={{ backgroundColor: "#E1F5EE", color: "#0F5C46" }}>
                  <Check size={14} strokeWidth={3} /> {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm" style={{ color: "#6B6B67" }}>Rien de renseigné pour l&apos;instant.</p>
          )}
        </div>
        <div>
          <h3 className="font-semibold mb-3" style={{ color: "#2C2C2A" }}>Tes objectifs</h3>
          {objectifs.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {objectifs.map((obj) => (
                <li key={obj} className="inline-flex items-center gap-1.5 rounded-full py-1.5 pl-2.5 pr-3.5 text-sm" style={{ border: "1px solid #E3E0D6", color: "#2C2C2A", backgroundColor: "#FAF9F5" }}>
                  <Target size={14} style={{ color: "#15805F" }} /> {obj}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm" style={{ color: "#6B6B67" }}>Aucun objectif renseigné.</p>
          )}
        </div>
      </div>
    </section>
  );
}
