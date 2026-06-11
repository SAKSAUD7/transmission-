import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPartBySlug, parts } from "@/data/parts";
import { TRANSMISSION_TYPES, ENGINE_TYPES } from "@/data/vehicles";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import LeadFormSection from "@/components/sections/LeadFormSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import PartnersSection from "@/components/sections/PartnersSection";
import WarrantySection from "@/components/sections/WarrantySection";
import ContactSection from "@/components/sections/ContactSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import LeadFormSidebar from "@/components/forms/LeadFormSidebar";

const GENERIC_TYPES = ["Standard / OEM", "Premium", "Aftermarket", "Remanufactured", "Used / Tested"];

// Server-side Django fetch — runs at request time (ISR: revalidate every 60s)
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchPartFromApi(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/api/parts/${slug}/`, {
      cache: "no-store",  // Always fresh — instant after Django Admin uploads
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

interface Props { params: Promise<{ partSlug: string }> }

export async function generateStaticParams() {
  return parts.map(p => ({ partSlug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { partSlug } = await params;
  const part = getPartBySlug(partSlug);
  if (!part) return { title: "Part Not Found" };
  return {
    title: part.seo.title, description: part.seo.description,
    keywords: part.seo.keywords,
  };
}

export default async function PartPage({ params }: Props) {
  const { partSlug } = await params;
  const staticPart = getPartBySlug(partSlug);
  if (!staticPart) notFound();

  // Fetch live data from Django (has uploaded video/image URLs)
  const apiPart = await fetchPartFromApi(partSlug);

  // Merge: prefer API values for media fields, fall back to static data
  const heroImage  = apiPart?.heroImage  || staticPart.heroImage;
  const videoUrl   = apiPart?.videoUrl   || staticPart.videoUrl;

  // Resolve relative /media paths to absolute API URLs for Next.js <video> / <Image>
  const resolvedVideo = videoUrl?.startsWith("/media")
    ? `${API_BASE}${videoUrl}`
    : videoUrl;
  const resolvedImage = heroImage?.startsWith("/media")
    ? `${API_BASE}${heroImage}`
    : heroImage;

  const partTypeOptions =
    partSlug.includes("transmission") ? TRANSMISSION_TYPES :
    partSlug.includes("engine") ? ENGINE_TYPES : GENERIC_TYPES;

  return (
    <div style={{ paddingRight: 0 }}>
      <LeadFormSidebar partSlug={partSlug} sourcePage={staticPart.slug} />
      <Navbar brand={staticPart.pageTitle} />
      <HeroSection
        headline={apiPart?.heroHeadline || staticPart.heroHeadline}
        subtitle={apiPart?.heroSubtitle || staticPart.heroSubtitle}
        slug={partSlug}
        heroImage={staticPart.heroImage}
      />
      <AboutSection
        aboutText={apiPart?.aboutText || staticPart.aboutText}
        aboutExtra={apiPart?.aboutExtra || staticPart.aboutExtra}
        productImage={staticPart.productImage}
        productName={staticPart.name}
      />
      <LeadFormSection
        title={apiPart?.partFinderTitle || staticPart.partFinderTitle}
        partTypeLabel={apiPart?.partTypeLabel || staticPart.partTypeLabel}
        partTypeOptions={partTypeOptions}
        partSlug={partSlug}
        sourcePage={staticPart.slug}
      />
      <BenefitsSection benefitTitle={apiPart?.benefitTitle || staticPart.benefitTitle} />
      <PartnersSection />
      <WarrantySection productName={staticPart.name} packageDetails={staticPart.packageDetails} />
      <ContactSection brand={staticPart.pageTitle} />
      <ReviewsSection partName={staticPart.name} />
      <Footer brand={staticPart.pageTitle} />
    </div>
  );
}
