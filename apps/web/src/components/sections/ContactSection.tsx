"use client";
import { useState } from "react";
import { MapPin, Phone } from "lucide-react";

interface ContactProps {
  brand: string;
}

export default function ContactSection({ brand }: ContactProps) {
  const [form, setForm] = useState({ fullName: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:8000/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: "",
          zip: "",
          carMake: "", carModel: "", carYear: "",
          partSlug: "contact-form",
          partType: "General Inquiry",
          sourcePage: brand,
          notes: form.message,
        }),
      });
      setStatus(res.ok || res.status === 201 ? "success" : "error");
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
            Use our contact form for all information requests or contact us directly using the
            contact information below.
          </p>
          <p className="contact-desc">Feel free to get in touch with us via email or phone</p>

          <div className="contact-detail">
            <div className="contact-detail-header">
              <MapPin size={16} className="contact-icon" />
              <strong>Our Office location</strong>
            </div>
            <p className="contact-detail-text">8819 trans St. South Gate,<br />CA 90280</p>
          </div>

          <div className="contact-detail">
            <div className="contact-detail-header">
              <Phone size={16} className="contact-icon" />
              <strong>Phone (Landline)</strong>
            </div>
            <p className="contact-detail-text">(800) 495-9912</p>
          </div>
        </div>

        {/* MIDDLE — Map */}
        <div className="contact-map-wrap">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-118.2850%2C33.9400%2C-118.1850%2C33.9800&layer=mapnik&marker=33.9547%2C-118.2101"
            className="contact-map"
            loading="lazy"
            title="Our Location"
          />
        </div>

        {/* RIGHT — Quotation form */}
        <div className="contact-form-card">
          <h3 className="contact-form-title">Get started with a free quotation</h3>

          {status === "success" ? (
            <div className="contact-success">
              <p>Thank you! We&apos;ll get back to you shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div>
                <label className="contact-label">Full Name</label>
                <input
                  className="contact-input"
                  placeholder="Enter Your Full Name"
                  required
                  value={form.fullName}
                  onChange={set("fullName")}
                />
              </div>
              <div>
                <label className="contact-label">Email Address</label>
                <input
                  className="contact-input"
                  type="email"
                  placeholder="Enter Your Email Address"
                  required
                  value={form.email}
                  onChange={set("email")}
                />
              </div>
              <div>
                <label className="contact-label">Message</label>
                <textarea
                  className="contact-textarea"
                  placeholder="Enter your message"
                  rows={4}
                  value={form.message}
                  onChange={set("message")}
                />
              </div>
              {status === "error" && (
                <p className="contact-error">Something went wrong. Please try again.</p>
              )}
              <button type="submit" className="contact-send-btn" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
