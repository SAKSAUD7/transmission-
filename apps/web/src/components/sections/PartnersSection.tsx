"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ── Inline SVG brand logos ─────────────────────────────────────────────── */
function SuzukiLogo({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#003087";
  return (
    <svg width="38" height="22" viewBox="0 0 110 60" fill="none">
      <text x="0" y="50" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="52" fill={c} letterSpacing="-2">SUZUKI</text>
    </svg>
  );
}
function HondaLogo({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#CC0000";
  return (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
      <path d="M50 8 C34 8 22 20 22 36 L22 64 C22 80 34 92 50 92 C66 92 78 80 78 64 L78 36 C78 20 66 8 50 8Z" fill={c}/>
      <text x="50" y="68" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="52" fill="#fff" textAnchor="middle">H</text>
    </svg>
  );
}
function HyundaiLogo({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#002C5F";
  return (
    <svg width="42" height="24" viewBox="0 0 130 60" fill="none">
      <ellipse cx="65" cy="30" rx="62" ry="28" fill={c}/>
      <text x="65" y="42" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="30" fill="#fff" textAnchor="middle" letterSpacing="-1">HYUNDAI</text>
    </svg>
  );
}
function LamborghiniLogo({ active }: { active: boolean }) {
  const fill = active ? "#f5c842" : "#1a1a1a";
  const textC = active ? "#1a1a1a" : "#f5c842";
  return (
    <svg width="38" height="38" viewBox="0 0 100 100" fill="none">
      <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill={fill}/>
      <text x="50" y="58" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="28" fill={textC} textAnchor="middle">LB</text>
    </svg>
  );
}
function AudiLogo({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#555";
  return (
    <svg width="52" height="20" viewBox="0 0 160 56" fill="none">
      {[16,52,88,124].map((cx, i) => (
        <circle key={i} cx={cx} cy="28" r="24" stroke={c} strokeWidth="5" fill="none"/>
      ))}
    </svg>
  );
}
function MahindraLogo({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#C8102E";
  return (
    <svg width="42" height="22" viewBox="0 0 130 60" fill="none">
      <text x="0" y="48" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="44" fill={c} letterSpacing="-1">MAHINDRA</text>
    </svg>
  );
}
function TataLogo({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#00539C";
  return (
    <svg width="38" height="28" viewBox="0 0 100 70" fill="none">
      <ellipse cx="50" cy="35" rx="48" ry="32" fill={c}/>
      <text x="50" y="46" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="30" fill="#fff" textAnchor="middle">TATA</text>
    </svg>
  );
}

const PARTNERS = [
  {
    name: "SUZUKI", tagline: "Way of Life!",
    bg: "#003087", text: "#fff",
    desc: "Suzuki is a global leader in compact vehicles and motorcycles, known for fuel efficiency, reliability, and innovative engineering. Suzuki parts are designed to deliver consistent performance across diverse conditions.",
    Logo: SuzukiLogo,
  },
  {
    name: "HONDA", tagline: "The Power of Dreams",
    bg: "#CC0000", text: "#fff",
    desc: "Honda is one of the world's largest automotive manufacturers, celebrated for its engineering excellence and reliability. Honda parts meet the highest standards for quality and long-term durability.",
    Logo: HondaLogo,
  },
  {
    name: "HYUNDAI", tagline: "New Thinking. New Possibilities.",
    bg: "#002C5F", text: "#fff",
    desc: "Hyundai has rapidly grown into a globally recognized automotive brand offering modern design and advanced technology. Hyundai components are rigorously tested to ensure optimal performance.",
    Logo: HyundaiLogo,
  },
  {
    name: "LAMBORGHINI", tagline: "Expect the Unexpected",
    bg: "#1a1a1a", text: "#f5c842",
    desc: "Lamborghini is an Italian luxury automaker known for its high-performance sports cars with striking, aggressive designs. The brand combines advanced engineering with exclusive styling to deliver an outstanding driving experience.",
    Logo: LamborghiniLogo,
  },
  {
    name: "AUDI", tagline: "Vorsprung durch Technik",
    bg: "#444", text: "#fff",
    desc: "Audi represents the pinnacle of German engineering — precision, performance, and luxury in every component. Audi parts are crafted to exacting tolerances for unmatched reliability and safety.",
    Logo: AudiLogo,
  },
  {
    name: "MAHINDRA", tagline: "Rise",
    bg: "#C8102E", text: "#fff",
    desc: "Mahindra is India's leading automotive manufacturer, known for robust SUVs and utility vehicles built for diverse terrains. Mahindra parts are engineered for toughness and dependability.",
    Logo: MahindraLogo,
  },
  {
    name: "TATA", tagline: "Connecting Aspirations",
    bg: "#00539C", text: "#fff",
    desc: "TATA Motors is a global automotive leader offering a wide range of vehicles from passenger cars to commercial trucks. TATA components deliver proven reliability at competitive prices.",
    Logo: TataLogo,
  },
];

export default function PartnersSection() {
  const [active, setActive] = useState(1); // Start on Honda

  const prev     = () => setActive(a => (a - 1 + PARTNERS.length) % PARTNERS.length);
  const next     = () => setActive(a => (a + 1) % PARTNERS.length);
  const featured = PARTNERS[active];

  return (
    <section className="partners">
      <div className="partners-inner">
        <p className="partners-eyebrow">Trusted Brands</p>
        <h2 className="partners-title">Our Partners</h2>

        {/* Logo row */}
        <div className="partners-logos">
          {PARTNERS.map((p, i) => (
            <button
              key={p.name}
              className="partner-btn"
              onClick={() => setActive(i)}
              aria-label={p.name}
              title={p.name}
            >
              <motion.div
                className="partner-logo-circle"
                animate={{
                  width:      i === active ? 88 : 64,
                  height:     i === active ? 88 : 64,
                  background: i === active ? p.bg : "#f3f4f6",
                  boxShadow:  i === active ? `0 8px 28px ${p.bg}55` : "0 2px 8px rgba(0,0,0,0.06)",
                  borderColor: i === active ? "rgba(0,0,0,0)" : "#e5e7eb",
                }}
                transition={{ type: "spring", stiffness: 340, damping: 26 }}
                style={{ padding: i === active ? 16 : 12 }}
              >
                <p.Logo active={i === active} />
              </motion.div>
              <motion.span
                className="partner-name-label"
                animate={{
                  color:      i === active ? p.bg : "#9ca3af",
                  fontWeight: i === active ? 800 : 500,
                }}
                transition={{ duration: 0.2 }}
              >
                {p.name}
              </motion.span>
            </button>
          ))}
        </div>

        {/* Featured description */}
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
              style={{ background: `${featured.bg}12`, color: featured.bg, border: `1.5px solid ${featured.bg}30` }}
            >
              {featured.tagline}
            </span>
            <h3 className="partners-feat-name">{featured.name}</h3>
            <p className="partners-feat-desc">{featured.desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="partners-nav">
          <button className="partners-arrow" onClick={prev} aria-label="Previous">
            <ChevronLeft size={18} color="#374151" />
          </button>
          <div className="partners-dots">
            {PARTNERS.map((_, i) => (
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
