import { Briefcase, HeartPulse, Home, Hourglass, Landmark, PiggyBank, Receipt, ShieldCheck, ShieldPlus, Umbrella, type LucideIcon } from "lucide-react";

export const NIVEAU = {
  urgent:    { label: "Urgent",      fg: "#B3342F", bg: "#FBECEB", bar: "#D9534F", ordre: 0 },
  optimiser: { label: "À optimiser", fg: "#8A5A00", bg: "#FBF1DA", bar: "#E0A526", ordre: 1 },
  ok:        { label: "En ordre",    fg: "#0F6B50", bg: "#E1F5EE", bar: "#1D9E75", ordre: 2 },
} as const;

export const ICONES: Record<string, LucideIcon> = {
  retraite: Hourglass,
  prevoyance: ShieldPlus,
  sante: HeartPulse,
  fiscalite: Receipt,
  deces: Umbrella,
  banque_pro: Landmark,
  assurance_pro: ShieldCheck,
  epargne: PiggyBank,
  credit: Home,
  portage_salarial: Briefcase,
};
