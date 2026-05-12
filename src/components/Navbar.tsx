"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const NAV_LINKS = [
  { label: "Qui sommes-nous ?", href: "/#qui-sommes-nous" },
  { label: "Pourquoi Avenlib ?", href: "/#pourquoi" },
  { label: "Comment ça marche ?", href: "/#comment" },
];

const linkStyle = { color: "#2C2C2A", fontSize: "15px", fontWeight: 600, whiteSpace: "nowrap" as const };

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getPrenom(user: User): string {
  const meta = user.user_metadata ?? {};
  if (meta.prenom) return capitalize(String(meta.prenom));
  if (meta.full_name) return capitalize(String(meta.full_name).split(" ")[0]);
  if (meta.name) return capitalize(String(meta.name).split(" ")[0]);
  try {
    const stored = localStorage.getItem("avenlib_profile");
    if (stored) {
      const parsed = JSON.parse(stored) as { prenom?: string };
      if (parsed.prenom) return capitalize(parsed.prenom);
    }
  } catch {}
  return capitalize(user.email?.split("@")[0] ?? "");
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [prenom, setPrenom] = useState("");
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("prenom")
          .eq("user_id", session.user.id)
          .single();

        if (profile?.prenom) {
          setPrenom(capitalize(profile.prenom));
        } else {
          setPrenom(getPrenom(session.user));
        }
      }

      setReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        const supabaseClient = createClient();
        const { data: profile } = await supabaseClient
          .from("profiles")
          .select("prenom")
          .eq("user_id", session.user.id)
          .single();

        if (profile?.prenom) {
          setPrenom(capitalize(profile.prenom));
        } else {
          setPrenom(getPrenom(session.user));
        }
      } else {
        setPrenom("");
      }

      setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  async function handleSignOut() {
    await createClient().auth.signOut();
    setDropdownOpen(false);
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <nav
      className="w-full sticky top-0 z-50"
      style={{ backgroundColor: "#F1EFE8", borderBottom: "0.5px solid #D3D1C7" }}
    >
      <div className="max-w-6xl mx-auto px-10 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-avenlib.png" alt="Avenlib" style={{ height: "120px", width: "auto" }} />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="transition-opacity hover:opacity-70" style={linkStyle}>
              {l.label}
            </Link>
          ))}

          {/* Auth, masqué tant que la session n'est pas résolue */}
          {ready && (
            user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                  style={linkStyle}
                >
                  Bonjour {prenom || user?.email?.split("@")[0]} 👋
                  <ChevronDown
                    size={15}
                    style={{ transition: "transform 0.2s", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden"
                    style={{ backgroundColor: "#FFFFFF", border: "0.5px solid #D3D1C7", boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}
                  >
                    <Link
                      href="/compte"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
                      style={{ color: "#2C2C2A" }}
                    >
                      <LayoutDashboard size={15} style={{ color: "#1D9E75" }} />
                      Mon espace
                    </Link>
                    <div style={{ borderTop: "0.5px solid #D3D1C7" }}>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
                        style={{ color: "#DC2626" }}
                      >
                        <LogOut size={15} style={{ color: "#DC2626" }} />
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/compte" className="transition-opacity hover:opacity-70" style={linkStyle}>
                Se connecter
              </Link>
            )
          )}

          <Link
            href="/diagnostic"
            className="font-semibold px-4 py-2 rounded-xl text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#1D9E75", fontSize: "15px", whiteSpace: "nowrap" }}
          >
            Faire mon diagnostic
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: "#2C2C2A" }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-5 flex flex-col gap-4"
          style={{ backgroundColor: "#F1EFE8", borderTop: "0.5px solid #D3D1C7" }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="py-1 transition-opacity hover:opacity-70"
              style={linkStyle}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          {ready && (
            user ? (
              <div style={{ borderTop: "0.5px solid #D3D1C7", paddingTop: "8px" }}>
                <p className="text-sm font-semibold mb-3" style={{ color: "#1D9E75" }}>
                  Bonjour {prenom || user?.email?.split("@")[0]} 👋
                </p>
                <Link
                  href="/compte"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-1.5 text-sm font-medium"
                  style={{ color: "#2C2C2A" }}
                >
                  <LayoutDashboard size={14} style={{ color: "#1D9E75" }} />
                  Mon espace
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 py-1.5 text-sm font-medium mt-1"
                  style={{ color: "#DC2626" }}
                >
                  <LogOut size={14} style={{ color: "#DC2626" }} />
                  Se déconnecter
                </button>
              </div>
            ) : (
              <Link
                href="/compte"
                className="py-1 transition-opacity hover:opacity-70"
                style={linkStyle}
                onClick={() => setMobileOpen(false)}
              >
                Se connecter
              </Link>
            )
          )}

          <Link
            href="/diagnostic"
            className="font-semibold px-4 py-2.5 rounded-xl text-white text-center transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#1D9E75", fontSize: "17px" }}
            onClick={() => setMobileOpen(false)}
          >
            Faire mon diagnostic
          </Link>
        </div>
      )}
    </nav>
  );
}
