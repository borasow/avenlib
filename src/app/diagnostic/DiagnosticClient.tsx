"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckSquare, Eye, EyeOff, Check } from "lucide-react";

const QUESTIONS = [
  {
    id: "statut",
    titre: "Quel est ton statut juridique ?",
    type: "single",
    options: [
      "Micro-entrepreneur / Auto-entrepreneur",
      "EURL / EI au réel",
      "SASU / SAS",
      "SARL / EURL (gérant majoritaire)",
      "Je ne sais pas encore",
    ],
  },
  {
    id: "secteur",
    titre: "Dans quel secteur exerces-tu ?",
    type: "single",
    options: [
      "Tech / Digital / IT",
      "Conseil / Management",
      "Création / Communication",
      "Profession libérale réglementée",
      "Artisan / Commerce",
      "Autre",
    ],
  },
  {
    id: "anciennete",
    titre: "Depuis combien de temps es-tu indépendant(e) ?",
    type: "single",
    options: [
      "Moins d'1 an",
      "1 à 3 ans",
      "3 à 7 ans",
      "Plus de 7 ans",
    ],
  },
  {
    id: "revenus",
    titre: "Quels sont tes revenus annuels nets ?",
    type: "single",
    options: [
      "Moins de 25 000 €",
      "25 000 – 45 000 €",
      "45 000 – 75 000 €",
      "75 000 – 120 000 €",
      "Plus de 120 000 €",
    ],
  },
  {
    id: "situation_familiale",
    titre: "Quelle est ta situation familiale ?",
    type: "single",
    options: [
      "Célibataire, sans enfant",
      "Célibataire, avec enfant(s)",
      "Marié(e) / Pacsé(e), sans enfant",
      "Marié(e) / Pacsé(e), avec enfant(s)",
      "Famille monoparentale",
      "En concubinage, sans enfant",
      "En concubinage, avec enfant(s)",
    ],
  },
  {
    id: "age",
    titre: "Quel est ton âge ?",
    type: "single",
    options: [
      "Moins de 30 ans",
      "30 – 40 ans",
      "40 – 50 ans",
      "Plus de 50 ans",
    ],
  },
  {
    id: "existant",
    titre: "Qu'as-tu déjà mis en place ?",
    sousTitre: "Plusieurs réponses possibles",
    type: "multi",
    options: [
      "PER / épargne retraite",
      "Mutuelle santé",
      "Prévoyance arrêt maladie",
      "Assurance vie",
      "Épargne investissement (hors PER)",
      "Compte bancaire pro dédié",
      "RC Pro / Assurance professionnelle",
      "Épargne bancaire",
      "Immobilier locatif",
      "Rien pour l'instant",
    ],
  },
  {
    id: "prevoyance_niveau",
    titre: "Quel est ton niveau de couverture en cas d'arrêt maladie ?",
    type: "single",
    options: [
      "Je suis bien couvert",
      "Je touche la sécu seulement (~22€/jour)",
      "Je ne touche rien",
      "Je ne sais pas",
    ],
  },
  {
    id: "objectifs",
    titre: "Mes objectifs",
    sousTitre: "Plusieurs réponses possibles",
    type: "multi",
    options: [
      "Préparer ma retraite",
      "Sécuriser mes revenus",
      "Réduire mes impôts",
      "Acheter ma résidence principale",
      "Obtenir un crédit immobilier",
      "Ouvrir un compte pro adapté",
      "Souscrire une assurance pro",
      "Faire fructifier mon épargne",
      "Protéger ma famille",
    ],
  },
  {
    id: "ressenti",
    titre: "Comment tu te sens par rapport à ta situation financière ?",
    type: "single",
    options: [
      "Serein, j'ai tout en place",
      "Quelques lacunes mais pas urgent",
      "Inquiet, je ne sais pas par où commencer",
      "Très inquiet, j'ai besoin d'aide rapidement",
    ],
  },
  {
    id: "logement",
    titre: "Quelle est ta situation par rapport au logement ?",
    type: "single",
    options: [
      "Locataire",
      "Propriétaire sans emprunt",
      "Propriétaire avec emprunt en cours",
      "Hébergé gratuitement",
    ],
  },
  {
    id: "banque_pro",
    titre: "As-tu un compte bancaire professionnel dédié ?",
    type: "single",
    options: [
      "Oui, compte pro dédié",
      "Non, j'utilise mon compte personnel",
      "Je suis en train d'en chercher un",
    ],
  },
  {
    id: "rc_pro",
    titre: "As-tu une assurance RC Pro ?",
    type: "single",
    options: [
      "Oui, je suis couvert",
      "Non, je n'en ai pas",
      "Je ne sais pas si j'en ai besoin",
    ],
  },
];

