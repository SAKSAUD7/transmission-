import type { Metadata } from "next";
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
import { TRANSMISSION_TYPES } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "TransmissionsForSale | Best Prices on Used Transmissions",
  description: "Find high-quality used transmissions at the best prices. Save up to 50% off dealer prices with fast shipping and a 30-day warranty.",
  keywords: "transmissions for sale, used transmissions, cheap transmissions, automatic transmission",
  openGraph: {
    title: "TransmissionsForSale | Best Prices on Used Transmissions",
    description: "Save up to 50% off dealer prices. Fast shipping. 30-day warranty.",
    type: "website",
  },
};

const ABOUT_TEXT = "At TransmissionsForSale, we are dedicated to providing top-quality transmission parts at competitive prices. With years of experience in the automotive industry, we've built a reputation for offering reliable, high-performance components that meet the needs of our customers across the nation.";
const ABOUT_EXTRA = "Our vast inventory includes a wide range of transmissions and related parts, ensuring you find exactly what you need, whether you're a mechanic, car enthusiast, or just someone in need of a replacement part. Each part we sell undergoes rigorous inspection to ensure it meets our strict quality standards before it reaches you.";
const PACKAGE_DETAILS = [
  "Transmission with all internal components, including the torque converter for automatic transmissions.",
  "The torque converter will only be included with automatic transmissions.",
  "Transmissions will be inspected for shavings before delivery.",
];

export default function TransmissionsPage() {
  return (
    <div>
      <LeadFormSidebar partSlug="transmissions-for-sale" sourcePage="transmissions-for-sale" />
      <Navbar brand="TransmissionsForSale" />

      <HeroSection
        headline={"Get the Lowest Prices on\nUsed Parts!"}
        subtitle="Save Up to 50% Off Dealer Prices with Fast Shipping!"
        videoUrl="/videos/gearbox.mp4"
      />

      <AboutSection
        aboutText={ABOUT_TEXT}
        aboutExtra={ABOUT_EXTRA}
        productImage="/images/transmission.png"
        productName="Transmissions"
      />

      <LeadFormSection
        title="Pick Your Ideal Transmission Brand and Discover Best Options for Your Vehicle"
        partTypeLabel="Select Transmission Type"
        partTypeOptions={TRANSMISSION_TYPES}
        partSlug="transmissions-for-sale"
        sourcePage="transmissions-for-sale"
      />

      <BenefitsSection benefitTitle="Why Choose Us for Transmissions?" />
      <PartnersSection />
      <WarrantySection productName="Transmission" packageDetails={PACKAGE_DETAILS} />
      <ContactSection brand="TransmissionsForSale" />
      <ReviewsSection partName="Transmission" />
      <Footer brand="TransmissionsForSale" />
    </div>
  );
}
