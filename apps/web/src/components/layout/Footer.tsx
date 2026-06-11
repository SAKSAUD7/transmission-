"use client";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { postLead } from "@/lib/api";

interface FooterProps {
  brand: string;
}

const NAV_LINKS = [
  { href: "#",          label: "Home" },
  { href: "#lead-form", label: "Parts Catalog" },
  { href: "#about",     label: "About Us" },
  { href: "#contact",   label: "Contact Us" },
];

const SOCIALS = [
  { label: "FB", href: "#", title: "Facebook" },
  { label: "IG", href: "#", title: "Instagram" },
  { label: "YT", href: "#", title: "YouTube" },
  { label: "TW", href: "#", title: "Twitter / X" },
];

export default function Footer({ brand }: FooterProps) {
  const year = new Date().getFullYear();

  const [email,     setEmail]     = useState("");
  const [nlStatus,  setNlStatus]  = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNlStatus("loading");
    try {
      const ok = await postLead({
        fullName:   "Newsletter Subscriber",
        email,
        partSlug:   "newsletter",
        partType:   "Newsletter",
        sourcePage: brand,
      });
      setNlStatus(ok ? "success" : "error");
    } catch {
      setNlStatus("error");
    }
  };

  return (
    <footer className="footer-main">
      <div className="footer-grid">

        {/* Col 1 — Logo + nav */}
        <div className="footer-col">
          <div className="footer-logo">
            <div className="footer-diamond">
              <div className="footer-diamond-inner" />
            </div>
            <span className="footer-brand">{brand}</span>
          </div>
          <nav className="footer-nav">
            {NAV_LINKS.map(l => (
              <Link key={l.label} href={l.href} className="footer-nav-link">{l.label}</Link>
            ))}
          </nav>
        </div>

        {/* Col 2 — Get in Touch */}
        <div className="footer-col">
          <h4 className="footer-col-title">Get in Touch</h4>
          <div className="footer-contact-item">
            <MapPin size={15} className="footer-icon" />
            <span>8819 Trans St. South Gate,<br />CA 90280</span>
          </div>
          <div className="footer-contact-item">
            <Mail size={15} className="footer-icon" />
            <a href="mailto:transmissionsforsale@hello.com" className="footer-contact-link">
              transmissionsforsale@hello.com
            </a>
          </div>
          <div className="footer-contact-item">
            <Phone size={15} className="footer-icon" />
            <a href="tel:18004959912" className="footer-contact-link">(800) 495-9912</a>
          </div>
        </div>

        {/* Col 3 — Social + description */}
        <div className="footer-col">
          <h4 className="footer-col-title">Follow Us</h4>
          <div className="footer-socials">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} className="footer-social-btn" aria-label={s.title} title={s.title}>
                {s.label}
              </a>
            ))}
          </div>
          <p className="footer-social-desc">
            Follow us for the latest deals, auto tips, and part availability updates.
          </p>
        </div>

        {/* Col 4 — Newsletter */}
        <div className="footer-col">
          <h4 className="footer-col-title">Join Our Newsletter</h4>
          <label className="footer-newsletter-label">Get deals & updates in your inbox</label>

          {nlStatus === "success" ? (
            <p style={{ fontSize: 13, color: "#16a34a", fontWeight: 600, marginTop: 8 }}>
              ✓ You&apos;re subscribed!
            </p>
          ) : (
            <form className="footer-newsletter-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="footer-newsletter-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button className="footer-newsletter-btn" disabled={nlStatus === "loading"}>
                {nlStatus === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
              {nlStatus === "error" && (
                <p style={{ fontSize: 11, color: "#dc2626" }}>Error. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-bottom-text">© {year} {brand}. All rights reserved.</p>
      </div>
    </footer>
  );
}
