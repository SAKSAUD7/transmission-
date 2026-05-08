"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, Phone } from "lucide-react";

const NAV = [
  { href: "/",          label: "Home" },
  { href: "#about",     label: "About Us" },
  { href: "#lead-form", label: "Parts Catalog" },
  { href: "#lead-form", label: "Contact Us" },
];

export default function Navbar({ brand = "TransmissionsForSale" }: { brand?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          <div className="navbar-diamond">
            <div className="navbar-diamond-inner" />
          </div>
          <span className="navbar-brand">{brand}</span>
        </Link>

        <nav className="navbar-nav hide-mobile">
          {NAV.map(l => (
            <Link key={l.label} href={l.href} className="navbar-link">{l.label}</Link>
          ))}
        </nav>

        <div className="navbar-search hide-mobile">
          <input type="text" placeholder="Search..." />
          <button className="navbar-search-btn"><Search size={13} /> Search</button>
        </div>

        <button className="navbar-mobile-toggle show-mobile" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="navbar-mobile-menu">
          {NAV.map(l => (
            <Link key={l.label} href={l.href} className="navbar-mobile-link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="navbar-mobile-phone">
            <Phone size={15} color="var(--brand)" />
            <a href="tel:13866883295">1386 688 3295</a>
          </div>
        </div>
      )}
    </header>
  );
}
