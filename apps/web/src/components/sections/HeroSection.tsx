"use client";
import Image from "next/image";
import { Phone } from "lucide-react";

interface HeroProps {
  headline: string;
  subtitle: string;
  videoUrl?: string;
  heroImage?: string;
}

export default function HeroSection({
  headline, subtitle, videoUrl, heroImage = "/images/hero.png",
}: HeroProps) {
  return (
    <section className="hero">
      {/* Background */}
      {videoUrl ? (
        <video src={videoUrl} autoPlay muted loop playsInline className="hero-video" />
      ) : (
        <Image src={heroImage} alt="Auto Parts" fill style={{ objectFit: "cover", opacity: 0.65 }} priority />
      )}

      {/* Gradient overlay */}
      <div className="hero-overlay" />

      {/* Phone badge */}
      <div className="hero-phone-badge">
        <Phone size={17} color="#fff" />
        <div>
          <div className="hero-phone-number">(800) 495-9912</div>
          <div className="hero-phone-label">Call Us Now</div>
        </div>
      </div>

      {/* Main content */}
      <div className="hero-content">
        <h1 className="hero-title">{headline}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        <button
          className="hero-cta"
          onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
        >
          Find My Part
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-label">Scroll</span>
      </div>

      {/* Slide dots */}
      <div className="hero-dots">
        {[0, 1, 2].map(i => (
          <div key={i} className={`hero-dot${i === 0 ? " active" : ""}`} />
        ))}
      </div>
    </section>
  );
}
