import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DOMAINE_META, PARTENAIRES } from "@/lib/partenaires";
import DomaineClient from "./DomaineClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DOMAINES_VALIDES = [
  "retraite", "prevoyance", "sante", "fiscalite", "deces",
  "banque_pro", "assurance_pro", "epargne", "credit",
];

export function generateStaticParams() {
  return DOMAINES_VALIDES.map((d) => ({ domaine: d }));
}

export async function generateMetadata({
  params,
}: {
  params: { domaine: string };
}): Promise<Metadata> {
  const meta = DOMAINE_META[params.domaine];
  if (!meta) return {};
  return {
    title: `${meta.titre}, Avenlib`,
    description: meta.description,
  };
}

export default function DomainePage({ params }: { params: { domaine: string } }) {
  if (!DOMAINES_VALIDES.includes(params.domaine)) notFound();
  const partenaires = PARTENAIRES[params.domaine];
  const meta = DOMAINE_META[params.domaine];
  return (
    <>
      <Navbar />
      <DomaineClient domaine={params.domaine} partenaires={partenaires} meta={meta} />
      <Footer />
    </>
  );
}
