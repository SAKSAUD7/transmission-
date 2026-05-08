"use client";
import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { postLead } from "@/lib/api";

interface SidebarProps {
  partSlug?: string;
  sourcePage?: string;
  make?: string;
  model?: string;
  year?: string;
}

export default function LeadFormSidebar({ partSlug = "", sourcePage = "", make = "", model = "", year = "" }: SidebarProps) {
  const [open, setOpen]     = useState(true);
  const [form, setForm]     = useState({ fullName: "", phone: "", email: "", zip: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
        partSlug, partType: partSlug, sourcePage,
      });
      setStatus(ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Toggle tab — visible when sidebar is closed */}
      <AnimatePresence>
        {!open && (
          <motion.button
            className="sidebar-tab"
            onClick={() => { setOpen(true); setStatus("idle"); }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            Get a Free Quote
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            className="sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Close">
              <X size={14} />
            </button>

            {status === "success" ? (
              <div className="sidebar-success">
                <CheckCircle size={40} color="#16a34a" />
                <h3>Request Submitted!</h3>
                <p>Our team will contact you within 24 hours with the best price.</p>
                <button onClick={() => { setOpen(false); setStatus("idle"); }} className="sidebar-submit">
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="sidebar-title">Get a Free Quote Now</h2>
                <form className="sidebar-form" onSubmit={handleSubmit}>
                  <div>
                    <label className="sidebar-label">Full Name</label>
                    <input className="sidebar-input" placeholder="Your Full Name" required
                      value={form.fullName} onChange={set("fullName")} />
                  </div>
                  <div>
                    <label className="sidebar-label">Phone Number</label>
                    <input className="sidebar-input" type="tel" placeholder="Your Phone Number" required
                      value={form.phone} onChange={set("phone")} />
                  </div>
                  <div>
                    <label className="sidebar-label">Email Address</label>
                    <input className="sidebar-input" type="email" placeholder="Your Email Address" required
                      value={form.email} onChange={set("email")} />
                  </div>
                  <div>
                    <label className="sidebar-label">Zip Code</label>
                    <input className="sidebar-input" placeholder="Zip Code"
                      value={form.zip} onChange={set("zip")} />
                  </div>
                  {status === "error" && (
                    <p className="sidebar-error">Connection error. Please try again.</p>
                  )}
                  <button type="submit" className="sidebar-submit" disabled={status === "loading"}>
                    {status === "loading" ? "Submitting…" : "Submit Request"}
                  </button>
                </form>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
