/**
 * Centralised API helper.
 * All form components call postLead() — no hardcoded URLs anywhere.
 *
 * Dev:  Next.js rewrites /api/* → http://127.0.0.1:8000/api/* (next.config.ts)
 * Prod: Nginx proxies  /api/* → http://127.0.0.1:8000/api/*
 */

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
  const res = await fetch("/api/leads/", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });
  return res.ok || res.status === 201;
}
