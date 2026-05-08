"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { postLead } from "@/lib/api";

interface ContactProps {
  brand: string;
}

export default function ContactSection({ brand }: ContactProps) {
  const [form, setForm]     = useState({ fullName: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const ok = await postLead({
        fullName:   form.fullName,
        phone:      form.phone,
        email:      form.email,
        partSlug:   "contact-form",
        partType:   "General Inquiry",
        sourcePage: brand,
        notes:      form.message,   // ← now saved correctly
      });
      setStatus(ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">

        {/* LEFT — contact info */}
        <div className="contact-info">
          <h2 className="contact-title">Contact Us</h2>
          <h3 className="contact-subtitle">Get in touch</h3>
          <p className="contact-desc">
            Use our contact form for all information requests or contact us directly
            using the contact information below.
          </p>
          <p className="contact-desc">Feel free to get in touch with us via email or phone.</p>

          <div className="contact-detail">
            <div className="contact-detail-header">
              <MapPin size={16} className="contact-icon" />
              <strong>Our Office Location</strong>
            </div>
            <p className="contact-detail-text">8819 Trans St. South Gate,<br />CA 90280</p>
          </div>

          <div className="contact-detail">
            <div className="contact-detail-header">
              <Phone size={16} className="contact-icon" />
              <strong>Phone</strong>
            </div>
            <p className="contact-detail-text">
              <a href="tel:18004959912" style={{ color: "var(--brand)", textDecoration: "none", fontWeight: 700 }}>
                (800) 495-9912
              </a>
            </p>
          </div>

          <div className="contact-detail">
            <div className="contact-detail-header">
              <Mail size={16} className="contact-icon" />
              <strong>Email</strong>
            </div>
            <p className="contact-detail-text">
              <a href="mailto:transmissionsforsale@hello.com" style={{ color: "var(--brand)", textDecoration: "none" }}>
                transmissionsforsale@hello.com
              </a>
            </p>
          </div>
        </div>

        {/* MIDDLE — Map */}
        <div className="contact-map-wrap">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-118.2850%2C33.9400%2C-118.1850%2C33.9800&layer=mapnik&marker=33.9547%2C-118.2101"
            className="contact-map"
            loading="lazy"
            title="Our Location — South Gate, CA"
          />
        </div>

        {/* RIGHT — Quotation form */}
        <div className="contact-form-card">
          <h3 className="contact-form-title">Get a Free Quotation</h3>

          {status === "success" ? (
            <div className="contact-success" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "24px 0" }}>
              <CheckCircle size={48} color="#16a34a" />
              <p style={{ fontWeight: 700, color: "#111827", fontSize: 15 }}>Thank you!</p>
              <p style={{ color: "#6b7280", fontSize: 13, textAlign: "center", lineHeight: 1.6 }}>
                We&apos;ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => { setStatus("idle"); setForm({ fullName: "", phone: "", email: "", message: "" }); }}
                className="contact-send-btn"
                style={{ marginTop: 8, padding: "10px 28px" }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div>
                <label className="contact-label">Full Name</label>
                <input
                  className="contact-input" placeholder="Enter Your Full Name"
                  required value={form.fullName} onChange={set("fullName")}
                />
              </div>
              <div>
                <label className="contact-label">Phone Number</label>
                <input
                  className="contact-input" type="tel" placeholder="Enter Your Phone Number"
                  value={form.phone} onChange={set("phone")}
                />
              </div>
              <div>
                <label className="contact-label">Email Address</label>
                <input
                  className="contact-input" type="email" placeholder="Enter Your Email Address"
                  required value={form.email} onChange={set("email")}
                />
              </div>
              <div>
                <label className="contact-label">Message</label>
                <textarea
                  className="contact-textarea" placeholder="Enter your message…"
                  rows={4} value={form.message} onChange={set("message")}
                />
              </div>
              {status === "error" && (
                <p className="contact-error">Something went wrong. Please try again or call us.</p>
              )}
              <button type="submit" className="contact-send-btn" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
