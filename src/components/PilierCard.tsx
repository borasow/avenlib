"use client";
import { useState } from "react";
import { ArrowRight, TrendingUp, Shield, Calculator, Heart, Landmark, CreditCard, ShieldCheck, PiggyBank, Briefcase } from "lucide-react";

const ICON_MAP = { TrendingUp, Shield, Calculator, Heart, Landmark, CreditCard, ShieldCheck, PiggyBank, Briefcase } as const;
type IconName = keyof typeof ICON_MAP;

interface Props {
  iconName: IconName;
  titre: string;
  description: string;
  href: string;
}

export default function PilierCard({ iconName, titre, description, href }: Props) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICON_MAP[iconName];

  return (
    <div
      className="p-6 flex flex-col cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: "#FFFFFF",
        border: hovered ? "1px solid #1D9E75" : "0.5px solid #D3D1C7",
        borderRadius: "12px",
        boxShadow: hovered ? "0 4px 16px rgba(29, 158, 117, 0.10)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#E1F5EE" }}>
        <Icon size={19} style={{ color: "#1D9E75" }} />
      </div>
      <h3 className="mb-2" style={{ color: "#2C2C2A", fontSize: "18px", fontWeight: 600 }}>
        {titre}
      </h3>
      <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "#6B6B67" }}>
        {description}
      </p>
      <a
        href={href}
        className="inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70"
        style={{ color: "#1D9E75" }}
      >
        En savoir plus <ArrowRight size={14} />
      </a>
    </div>
  );
}
