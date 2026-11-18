"use client";

import { useState } from "react";

export default function DesabonnementClient({ email, token }: { email: string; token: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function go() {
    setState("loading");
    try {
      const res = await fetch(`/api/newsletter/unsubscribe?e=${encodeURIComponent(email)}&t=${encodeURIComponent(token)}`, {
        method: "POST",
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <>
        <h1 className="text-2xl font-bold mb-3" style={{ color: "#2C2C2A" }}>Vous êtes désinscrit</h1>
        <p className="text-sm" style={{ color: "#6B6B67" }}>Vous ne recevrez plus la newsletter d&apos;Avenlib.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-3" style={{ color: "#2C2C2A" }}>Se désinscrire de la newsletter</h1>
      <p className="text-sm mb-6" style={{ color: "#6B6B67" }}>
        Confirmez pour ne plus recevoir la newsletter d&apos;Avenlib à l&apos;adresse <strong>{email}</strong>.
      </p>
      <button
        onClick={go}
        disabled={state === "loading"}
        className="px-6 py-3 rounded-xl text-white text-sm font-semibold"
        style={{ backgroundColor: "#1D9E75", opacity: state === "loading" ? 0.6 : 1 }}
      >
        {state === "loading" ? "En cours..." : "Confirmer la désinscription"}
      </button>
      {state === "error" && (
        <p className="text-sm mt-4" style={{ color: "#B3261E" }}>
          Une erreur est survenue. Écrivez-nous à contact@avenlib.fr.
        </p>
      )}
    </>
  );
}
