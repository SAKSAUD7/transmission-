"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { getPartImage } from "@/data/vehicleImages";
import VehicleCreative from "@/components/ui/VehicleCreative";
import { postLead } from "@/lib/api";

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
        carMake: "", carModel: "", carYear: "",
        partSlug, partType: defaultPartType || partSlug, sourcePage,
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
            <p className="lead-hint">Get a free quote instantly. Our experts will help you find the exact part you need.</p>
            <button className="lead-btn" onClick={openModal}>Get My Part</button>
          </div>

          {/* RIGHT — 360° vehicle creative */}
          <VehicleCreative make="" model="" year="" partType={defaultPartType || partSlug} partSlug={partSlug} partImage={getPartImage(partSlug)} />
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
