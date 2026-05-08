import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

interface FooterProps {
  brand: string;
}

const NAV_LINKS = [
  { href: "/",          label: "Home" },
  { href: "#lead-form", label: "Parts Catalog" },
  { href: "#about",     label: "About Us" },
  { href: "#contact",   label: "Contact Us" },
];

const SOCIALS = [
  { label: "Dr", href: "#" },
  { label: "Be", href: "#" },
  { label: "Ig", href: "#" },
  { label: "Tw", href: "#" },
];

export default function Footer({ brand }: FooterProps) {
  const year = new Date().getFullYear();
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
            <span>8819 trans St. South Gate,<br />CA 90280</span>
          </div>
          <div className="footer-contact-item">
            <Mail size={15} className="footer-icon" />
            <a href="mailto:transmissionsforsale@hello.com" className="footer-contact-link">
              transmissionsforsale@hello.com
            </a>
          </div>
          <div className="footer-contact-item">
            <Phone size={15} className="footer-icon" />
            <a href="tel:13866883295" className="footer-contact-link">+1 386-688-3295</a>
          </div>
        </div>

        {/* Col 3 — Social + description */}
        <div className="footer-col">
          <div className="footer-socials">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} className="footer-social-btn" aria-label={s.label}>
                {s.label}
              </a>
            ))}
          </div>
          <p className="footer-social-desc">
            Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod.
          </p>
        </div>

        {/* Col 4 — Newsletter */}
        <div className="footer-col">
          <h4 className="footer-col-title">Join a Newsletter</h4>
          <label className="footer-newsletter-label">Your Email</label>
          <div className="footer-newsletter-form">
            <input type="email" placeholder="Enter Your Email" className="footer-newsletter-input" />
            <button className="footer-newsletter-btn">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-bottom-text">© {year} {brand}. All rights reserved.</p>
      </div>
    </footer>
  );
}
