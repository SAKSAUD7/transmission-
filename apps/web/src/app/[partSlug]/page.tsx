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
import LeadFormSidebar from "@/components/forms/LeadFormSidebar";

const GENERIC_TYPES = ["Standard / OEM", "Premium", "Aftermarket", "Remanufactured", "Used / Tested"];

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
  const part = getPartBySlug(partSlug);
  if (!part) notFound();

  const partTypeOptions =
    partSlug.includes("transmission") ? TRANSMISSION_TYPES :
    partSlug.includes("engine") ? ENGINE_TYPES : GENERIC_TYPES;

  return (
    <div style={{ paddingRight: 0 }}>
      <LeadFormSidebar partSlug={partSlug} sourcePage={part.slug} />
      <Navbar brand={part.pageTitle} />
      <HeroSection
        headline={part.heroHeadline}
        subtitle={part.heroSubtitle}
        videoUrl={part.videoUrl}
        heroImage={part.heroImage}
      />
      <AboutSection
        aboutText={part.aboutText}
        aboutExtra={part.aboutExtra}
        productImage={part.productImage}
        productName={part.name}
      />
      <LeadFormSection
        title={part.partFinderTitle}
        partTypeLabel={part.partTypeLabel}
        partTypeOptions={partTypeOptions}
        partSlug={partSlug}
        sourcePage={part.slug}
      />
      <BenefitsSection benefitTitle={part.benefitTitle} />
      <PartnersSection />
      <WarrantySection productName={part.name} packageDetails={part.packageDetails} />
      <ContactSection brand={part.pageTitle} />
      <Footer brand={part.pageTitle} />
    </div>
  );
}
