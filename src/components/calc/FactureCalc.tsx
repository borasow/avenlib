"use client";
import { useState } from "react";

type Ligne = { d: string; q: string; p: string };
const fieldStyle = { border: "2px solid #E8E6DF", color: "#2C2C2A", backgroundColor: "#FFFFFF" };
const eur = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const num = (s: string) => { const n = parseFloat(s.replace(",", ".")); return isFinite(n) ? n : 0; };

function Champ({ label, value, onChange, area }: { label: string; value: string; onChange: (v: string) => void; area?: boolean }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-1" style={{ color: "#2C2C2A" }}>{label}</span>
      {area
        ? <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg px-3 py-2 text-base" style={fieldStyle} />
        : <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg px-3 py-2 text-base" style={fieldStyle} />}
    </label>
  );
}

export default function FactureCalc() {
  const auj = new Date().toISOString().slice(0, 10);
  const [type, setType] = useState<"facture" | "devis">("facture");
  const [numero, setNumero] = useState("2026-001");
  const [date, setDate] = useState(auj);
  const [vendeur, setVendeur] = useState("");
  const [adresseV, setAdresseV] = useState("");
  const [siret, setSiret] = useState("");
  const [contact, setContact] = useState("");
  const [client, setClient] = useState("");
  const [adresseC, setAdresseC] = useState("");
  const [lignes, setLignes] = useState<Ligne[]>([{ d: "Prestation", q: "1", p: "500" }]);
  const [sansTva, setSansTva] = useState(true);
  const [tva, setTva] = useState("20");
  const [echeance, setEcheance] = useState("30 jours");
  const [validite, setValidite] = useState("30 jours");
  const [iban, setIban] = useState("");

  const ht = lignes.reduce((t, l) => t + num(l.q) * num(l.p), 0);
  const tvaMontant = sansTva ? 0 : ht * (num(tva) / 100);
  const ttc = ht + tvaMontant;
  const majLigne = (i: number, k: keyof Ligne, v: string) => setLignes(lignes.map((l, j) => (j === i ? { ...l, [k]: v } : l)));
  const jour = (iso: string) => new Date(iso + "T12:00:00").toLocaleDateString("fr-FR");

  return (
    <div>
      <style>{`@media print { body * { visibility: hidden !important; } #doc, #doc * { visibility: visible !important; } #doc { position: absolute; left: 0; top: 0; width: 100%; border: none !important; } }`}</style>
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="rounded-2xl p-6 space-y-4" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}>
          <div className="flex gap-2">
            {(["facture", "devis"] as const).map((t) => (
              <button key={t} type="button" onClick={() => setType(t)} className="flex-1 rounded-lg px-4 py-2 text-sm font-bold" style={{ backgroundColor: type === t ? "#1D9E75" : "#F1EFE8", color: type === t ? "#FFFFFF" : "#2C2C2A" }}>
                {t === "facture" ? "Facture" : "Devis"}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Champ label="Numéro" value={numero} onChange={setNumero} />
            <label className="block"><span className="block text-sm font-semibold mb-1" style={{ color: "#2C2C2A" }}>Date</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg px-3 py-2 text-base" style={fieldStyle} /></label>
          </div>
          <Champ label="Ton nom ou nom de l'entreprise" value={vendeur} onChange={setVendeur} />
          <Champ label="Ton adresse" value={adresseV} onChange={setAdresseV} area />
          <Champ label="Ton SIRET" value={siret} onChange={setSiret} />
          <Champ label="Email / téléphone" value={contact} onChange={setContact} />
          <Champ label="Nom du client" value={client} onChange={setClient} />
          <Champ label="Adresse du client" value={adresseC} onChange={setAdresseC} area />
          <p className="text-sm font-semibold" style={{ color: "#2C2C2A" }}>Lignes</p>
          {lignes.map((l, i) => (
            <div key={i} className="grid grid-cols-[1fr_60px_90px_28px] gap-2 items-center">
              <input placeholder="Désignation" value={l.d} onChange={(e) => majLigne(i, "d", e.target.value)} className="rounded-lg px-2 py-2 text-sm" style={fieldStyle} />
              <input placeholder="Qté" inputMode="decimal" value={l.q} onChange={(e) => majLigne(i, "q", e.target.value)} className="rounded-lg px-2 py-2 text-sm" style={fieldStyle} />
              <input placeholder="PU HT" inputMode="decimal" value={l.p} onChange={(e) => majLigne(i, "p", e.target.value)} className="rounded-lg px-2 py-2 text-sm" style={fieldStyle} />
              <button type="button" aria-label="Supprimer la ligne" onClick={() => setLignes(lignes.filter((_, j) => j !== i))} className="text-lg" style={{ color: "#6B6B67" }}>×</button>
            </div>
          ))}
          <button type="button" onClick={() => setLignes([...lignes, { d: "", q: "1", p: "0" }])} className="text-sm font-bold" style={{ color: "#1D9E75" }}>+ Ajouter une ligne</button>
          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <input type="checkbox" checked={sansTva} onChange={(e) => setSansTva(e.target.checked)} className="h-5 w-5 mt-0.5 accent-[#1D9E75]" />
            <span>Je suis en franchise de TVA (micro-entrepreneur sous le seuil)</span>
          </label>
          {!sansTva && <Champ label="Taux de TVA (%)" value={tva} onChange={setTva} />}
          {type === "facture"
            ? <><Champ label="Délai de paiement" value={echeance} onChange={setEcheance} /><Champ label="IBAN (facultatif)" value={iban} onChange={setIban} /></>
            : <Champ label="Durée de validité du devis" value={validite} onChange={setValidite} />}
          <button type="button" onClick={() => window.print()} className="w-full rounded-lg px-5 py-3 text-sm font-bold" style={{ backgroundColor: "#1D9E75", color: "#FFFFFF" }}>
            Enregistrer en PDF / imprimer
          </button>
          <p className="text-xs" style={{ color: "#6B6B67" }}>Rien n&apos;est envoyé ni enregistré : tout reste dans ton navigateur. Dans la fenêtre d&apos;impression, choisis &laquo; Enregistrer au format PDF &raquo;.</p>
        </div>

        <div id="doc" className="rounded-2xl p-8 text-sm leading-relaxed" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF", color: "#2C2C2A" }}>
          <div className="flex justify-between gap-6 mb-8">
            <div>
              <p className="text-2xl font-bold uppercase" style={{ color: "#1F4A3F" }}>{type}</p>
              <p>N° {numero}</p>
              <p>Date : {jour(date)}</p>
              {type === "devis" && <p>Valable {validite}</p>}
            </div>
            <div className="text-right whitespace-pre-line">
              <p className="font-bold">{vendeur || "Ton nom / entreprise"}</p>
              <p>{adresseV}</p>
              {siret && <p>SIRET : {siret}</p>}
              <p>{contact}</p>
            </div>
          </div>
          <div className="mb-8 whitespace-pre-line">
            <p className="text-xs uppercase font-bold" style={{ color: "#6B6B67" }}>Client</p>
            <p className="font-bold">{client || "Nom du client"}</p>
            <p>{adresseC}</p>
          </div>
          <table className="w-full mb-6">
            <thead><tr className="text-left text-xs uppercase" style={{ color: "#6B6B67", borderBottom: "2px solid #E8E6DF" }}>
              <th className="py-2">Désignation</th><th className="py-2 text-right">Qté</th><th className="py-2 text-right">PU HT</th><th className="py-2 text-right">Total HT</th></tr></thead>
            <tbody>{lignes.map((l, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #E8E6DF" }}>
                <td className="py-2">{l.d}</td><td className="py-2 text-right">{l.q}</td><td className="py-2 text-right">{eur(num(l.p))}</td><td className="py-2 text-right">{eur(num(l.q) * num(l.p))}</td>
              </tr>))}
            </tbody>
          </table>
          <div className="ml-auto w-64 space-y-1">
            <div className="flex justify-between"><span>Total HT</span><span>{eur(ht)}</span></div>
            {!sansTva && <div className="flex justify-between"><span>TVA {tva} %</span><span>{eur(tvaMontant)}</span></div>}
            <div className="flex justify-between font-bold text-base pt-1" style={{ borderTop: "2px solid #2C2C2A" }}><span>{sansTva ? "Total à payer" : "Total TTC"}</span><span>{eur(ttc)}</span></div>
          </div>
          <div className="mt-8 text-xs space-y-1" style={{ color: "#4B4B47" }}>
            {sansTva && <p>TVA non applicable, article 293 B du CGI.</p>}
            {type === "facture" ? (
              <>
                <p>Paiement à {echeance}. En cas de retard, des pénalités sont dues au taux de 3 fois le taux d&apos;intérêt légal, ainsi qu&apos;une indemnité forfaitaire de 40 € pour frais de recouvrement. Pas d&apos;escompte pour paiement anticipé.</p>
                {iban && <p>IBAN : {iban}</p>}
              </>
            ) : (
              <p>Devis reçu avant l&apos;exécution : date, signature du client précédée de la mention &laquo; Bon pour accord &raquo;.</p>
            )}
          </div>
          {type === "devis" && <div className="mt-10 h-20 rounded-lg" style={{ border: "2px dashed #E8E6DF" }}><p className="p-2 text-xs" style={{ color: "#6B6B67" }}>Bon pour accord, date et signature :</p></div>}
        </div>
      </div>
    </div>
  );
}
