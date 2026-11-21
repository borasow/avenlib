import type { SupabaseClient } from "@supabase/supabase-js";

const KEY = "avenlib_profile";
export const BILAN_EVENT = "avenlib-bilan-change";

const notify = () => {
  try { window.dispatchEvent(new Event(BILAN_EVENT)); } catch {}
};

export function bilanPresent(): boolean {
  try { return !!localStorage.getItem(KEY); } catch { return false; }
}

// À la déconnexion : le bilan n'est plus affiché sur cet appareil.
export function effacerBilanLocal() {
  try { localStorage.removeItem(KEY); } catch {}
  notify();
}

function lireListe(v: unknown): string[] {
  if (Array.isArray(v)) return v as string[];
  if (typeof v === "string") { try { const p = JSON.parse(v); return Array.isArray(p) ? p : []; } catch { return []; } }
  return [];
}

// À la connexion : remet le bilan du compte dans le navigateur s'il n'y est pas déjà.
export async function restaurerBilan(supabase: SupabaseClient, userId: string): Promise<boolean> {
  if (bilanPresent()) return true;
  const { data } = await supabase
    .from("profiles")
    .select("prenom, statut, secteur, anciennete, revenus, situation_familiale, age, existant, prevoyance_niveau, objectifs, sentiment_financier, logement, compte_bancaire_pro, assurance_rc_pro, answers")
    .eq("user_id", userId)
    .maybeSingle();
  if (!data || !data.statut) return false;
  const answers = data.answers ?? {
    statut: data.statut,
    secteur: data.secteur,
    anciennete: data.anciennete,
    revenus: data.revenus,
    situation_familiale: data.situation_familiale,
    age: data.age,
    existant: lireListe(data.existant),
    prevoyance_niveau: data.prevoyance_niveau,
    objectifs: lireListe(data.objectifs),
    ressenti: data.sentiment_financier ?? undefined,
    logement: data.logement ?? undefined,
    banque_pro: data.compte_bancaire_pro,
    rc_pro: data.assurance_rc_pro,
  };
  try { localStorage.setItem(KEY, JSON.stringify({ prenom: data.prenom ?? "", answers })); } catch { return false; }
  notify();
  return true;
}
