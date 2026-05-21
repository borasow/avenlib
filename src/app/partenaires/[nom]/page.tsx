import { notFound } from "next/navigation";
import { findPartenaireBySlug, DOMAINE_LABELS } from "@/lib/partenaires-utils";
import PartenaireClient from "./PartenaireClient";

interface Props {
  params: { nom: string };
  searchParams: { domaine?: string };
}

export default function PartenairePage({ params, searchParams }: Props) {
  const partenaire = findPartenaireBySlug(params.nom);
  if (!partenaire) notFound();

  const domaine = searchParams.domaine ?? partenaire.domaine;
  const domaineLabel = DOMAINE_LABELS[domaine] ?? domaine;

  return (
    <PartenaireClient
      partenaire={partenaire}
      domaine={domaine}
      domaineLabel={domaineLabel}
    />
  );
}
