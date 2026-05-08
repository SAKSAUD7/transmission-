/**
 * Scalable vehicle image mapping system.
 * Pattern: /vehicles/{make}/{model}/{year}/preview.webp
 * Future: /vehicles/{make}/{model}/{year}/360/frame_{n}.webp
 */

export interface VehicleAsset {
  preview: string;
  frames360?: string[];   // populated later with real 360° frames
  partOverlay?: string;   // part-specific overlay image
}

// Slug helpers
export const toSlug = (s: string) =>
  s.toLowerCase().replace(/[\s/&]+/g, "-").replace(/[^a-z0-9-]/g, "");

/** Build the asset path for a make/model/year combo */
export function getVehicleAsset(make: string, model: string, year: string): VehicleAsset {
  const m = toSlug(make);
  const mo = toSlug(model);
  const base = `/vehicles/${m}/${mo}/${year}`;
  return {
    preview: `${base}/preview.webp`,
    frames360: Array.from({ length: 36 }, (_, i) => `${base}/360/frame_${String(i).padStart(3, "0")}.webp`),
    partOverlay: `${base}/part-overlay.webp`,
  };
}

/**
 * Fallback image map — used when specific vehicle assets don't exist yet.
 * Maps make → default preview image from our existing public/images/ assets.
 */
export const MAKE_FALLBACK_IMAGES: Record<string, string> = {
  "Toyota":       "/images/hero.png",
  "Honda":        "/images/hero.png",
  "Ford":         "/images/hero.png",
  "Chevrolet":    "/images/hero.png",
  "BMW":          "/images/hero.png",
  "Mercedes-Benz":"/images/hero.png",
  "Nissan":       "/images/hero.png",
  "Dodge":        "/images/hero.png",
  "Jeep":         "/images/hero.png",
  "Volkswagen":   "/images/hero.png",
  default:        "/images/hero.png",
};

export const PART_IMAGES: Record<string, string> = {
  transmission:        "/images/transmission.png",
  "transmissions":     "/images/transmission.png",
  engine:              "/images/engine.png",
  "engines":           "/images/engine.png",
  "axle-shaft":        "/images/axle-shaft.png",
  "drive-shaft":       "/images/drive-shaft.png",
  "differential":      "/images/differential.png",
  "speedometer":       "/images/speedometer.png",
  "throttle-body":     "/images/throttle-body.png",
  "transfer-case":     "/images/transfer-case.png",
  "steering-rack":     "/images/steering-rack.png",
  "intake-manifold":   "/images/intake-manifold.png",
  "steering-column":   "/images/steering-column.png",
  "spindle-knuckle":   "/images/spindle-knuckle.png",
  "axle-assembly":     "/images/axle-assembly.png",
  default:             "/images/hero.png",
};

export function getFallbackImage(make: string): string {
  return MAKE_FALLBACK_IMAGES[make] ?? MAKE_FALLBACK_IMAGES.default;
}

export function getPartImage(partSlug?: string): string {
  if (!partSlug) return PART_IMAGES.default;
  return PART_IMAGES[partSlug.toLowerCase()] ?? PART_IMAGES.default;
}
