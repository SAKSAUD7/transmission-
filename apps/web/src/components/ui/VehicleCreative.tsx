"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { RotateCw, Expand } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

interface AssetResult {
  found: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  label?: string;
}

interface Props {
  make: string;
  model: string;
  year: string;
  partType: string;
  partSlug: string;
  partImage: string;
}

async function fetchAsset(make: string, model: string, assetType: "car" | "part", partSlug: string): Promise<AssetResult> {
  if (!make) return { found: false };
  try {
    const params = new URLSearchParams({ make, model, asset_type: assetType, part_slug: partSlug });
    const res = await fetch(`${API_BASE}/api/vehicles/360/?${params}`);
    if (!res.ok) return { found: false };
    return await res.json();
  } catch {
    return { found: false };
  }
}

export default function VehicleCreative({ make, model, year, partType, partSlug, partImage }: Props) {
  const [carAsset,     setCarAsset]     = useState<AssetResult>({ found: false });
  const [partAsset,    setPartAsset]    = useState<AssetResult>({ found: false });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const showPart = !!partType && partAsset.found;
  const active   = showPart ? partAsset : carAsset;
  const hasVideo = active.found && !!active.videoUrl;

  // Prefix videoUrl with API_BASE: in dev → http://localhost:8000/media/...
  // In prod (Nginx) → /media/... is served directly
  const videoSrc = hasVideo ? `${API_BASE}${active.videoUrl!}` : null;

  useEffect(() => {
    if (!make) { setCarAsset({ found: false }); return; }
    fetchAsset(make, model, "car", "").then(setCarAsset);
  }, [make, model]);

  useEffect(() => {
    if (!partType || !make) { setPartAsset({ found: false }); return; }
    fetchAsset(make, model, "part", partSlug).then(setPartAsset);
  }, [make, model, partType, partSlug]);

  return (
    <div className="vc-wrap">
      {videoSrc ? (
        <>
          <video key={videoSrc} src={videoSrc} autoPlay muted loop playsInline className="vc-video" />

          <div className="vc-badge">
            <RotateCw size={11} /> 360°
          </div>

          <button className="vc-fullscreen-btn" onClick={() => setIsFullscreen(true)} title="View fullscreen">
            <Expand size={13} color="#fff" />
          </button>

          <div className="vc-label">
            {showPart ? "Part View" : make}{model && ` · ${model}`}{year && ` · ${year}`}
          </div>
        </>
      ) : make ? (
        <>
          <Image
            src={partImage || "/images/hero.png"}
            alt={`${make} ${model || "vehicle"}`}
            fill
            style={{ objectFit: "contain", padding: 24 }}
            priority
          />
          <div className="vc-badge vc-badge-dim">
            <RotateCw size={11} /> 360°
          </div>
          <div className="vc-label">
            {make}{model && ` · ${model}`}{year && ` · ${year}`}
          </div>
        </>
      ) : (
        <>
          <Image
            src="/images/hero.png"
            alt="Select a vehicle"
            fill
            style={{ objectFit: "cover", opacity: 0.25 }}
          />
          <div className="vc-placeholder">
            <div className="vc-placeholder-icon">
              <RotateCw size={22} color="rgba(255,255,255,0.35)" />
            </div>
            <p className="vc-placeholder-text">Select a vehicle to see the 360° view</p>
          </div>
        </>
      )}

      {isFullscreen && videoSrc && (
        <div className="vc-fullscreen-modal" onClick={() => setIsFullscreen(false)}>
          <video src={videoSrc} autoPlay muted loop playsInline className="vc-fullscreen-video" onClick={e => e.stopPropagation()} />
          <button className="vc-fullscreen-close" onClick={() => setIsFullscreen(false)}>Close ✕</button>
        </div>
      )}
    </div>
  );
}
