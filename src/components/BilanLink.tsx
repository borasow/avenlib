"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";

// Vrai si la personne a déjà fait son bilan sur cet appareil.
export function useBilanFait() {
  const [fait, setFait] = useState(false);
  useEffect(() => {
    try {
      setFait(!!localStorage.getItem("avenlib_profile"));
    } catch {}
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
