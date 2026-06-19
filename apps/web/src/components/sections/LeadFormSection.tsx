"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { CAR_MAKES, CAR_MODELS_BY_MAKE, YEARS } from "@/data/vehicles";
import { getPartImage } from "@/data/vehicleImages";
import VehicleCreative from "@/components/ui/VehicleCreative";
import { postLead, API_BASE } from "@/lib/api";

interface LeadFormProps {
  title: string;
  partTypeLabel: string;
  partTypeOptions: string[];
  partSlug: string;
  sourcePage: string;
  defaultPartType?: string; // pre-select when arriving from a type sub-page
}

export default function LeadFormSection({
  title, partTypeLabel, partTypeOptions, partSlug, sourcePage, defaultPartType,
}: LeadFormProps) {
  const [make,     setMake]     = useState("");
  const [model,    setModel]    = useState("");
  const [year,     setYear]     = useState("");
  const [partType, setPartType] = useState(defaultPartType ?? "");

  // ── Dynamic model loading: API first, static fallback ─────────────────────
  const [apiModels,     setApiModels]     = useState<string[]>([]);
  const [modelsLoading, setModelsLoading] = useState(false);

  // ── Dynamic year loading: API first, static fallback ─────────────────────
  const [apiYears,     setApiYears]     = useState<string[]>([]);
  const [yearsLoading, setYearsLoading] = useState(false);

  useEffect(() => {
    if (!make) { setApiModels([]); return; }
    setModelsLoading(true);
    fetch(`${API_BASE}/api/vehicles/models/?make=${encodeURIComponent(make)}`)
      .then(r => r.json())
      .then((data: { id: number; name: string }[]) => {
        setApiModels(Array.isArray(data) && data.length > 0 ? data.map(m => m.name) : []);
      })
      .catch(() => setApiModels([]))
      .finally(() => setModelsLoading(false));
  }, [make]);

  useEffect(() => {
    if (!make || !model) { setApiYears([]); return; }
    setYearsLoading(true);
    fetch(`${API_BASE}/api/vehicles/years/?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`)
      .then(r => r.json())
      .then((data: string[]) => {
        setApiYears(Array.isArray(data) && data.length > 0 ? data : []);
      })
      .catch(() => setApiYears([]))
      .finally(() => setYearsLoading(false));
  }, [make, model]);

  // API models take priority; fall back to static data
  const models    = apiModels.length > 0 ? apiModels : (make ? (CAR_MODELS_BY_MAKE[make] || []) : []);
  const yearsList = apiYears.length > 0 ? apiYears : YEARS;
  const partImage = getPartImage(partSlug);


  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", zip: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const openModal  = () => { setStatus("idle"); setForm({ fullName: "", phone: "", email: "", zip: "" }); setModalOpen(true); };
  const closeModal = () => { if (status !== "loading") setModalOpen(false); };
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const ok = await postLead({
        fullName: form.fullName, phone: form.phone,
        email: form.email, zip: form.zip,
        carMake: make, carModel: model, carYear: year,
        partSlug, partType: partType || partSlug, sourcePage,
      });
      setStatus(ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="lead-form" className="lead-section">
      <div className="lead-inner">
        <h2 className="lead-title">{title}</h2>

        <div className="lead-card">
          {/* LEFT — vehicle selectors */}
          <div className="lead-form-col">
            <p className="lead-hint">Select your vehicle to find the right part — then get a free quote instantly.</p>

            <div>
              <label className="lead-label">Select Vehicle Make</label>
              <select className="lead-select" value={make} onChange={e => { setMake(e.target.value); setModel(""); }}>
                <option value="">Select Vehicle Make</option>
                {CAR_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className="lead-label">Select Vehicle Model</label>
              <select
                className="lead-select"
                value={model}
                onChange={e => setModel(e.target.value)}
                disabled={!make || modelsLoading}
              >
                <option value="">
                  {modelsLoading ? "Loading models…" : "Select Vehicle Model"}
                </option>
                {models.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className="lead-label">Select Vehicle Year</label>
              <select 
                className="lead-select" 
                value={year} 
                onChange={e => setYear(e.target.value)}
                disabled={!model || yearsLoading}
              >
                <option value="">
                  {yearsLoading ? "Loading years…" : "Select Vehicle Year"}
                </option>
                {yearsList.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div>
              <label className="lead-label">{partTypeLabel}</label>
              <select className="lead-select" value={partType} onChange={e => setPartType(e.target.value)}>
                <option value="">{partTypeLabel}</option>
                {partTypeOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <button className="lead-btn" onClick={openModal}>Get My Part</button>
          </div>

          {/* RIGHT — 360° vehicle creative */}
          <VehicleCreative make={make} model={model} year={year} partType={partType} partSlug={partSlug} partImage={partImage} />
        </div>
      </div>

      {/* ── Contact Modal ──
          FIX: Use a flex wrapper for centering instead of CSS transform,
          because framer-motion overwrites the `transform` property entirely,
          breaking the CSS translate(-50%,-50%) centering trick.
      */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="bd"
              className="modal-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
            />

            {/* Centering wrapper — not animated, just flexbox */}
            <div
              style={{
                position: "fixed", inset: 0, zIndex: 1000,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "16px", pointerEvents: "none",
              }}
            >
              <motion.div
                key="modal"
                style={{ pointerEvents: "auto", width: "min(420px, 100%)" }}
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 16 }}
                transition={{ type: "spring", stiffness: 360, damping: 28 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="modal-box" style={{ position: "relative" }}>
                  <button className="modal-close" onClick={closeModal}>
                    <X size={13} color="#6b7280" />
                  </button>

                  {status === "success" ? (
                    <div className="modal-success">
                      <CheckCircle size={52} color="#16a34a" style={{ margin: "0 auto 14px", display: "block" }} />
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Request Submitted!</h3>
                      <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6 }}>
                        Our team will contact you within 24 hours with the best price.
                      </p>
                      <button className="modal-success-btn" onClick={closeModal}>Close</button>
                    </div>
                  ) : (
                    <>
                      <h2 className="modal-title">Please Enter Your Contact Details</h2>

                      {(make || model || year) && (
                        <div className="modal-vehicle-tag">
                          🚗 {[make, model, year].filter(Boolean).join(" · ")}
                        </div>
                      )}

                      <form className="modal-form" onSubmit={handleSubmit}>
                        <div>
                          <label className="lead-label">Full Name</label>
                          <input className="modal-input" placeholder="Enter Your Full Name" required
                            value={form.fullName} onChange={set("fullName")} />
                        </div>
                        <div>
                          <label className="lead-label">Phone Number</label>
                          <input className="modal-input" type="tel" placeholder="Enter Your Phone Number" required
                            value={form.phone} onChange={set("phone")} />
                        </div>
                        <div>
                          <label className="lead-label">Email Address</label>
                          <input className="modal-input" type="email" placeholder="Enter Your Email Address" required
                            value={form.email} onChange={set("email")} />
                        </div>
                        <div>
                          <label className="lead-label">Zip Code</label>
                          <input className="modal-input" placeholder="Enter Your Zip Code"
                            value={form.zip} onChange={set("zip")} />
                        </div>

                        {status === "error" && (
                          <p className="modal-error">Connection error. Please try again or call us directly.</p>
                        )}

                        <button type="submit" className="modal-submit" disabled={status === "loading"}>
                          {status === "loading" ? "Submitting…" : "Get My Free Quote"}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
