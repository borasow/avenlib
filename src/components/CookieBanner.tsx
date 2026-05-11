"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookies_accepted")) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookies_accepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-6 py-4"
      style={{ backgroundColor: "#F1EFE8", borderTop: "0.5px solid #D3D1C7" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm" style={{ color: "#6B6B67" }}>
          Nous utilisons des cookies pour analyser notre audience et améliorer votre expérience.{" "}
          <Link href="/mentions-legales" className="underline" style={{ color: "#2C2C2A" }}>
            En savoir plus
          </Link>
        </p>
        <button
          onClick={accept}
          className="shrink-0 text-sm font-semibold px-5 py-2 rounded-xl text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#1D9E75" }}
        >
          J'accepte
        </button>
      </div>
    </div>
  );
}
