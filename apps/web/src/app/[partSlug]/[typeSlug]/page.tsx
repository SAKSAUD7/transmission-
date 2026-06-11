import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPartBySlug, parts } from "@/data/parts";
import { getPartTypes, fromTypeSlug } from "@/lib/partTypes";
import { PART_TYPE_OPTIONS } from "@/data/vehicles";
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

interface Props {
  params: Promise<{ partSlug: string; typeSlug: string }>;
}

// ─── Static generation ────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const combos: { partSlug: string; typeSlug: string }[] = [];
  for (const part of parts) {
    const types = getPartTypes(part.slug);
    for (const t of types) {
      combos.push({ partSlug: part.slug, typeSlug: t.slug });
    }
  }
  return combos;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { partSlug, typeSlug } = await params;
  const part = getPartBySlug(partSlug);
  if (!part) return { title: "Part Not Found" };

  const typeLabels = PART_TYPE_OPTIONS[partSlug] ?? [];
  const typeLabel = fromTypeSlug(typeSlug, typeLabels);
  if (!typeLabel) return { title: "Type Not Found" };

  return {
    title: `${typeLabel} For Sale | Best Prices & Fast Shipping`,
    description: `Find quality used ${typeLabel} parts at the best prices. Save up to 50% off dealer prices with fast shipping and a 30-day warranty.`,
    keywords: `${typeLabel.toLowerCase()} for sale, used ${typeLabel.toLowerCase()}, cheap ${typeLabel.toLowerCase()}, ${part.name.toLowerCase()}`,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function PartTypePage({ params }: Props) {
  const { partSlug, typeSlug } = await params;
  const part = getPartBySlug(partSlug);
  if (!part) notFound();

  const typeLabels = PART_TYPE_OPTIONS[partSlug] ?? [];
  const typeLabel = fromTypeSlug(typeSlug, typeLabels);
  if (!typeLabel) notFound();

  // Type-specific content overrides
  const headline = `Get the Lowest Prices on\n${typeLabel}!`;
  const subtitle = `Save Up to 50% Off Dealer Prices with Fast Shipping!`;

  return (
    <div>
      <LeadFormSidebar partSlug={partSlug} sourcePage={`${partSlug}/${typeSlug}`} />
      <Navbar brand={part.pageTitle} />

      <HeroSection
        headline={headline}
        subtitle={subtitle}
        slug={partSlug}
        heroImage={part.heroImage}
      />

      <AboutSection
        aboutText={part.aboutText}
        aboutExtra={part.aboutExtra}
        productImage={part.productImage}
        productName={typeLabel}
      />

      <LeadFormSection
        title={`Find the Best ${typeLabel} for Your Vehicle`}
        partTypeLabel={part.partTypeLabel}
        partTypeOptions={typeLabels}
        partSlug={partSlug}
        sourcePage={`${partSlug}/${typeSlug}`}
        defaultPartType={typeLabel}
      />

      <BenefitsSection benefitTitle={`Why Choose Us for ${typeLabel}?`} />
      <PartnersSection />
      <WarrantySection productName={typeLabel} packageDetails={part.packageDetails} />
      <ContactSection brand={part.pageTitle} />
      <ReviewsSection partName={typeLabel} />
      <Footer brand={part.pageTitle} />
    </div>
  );
}
