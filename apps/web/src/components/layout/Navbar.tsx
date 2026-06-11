"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, Phone } from "lucide-react";

const NAV = [
  { href: "#",          label: "Home" },
  { href: "#about",     label: "About Us" },
  { href: "#lead-form", label: "Parts Catalog" },
  { href: "#contact",   label: "Contact Us" },
];

export default function Navbar({ brand = "TransmissionsForSale" }: { brand?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="#" className="navbar-logo">
          <div className="navbar-diamond">
            <div className="navbar-diamond-inner" />
          </div>
          <span className="navbar-brand">{brand}</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="navbar-nav hide-mobile">
          {NAV.map(l => (
            <Link key={l.label} href={l.href} className="navbar-link">{l.label}</Link>
          ))}
        </nav>

        {/* Desktop Search */}
        <div className="navbar-search hide-mobile">
          <input
            type="text"
            placeholder="Search parts…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="navbar-search-btn"><Search size={13} /> Search</button>
        </div>

        {/* Desktop Phone Pill */}
        <a href="tel:18004959912" className="navbar-phone-pill hide-mobile" aria-label="Call us">
          <Phone size={14} color="var(--brand)" />
          <span className="navbar-phone-text">(800) 495-9912</span>
        </a>

        {/* Mobile Toggle */}
        <button className="navbar-mobile-toggle show-mobile" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="navbar-mobile-menu">
          {NAV.map(l => (
            <Link key={l.label} href={l.href} className="navbar-mobile-link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="navbar-mobile-phone">
            <Phone size={15} color="var(--brand)" />
            <a href="tel:18004959912">(800) 495-9912</a>
          </div>
        </div>
      )}
    </header>
  );
}
