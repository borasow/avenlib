"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { ChevronDown, LayoutDashboard, LogOut, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Qui sommes-nous ?", href: "/#qui-sommes-nous" },
  { label: "Pourquoi Avenlib ?", href: "/#pourquoi" },
  { label: "Comment ça marche ?", href: "/#comment" },
];

const linkStyle = { color: "#2C2C2A", fontSize: "15px", fontWeight: 600, whiteSpace: "nowrap" as const };

export default function Navbar() {
  const [prenom, setPrenom] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    async function loadUser(userId: string, email?: string) {
      const { data } = await supabase
        .from("profiles")
        .select("prenom")
        .eq("user_id", userId)
        .single();
      const raw = data?.prenom || email?.split("@")[0] || "Mon compte";
      setPrenom(raw.split(/[.\s]/)[0]);
      setReady(true);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUser(session.user.id, session.user.email ?? undefined);
      } else {
        setReady(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUser(session.user.id, session.user.email ?? undefined);
      } else {
        setPrenom(null);
        setReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    setPrenom(null);
    setDropdownOpen(false);
    setMobileOpen(false);
    window.location.href = "/";
  }

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <nav
      className="w-full sticky top-0 z-50"
      style={{ backgroundColor: "#F1EFE8", borderBottom: "0.5px solid #D3D1C7" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-3 md:py-5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-avenlib.png" alt="Avenlib" style={{ height: "clamp(60px, 10vw, 100px)", width: "auto" }} />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="transition-opacity hover:opacity-70" style={linkStyle}>
              {l.label}
            </Link>
          ))}

          {ready && (
            prenom ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                  style={linkStyle}
                >
                  Bonjour {capitalize(prenom)} &nbsp;
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
              <Link href="/connexion" className="transition-opacity hover:opacity-70" style={linkStyle}>
                Se connecter
              </Link>
            )
          )}

          <Link
            href="/diagnostic"
            className="font-semibold px-4 py-2 rounded-xl text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#1D9E75", fontSize: "15px", whiteSpace: "nowrap" }}
          >
            Faire mon bilan
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
            prenom ? (
              <div style={{ borderTop: "0.5px solid #D3D1C7", paddingTop: "8px" }}>
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
                href="/connexion"
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
            Faire mon bilan
          </Link>
        </div>
      )}
    </nav>
  );
}