type Answers = Record<string, string | string[]>;

export default function DiagnosticClient() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0–12 questions, 13 = signup
  const [answers, setAnswers] = useState<Answers>({});
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pwRules = {
    length:  password.length >= 8,
    upper:   /[A-Z]/.test(password),
    digit:   /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password),
  };
  const pwValid = Object.values(pwRules).every(Boolean);

  const currentQ = QUESTIONS[step];
  const progress = step < 13 ? Math.round((step / 13) * 100) : 100;

  function selectSingle(value: string) {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
    setTimeout(() => {
      if (step < 12) setStep((s) => s + 1);
      else setStep(13);
    }, 200);
  }

  function toggleMulti(value: string) {
    const cur = (answers[currentQ.id] as string[]) || [];
    if (value === "Rien pour l'instant") {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: ["Rien pour l'instant"] }));
      return;
    }
    const without = cur.filter((v) => v !== "Rien pour l'instant");
    if (without.includes(value)) {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: without.filter((v) => v !== value) }));
    } else {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: [...without, value] }));
    }
  }

  function goBack() {
    if (step === 13) setStep(12);
    else if (step > 0) setStep((s) => s - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prenom.trim() || !email.trim() || !password.trim()) {
      setError("Merci de renseigner tous les champs obligatoires.");
      return;
    }
    if (!pwValid) {
      setError("Le mot de passe ne respecte pas les critères de sécurité.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { prenom: prenom.trim(), nom: nom.trim() } },
      });
      if (authError && authError.message !== "User already registered") {
        throw new Error(authError.message);
      }
      await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: authData?.user?.id ?? null,
          prenom: prenom.trim(),
          nom: nom.trim(),
          email: email.trim(),
          newsletter,
          answers,
        }),
      });
      localStorage.setItem("avenlib_profile", JSON.stringify({ prenom: prenom.trim(), answers }));
      router.push("/resultats");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  if (step === 13) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
        <ProgressBar progress={100} />
        <div className="max-w-lg mx-auto px-6 py-16">
          <button onClick={goBack} className="flex items-center gap-2 text-sm text-secondary hover:text-secondary mb-8 transition-colors">
            <ArrowLeft size={16} /> Retour
          </button>
          <div className="bg-white border border-gray-100 rounded-2xl p-8">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: "#EFF9F5" }}
            >
              <CheckSquare size={24} style={{ color: "#1D9E75" }} />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#2C2C2A" }}>
              Parfait, tu y es presque !
            </h2>
            <p className="text-secondary mb-8">
              Crée ton compte pour voir ton diagnostic personnalisé.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#2C2C2A" }}>
                  Prénom
                </label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Marie"
                  className="w-full border border-gray-200 rounded-btn px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                  <span style={{ color: "#2C2C2A" }}>Nom de famille</span>
                  <span style={{ color: "#9B9B97", fontWeight: 400 }}>(facultatif)</span>
                </label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Dupont"
                  className="w-full border border-gray-200 rounded-btn px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#2C2C2A" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marie@exemple.fr"
                  className="w-full border border-gray-200 rounded-btn px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                  required
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="mt-0.5 shrink-0 accent-[#1D9E75]"
                />
                <span style={{ fontSize: "13px", color: "#6B6B67", lineHeight: "1.5" }}>
                  J&apos;accepte de recevoir des conseils financiers personnalisés et les actualités Avenlib par email. Désinscription possible à tout moment.
                </span>
              </label>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#2C2C2A" }}>
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8 caractères minimum"
                    className="w-full border border-gray-200 rounded-btn px-4 py-3 pr-11 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
                    style={{ color: "#9B9B97" }}
                    tabIndex={-1}
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {[
                      { ok: pwRules.length,  label: "8 caractères minimum" },
                      { ok: pwRules.upper,   label: "1 majuscule" },
                      { ok: pwRules.digit,   label: "1 chiffre" },
                      { ok: pwRules.special, label: "1 caractère spécial (!@#$%…)" },
                    ].map(({ ok, label }) => (
                      <li key={label} className="flex items-center gap-2" style={{ fontSize: "12px", color: ok ? "#1D9E75" : "#9B9B97" }}>
                        <Check size={13} style={{ color: ok ? "#1D9E75" : "#D3D1C7", flexShrink: 0 }} />
                        {label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {error && (
                <p className="text-sm" style={{ color: "#DC2626" }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-btn text-white font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: "#1D9E75" }}
              >
                {loading ? "Chargement..." : <>Voir mes résultats <ArrowRight size={18} /></>}
              </button>
            </form>
            <p className="text-sm text-center mt-4" style={{ color: "#6B6B67" }}>
              Déjà un compte ?{" "}
              <a href="/connexion" className="font-medium underline hover:opacity-70 transition-opacity" style={{ color: "#2C2C2A" }}>
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const q = currentQ;
  const currentAnswer = answers[q.id];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      <ProgressBar progress={progress} />
      <div className="max-w-lg mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          {step > 0 ? (
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-sm text-secondary hover:text-secondary transition-colors"
            >
              <ArrowLeft size={16} /> Retour
            </button>
          ) : (
            <div />
          )}
          <span className="text-sm text-secondary">
            Question {step + 1} / 13
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-1" style={{ color: "#2C2C2A" }}>
          {q.titre}
        </h2>
        {"sousTitre" in q && q.sousTitre && (
          <p className="text-sm text-secondary mb-6">{q.sousTitre}</p>
        )}
        {!("sousTitre" in q) && <div className="mb-6" />}

        {step === 0 && (
          <p
            className="text-center mb-6"
            style={{ fontSize: "13px", color: "#6B6B67", fontStyle: "italic" }}
          >
            Tes résultats personnalisés seront sauvegardés dans ton espace gratuit. Une création de compte rapide sera demandée à la fin.
          </p>
        )}

        <div className="space-y-3">
          {q.options.map((option) => {
            const isSelected =
              q.type === "single"
                ? currentAnswer === option
                : (currentAnswer as string[] || []).includes(option);

            return (
              <button
                key={option}
                onClick={() =>
                  q.type === "single" ? selectSingle(option) : toggleMulti(option)
                }
                className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all ${
                  isSelected
                    ? "border-2"
                    : "border border-gray-200 hover:border-gray-300 bg-white"
                }`}
                style={
                  isSelected
                    ? {
                        borderColor: "#1D9E75",
                        backgroundColor: "#EFF9F5",
                        color: "#085041",
                      }
                    : { color: "#2C2C2A" }
                }
              >
                {option}
              </button>
            );
          })}
        </div>

        {q.type === "multi" && (
          <button
            onClick={() => (step < 12 ? setStep((s) => s + 1) : setStep(13))}
            disabled={!currentAnswer || (currentAnswer as string[]).length === 0}
            className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 rounded-btn text-white font-semibold transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ backgroundColor: "#1D9E75" }}
          >
            Continuer <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-1 bg-gray-100">
      <div
        className="h-1 transition-all duration-300"
        style={{ width: `${progress}%`, backgroundColor: "#1D9E75" }}
      />
    </div>
  );
}
