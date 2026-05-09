/**
 * Centralised API helper.
 *
 * Dev:  NEXT_PUBLIC_API_URL=http://localhost:8000  (set in .env.local)
 *       → direct calls to Django with CORS headers
 * Prod: NEXT_PUBLIC_API_URL="" (empty / not set)
 *       → relative URLs, Nginx proxies /api/* and /media/* → Django
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export interface LeadPayload {
  fullName:   string;
  phone?:     string;
  email:      string;
  zip?:       string;
  carMake?:   string;
  carModel?:  string;
  carYear?:   string;
  partSlug:   string;
  partType?:  string;
  sourcePage: string;
  notes?:     string;
}

export async function postLead(payload: LeadPayload): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/leads/`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });
  return res.ok || res.status === 201;
}
