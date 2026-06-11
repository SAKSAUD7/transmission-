"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API_BASE } from "@/lib/api";

export interface Partner {
  name: string;
  label: string;
  tagline: string;
  accent: string;
  logo: string;
  desc: string;
}

/* ─────────────────────── PARTNER DATA ─────────────────────────────────── */
const DEFAULT_PARTNERS: Partner[] = [
  {
    name: "SUZUKI",
    label: "Suzuki",
    tagline: "Way of Life!",
    accent: "#003087",
    logo: "/images/logos/suzuki.png",
    desc: "Suzuki is a global leader in compact vehicles and motorcycles, known for fuel efficiency, reliability, and innovative engineering. Suzuki parts are designed to deliver consistent performance across diverse conditions.",
  },
  {
    name: "HONDA",
    label: "Honda",
    tagline: "The Power of Dreams",
    accent: "#CC0000",
    logo: "/images/logos/honda.png",
    desc: "Honda is one of the world's largest automotive manufacturers, celebrated for its engineering excellence and reliability. Honda parts meet the highest standards for quality and long-term durability.",
  },
  {
    name: "HYUNDAI",
    label: "Hyundai",
    tagline: "New Thinking. New Possibilities.",
    accent: "#002C5F",
    logo: "/images/logos/hyundai.png",
    desc: "Hyundai has rapidly grown into a globally recognised automotive brand offering modern design and advanced technology. Hyundai components are rigorously tested to ensure optimal performance.",
  },
  {
    name: "LAMBORGHINI",
    label: "Lamborghini",
    tagline: "Expect the Unexpected",
    accent: "#D4A017",
    logo: "/images/logos/lamborghini.png",
    desc: "Lamborghini is an Italian luxury automaker known for its high-performance sports cars with striking, aggressive designs. The brand combines advanced engineering with exclusive styling to deliver an exhilarating driving experience. Owning a Lamborghini is a symbol of status and prestige.",
  },
  {
    name: "AUDI",
    label: "Audi",
    tagline: "Vorsprung durch Technik",
    accent: "#BB0A21",
    logo: "/images/logos/audi.png",
    desc: "Audi represents the pinnacle of German engineering — precision, performance, and luxury in every component. Audi parts are crafted to exacting tolerances for unmatched reliability and safety.",
  },
  {
    name: "MAHINDRA",
    label: "Mahindra",
    tagline: "Rise",
    accent: "#C8102E",
    logo: "/images/logos/mahindra.png",
    desc: "Mahindra is India's leading automotive manufacturer, known for robust SUVs and utility vehicles built for diverse terrains. Mahindra parts are engineered for toughness and dependability.",
  },
  {
    name: "TATA",
    label: "Tata",
    tagline: "Connecting Aspirations",
    accent: "#00539C",
    logo: "/images/logos/tata.png",
    desc: "TATA Motors is a global automotive leader offering a wide range of vehicles from passenger cars to commercial trucks. TATA components deliver proven reliability at competitive prices.",
  },
];

/* ─────────────────────── SECTION ───────────────────────────────────────── */
export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>(DEFAULT_PARTNERS);
  const [active, setActive] = useState(0); 

  useEffect(() => {
    fetch(`${API_BASE}/api/parts/partners/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setPartners(data);
        }
      })
      .catch(err => console.error("Failed to fetch partners:", err));
  }, []);

  const prev     = () => setActive(a => (a - 1 + partners.length) % partners.length);
  const next     = () => setActive(a => (a + 1) % partners.length);
  const featured = partners[active] || DEFAULT_PARTNERS[0];

  return (
    <section className="partners">
      <div className="partners-inner">
        <p className="partners-eyebrow">Trusted Brands</p>
        <h2 className="partners-title">Our Partners</h2>

        {/* ── Logo row ── */}
        <div className="partners-logos">
          {partners.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.name}
                className="partner-btn"
                onClick={() => setActive(i)}
                aria-label={p.label}
                title={p.label}
              >
                <motion.div
                  className="partner-logo-circle"
                  animate={{
                    width:     isActive ? 140 : 84,
                    height:    isActive ? 140 : 84,
                    boxShadow: isActive
                      ? "0 8px 32px rgba(0,0,0,0.18)"
                      : "0 2px 10px rgba(0,0,0,0.07)",
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  style={{
                    background: "#ffffff",
                    borderRadius: "50%",
                    border: isActive ? "2px solid #e8e8e8" : "1.5px solid #ebebeb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    flexShrink: 0,
                    padding: isActive ? 16 : 10,
                  }}
                >
                  <Image
                    src={p.logo.startsWith("/") && !p.logo.startsWith("/images") ? `${API_BASE}${p.logo}` : p.logo}
                    alt={p.label}
                    width={isActive ? 108 : 64}
                    height={isActive ? 108 : 64}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </motion.div>

                <motion.span
                  className="partner-name-label"
                  animate={{
                    color:      isActive ? p.accent : "#9ca3af",
                    fontWeight: isActive ? 700 : 500,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {p.label}
                </motion.span>
              </button>
            );
          })}
        </div>

        {/* ── Featured card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="partners-featured"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="partners-feat-pill"
              style={{
                background: `${featured.accent}14`,
                color:       featured.accent,
                border:      `1.5px solid ${featured.accent}30`,
              }}
            >
              {featured.tagline}
            </span>
            <h3 className="partners-feat-name">{featured.label}</h3>
            <p className="partners-feat-desc">{featured.desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation ── */}
        <div className="partners-nav">
          <button className="partners-arrow" onClick={prev} aria-label="Previous">
            <ChevronLeft size={18} color="#374151" />
          </button>
          <div className="partners-dots">
            {partners.map((_, i) => (
              <motion.button
                key={i}
                className="partners-dot"
                onClick={() => setActive(i)}
                animate={{
                  width:      i === active ? 24 : 8,
                  background: i === active ? "var(--brand)" : "#d1d5db",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                aria-label={`Partner ${i + 1}`}
              />
            ))}
          </div>
          <button className="partners-arrow" onClick={next} aria-label="Next">
            <ChevronRight size={18} color="#374151" />
          </button>
        </div>
      </div>
    </section>
  );
}
