export type Periodicite = "mensuelle" | "trimestrielle";

export type Echeance = { date: string; titre: string; detail: string; type: "urssaf" | "cfe" | "impot" };

const iso = (y: number, m: number, d: number) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const dernierJour = (y: number, m: number) => new Date(y, m, 0).getDate(); // m = 1..12

// Échéances d'un micro-entrepreneur sur une année civile.
export function echeancesAnnee(annee: number, periodicite: Periodicite): Echeance[] {
  const liste: Echeance[] = [];
  if (periodicite === "mensuelle") {
    for (let m = 1; m <= 12; m++) {
      const mois = m === 1 ? 12 : m - 1;
      const nomMois = new Date(2000, mois - 1, 1).toLocaleDateString("fr-FR", { month: "long" });
      liste.push({ date: iso(annee, m, dernierJour(annee, m)), type: "urssaf", titre: "Déclaration du chiffre d'affaires", detail: `Déclare et paie tes cotisations sur le chiffre d'affaires de ${nomMois}, même s'il est nul.` });
    }
  } else {
    liste.push({ date: iso(annee, 1, 31), type: "urssaf", titre: "Déclaration du chiffre d'affaires (4e trimestre)", detail: "Chiffre d'affaires d'octobre à décembre, même s'il est nul." });
    liste.push({ date: iso(annee, 4, 30), type: "urssaf", titre: "Déclaration du chiffre d'affaires (1er trimestre)", detail: "Chiffre d'affaires de janvier à mars, même s'il est nul." });
    liste.push({ date: iso(annee, 7, 31), type: "urssaf", titre: "Déclaration du chiffre d'affaires (2e trimestre)", detail: "Chiffre d'affaires d'avril à juin, même s'il est nul." });
    liste.push({ date: iso(annee, 10, 31), type: "urssaf", titre: "Déclaration du chiffre d'affaires (3e trimestre)", detail: "Chiffre d'affaires de juillet à septembre, même s'il est nul." });
  }
  liste.push({ date: iso(annee, 5, 20), type: "impot", titre: "Déclaration de revenus", detail: "La déclaration en ligne ouvre en avril et se clôt entre fin mai et début juin selon ton département (dates exactes sur impots.gouv.fr). Reporte ton chiffre d'affaires de l'année précédente." });
  liste.push({ date: iso(annee, 12, 15), type: "cfe", titre: "Paiement de la CFE", detail: "Cotisation foncière des entreprises, à régler avant le 15 décembre. L'avis est dans ton espace professionnel sur impots.gouv.fr. Elle n'est pas due la première année d'activité." });
  return liste.sort((a, b) => a.date.localeCompare(b.date));
}

export function prochaines(periodicite: Periodicite, depuis: Date, n = 8): Echeance[] {
  const d = iso(depuis.getFullYear(), depuis.getMonth() + 1, depuis.getDate());
  const tout = [...echeancesAnnee(depuis.getFullYear(), periodicite), ...echeancesAnnee(depuis.getFullYear() + 1, periodicite)];
  return tout.filter((e) => e.date >= d).slice(0, n);
}

export function formatJour(isoDate: string): string {
  return new Date(isoDate + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
