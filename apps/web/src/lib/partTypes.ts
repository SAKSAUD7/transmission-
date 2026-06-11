import { PART_TYPE_OPTIONS } from "@/data/vehicles";
import type { PartType } from "@/types";

/** "6-Cylinder (V6)" → "6-cylinder-v6" */
export function toTypeSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[()&/]+/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** "6-cylinder-v6" → find matching label in a list */
export function fromTypeSlug(slug: string, labels: string[]): string | undefined {
  return labels.find((l) => toTypeSlug(l) === slug);
}

/** Get all PartType objects for a given partSlug */
export function getPartTypes(partSlug: string): PartType[] {
  const labels = PART_TYPE_OPTIONS[partSlug] ?? [];
  return labels.map((label) => ({
    label,
    slug: toTypeSlug(label),
    description: `Find quality ${label} parts at the best prices with fast shipping.`,
  }));
}
