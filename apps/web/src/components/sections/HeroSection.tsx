"use client";
import Image from "next/image";
import { Phone } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroProps {
  headline: string;
  subtitle: string;
  heroImage?: string;
  slug: string;               // part slug — used to fetch live video from Django
  fallbackVideoUrl?: string;  // static fallback (usually empty now)
}

export default function HeroSection({
  headline, subtitle, heroImage = "/images/hero.png", slug, fallbackVideoUrl,
}: HeroProps) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    // Fetch fresh video URL from Django via Nginx proxy (/api/* → Django)
    fetch(`/api/parts/${slug}/`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.videoUrl) {
          // /media/... paths are served by Nginx at the same origin
          const url = data.videoUrl.startsWith("/media")
            ? `${window.location.origin}${data.videoUrl}`
            : data.videoUrl;
          setVideoSrc(url);
        } else if (fallbackVideoUrl) {
          setVideoSrc(fallbackVideoUrl);
        }
      })
      .catch(() => {
        if (fallbackVideoUrl) setVideoSrc(fallbackVideoUrl);
      });
  }, [slug, fallbackVideoUrl]);

  return (
    <section className="hero">
      {/* Background — video if available, otherwise fallback image */}
      {videoSrc ? (
        <video src={videoSrc} autoPlay muted loop playsInline className="hero-video" />
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
