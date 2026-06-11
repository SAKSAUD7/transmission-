export interface PartType {
  label: string;   // "Automatic Transmission"
  slug: string;    // "automatic"
  description: string; // short sentence for SEO / hero sub-headline
}

export interface PartConfig {
  slug: string;
  name: string;
  pageTitle: string;          // e.g. "TransmissionsForSale"
  heroHeadline: string;
  heroSubtitle: string;
  heroImage: string;          // path under /images/
  productImage: string;       // path under /images/
  aboutText: string;
  aboutExtra?: string;
  partTypeLabel: string;      // label for the 4th dropdown
  partFinderTitle: string;
  benefitTitle: string;
  packageDetails: string[];
  videoUrl?: string;
  types?: PartType[];         // sub-type pages, e.g. automatic / manual / cvt
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface Lead {
  fullName: string;
  phone: string;
  email: string;
  carMake: string;
  carModel: string;
  carYear?: string;
  partType: string;
  sourcePage: string;
  message?: string;
}

export interface VehicleMake { id: number; name: string; }
export interface VehicleModel { id: number; name: string; makeId: number; }
