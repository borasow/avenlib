"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { BILAN_EVENT, bilanPresent } from "@/lib/bilanLocal";

// Vrai si la personne a déjà fait son bilan sur cet appareil.
export function useBilanFait() {
  const [fait, setFait] = useState(false);
  useEffect(() => {
    const maj = () => setFait(bilanPresent());
    maj();
    window.addEventListener(BILAN_EVENT, maj);
    window.addEventListener("storage", maj);
    return () => {
      window.removeEventListener(BILAN_EVENT, maj);
      window.removeEventListener("storage", maj);
    };
  }, []);
  return fait;
}

// Lien vers le bilan : "Faire mon bilan" -> /diagnostic, ou "Voir mon bilan" -> /resultats si déjà fait.
export default function BilanLink({
  label,
  icon,
  className,
  style,
  onClick,
}: {
  label: string;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  const fait = useBilanFait();
  return (
    <Link href={fait ? "/resultats" : "/diagnostic"} className={className} style={style} onClick={onClick}>
      {fait ? "Voir mon bilan" : label}
      {icon}
    </Link>
  );
}
