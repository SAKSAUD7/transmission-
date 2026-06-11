"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { RotateCw, Expand } from "lucide-react";
import { API_BASE } from "@/lib/api";

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

async function fetchAsset(make: string, model: string, assetType: "car" | "part", partSlug: string, partType: string): Promise<AssetResult> {
  if (assetType === "car" && !make) return { found: false };
  if (assetType === "part" && !partSlug) return { found: false };
  
  try {
    const params = new URLSearchParams({ asset_type: assetType });
    if (make) params.append("make", make);
    if (model) params.append("model", model);
    if (partSlug) params.append("part_slug", partSlug);
    if (partType) params.append("part_type", partType);

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
  const [lastUpdated,  setLastUpdated]  = useState<"car" | "part">("part");

  useEffect(() => {
    fetchAsset(make, model, "car", "", "").then(setCarAsset);
    if (make) setLastUpdated("car");
  }, [make, model]);

  useEffect(() => {
    if (!partType) { setPartAsset({ found: false }); return; }
    fetchAsset("", "", "part", partSlug, partType).then(setPartAsset);
    if (partType) setLastUpdated("part");
  }, [partType, partSlug]);

  let active = carAsset;
  let showPart = false;

  if (lastUpdated === "part") {
    if (partAsset.found) { active = partAsset; showPart = true; }
    else { active = carAsset; showPart = false; }
  } else {
    if (carAsset.found) { active = carAsset; showPart = false; }
    else { active = partAsset; showPart = true; }
  }

  const hasVideo = active.found && !!active.videoUrl;

  // Prefix videoUrl with API_BASE: in dev → http://localhost:8000/media/...
  // In prod (Nginx) → /media/... is served directly
  const videoSrc = hasVideo ? `${API_BASE}${active.videoUrl!}` : null;
  const isImage = videoSrc ? /\.(jpg|jpeg|png|webp|gif)$/i.test(videoSrc) : false;

  return (
    <div className="vc-wrap">
      {videoSrc ? (
        <>
          {isImage ? (
            <img key={videoSrc} src={videoSrc} alt="360 View" className="vc-video" style={{ objectFit: "contain" }} />
          ) : (
            <video key={videoSrc} src={videoSrc} autoPlay muted loop playsInline className="vc-video" />
          )}

          <div className="vc-badge">
            <RotateCw size={11} /> 360°
          </div>

          <button className="vc-fullscreen-btn" onClick={() => setIsFullscreen(true)} title="View fullscreen">
            <Expand size={13} color="#fff" />
          </button>

          <div className="vc-label">
            {showPart ? (active.label || "Part View") : (
              <>{make}{model && ` · ${model}`}{year && ` · ${year}`}</>
            )}
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
          {isImage ? (
            <img src={videoSrc} alt="360 View Fullscreen" className="vc-fullscreen-video" onClick={e => e.stopPropagation()} style={{ objectFit: "contain", maxWidth: "90vw", maxHeight: "90vh" }} />
          ) : (
            <video src={videoSrc} autoPlay muted loop playsInline className="vc-fullscreen-video" onClick={e => e.stopPropagation()} />
          )}
          <button className="vc-fullscreen-close" onClick={() => setIsFullscreen(false)}>Close ✕</button>
        </div>
      )}
    </div>
  );
}
