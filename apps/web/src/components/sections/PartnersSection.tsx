"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PARTNERS = [
  {
    name: "SUZUKI",
    tagline: "Way of Life!",
    bg: "#003087", text: "#fff",
    desc: "Suzuki is a global leader in compact vehicles and motorcycles, known for fuel efficiency, reliability, and innovative engineering. Suzuki parts are designed to deliver consistent performance across diverse conditions.",
    abbr: "Sz",
  },
  {
    name: "HONDA",
    tagline: "The Power of Dreams",
    bg: "#CC0000", text: "#fff",
    desc: "Honda is one of the world's largest automotive manufacturers, celebrated for its engineering excellence and reliability. Honda parts meet the highest standards for quality and long-term durability.",
    abbr: "H",
  },
  {
    name: "HYUNDAI",
    tagline: "New Thinking. New Possibilities.",
    bg: "#002C5F", text: "#fff",
    desc: "Hyundai has rapidly grown into a globally recognized automotive brand offering modern design and advanced technology. Hyundai components are rigorously tested to ensure optimal performance.",
    abbr: "Hy",
  },
  {
    name: "LAMBORGHINI",
    tagline: "Expect the Unexpected",
    bg: "#1a1a1a", text: "#f5c842",
    desc: "Lamborghini is an Italian luxury automaker known for its high-performance sports cars with striking, aggressive designs. The brand combines advanced engineering with exclusive styling to deliver an outstanding driving experience.",
    abbr: "LB",
  },
  {
    name: "AUDI",
    tagline: "Vorsprung durch Technik",
    bg: "#444", text: "#fff",
    desc: "Audi represents the pinnacle of German engineering — precision, performance, and luxury in every component. Audi parts are crafted to exacting tolerances for unmatched reliability and safety.",
    abbr: "Au",
  },
  {
    name: "MAHINDRA",
    tagline: "Rise",
    bg: "#C8102E", text: "#fff",
    desc: "Mahindra is India's leading automotive manufacturer, known for robust SUVs and utility vehicles built for diverse terrains. Mahindra parts are engineered for toughness and dependability.",
    abbr: "M",
  },
  {
    name: "TATA",
    tagline: "Connecting Aspirations",
    bg: "#00539C", text: "#fff",
    desc: "TATA Motors is a global automotive leader offering a wide range of vehicles from passenger cars to commercial trucks. TATA components deliver proven reliability at competitive prices.",
    abbr: "T",
  },
];

export default function PartnersSection() {
  const [active, setActive] = useState(3);

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
            <button key={p.name} className="partner-btn" onClick={() => setActive(i)} aria-label={p.name}>
              <motion.div
                className="partner-logo-circle"
                animate={{
                  width:      i === active ? 76 : 56,
                  height:     i === active ? 76 : 56,
                  background: i === active ? p.bg : "#f3f4f6",
                  boxShadow:  i === active ? `0 6px 24px ${p.bg}66` : "none",
                }}
                transition={{ type: "spring", stiffness: 340, damping: 26 }}
              >
                <span
                  className="partner-abbr"
                  style={{
                    color:    i === active ? p.text : "#374151",
                    fontSize: 15,
                    fontWeight: 900,
                    letterSpacing: "0.5px",
                  }}
                >
                  {p.abbr}
                </span>
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
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            {/* Tagline pill */}
            <span
              className="partners-feat-pill"
              style={{ background: `${featured.bg}15`, color: featured.bg, border: `1px solid ${featured.bg}30` }}
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
                  width:      i === active ? 22 : 8,
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
