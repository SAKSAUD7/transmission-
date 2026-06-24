"use client";
import { useState, useEffect } from "react";
import { API_BASE } from "@/lib/api";

/* ─── Types ───────────────────────────────────────────────────── */
interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  partType: string;
  lovedMost: string[];
  featured: boolean;
}

interface ReviewsSectionProps {
  partName?: string;
}

/* ─── Constants ──────────────────────────────────────────────── */
const RATING_OPTIONS = ["All Ratings", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];
const TYPE_OPTIONS   = ["All Types", "Transmission", "Engine", "Axle", "Differential", "Drive Shaft"];
const LOVED_OPTIONS  = ["Loved the most", "Great customer support", "Fast shipping", "Competitive pricing", "Accurate description"];

/* ─── Star Row ───────────────────────────────────────────────── */
function StarRow({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span className="rev-stars" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < rating ? "rev-star filled" : "rev-star"}>★</span>
      ))}
      <span className="rev-rating-num">{rating}/{max}</span>
    </span>
  );
}

/* ─── Write-a-Review Modal ────────────────────────────────────── */
function WriteReviewModal({
  partName,
  onClose,
  onSuccess,
}: {
  partName: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm]       = useState({ name: "", location: "", rating: 5, title: "", body: "", partType: partName });
  const [loved, setLoved]     = useState<string[]>([]);
  const [customLoved, setCL]  = useState("");
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg]   = useState("");

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const toggleLoved = (item: string) =>
    setLoved(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const lovedList = [...loved, ...(customLoved.trim() ? [customLoved.trim()] : [])].slice(0, 4);

    try {
      const res = await fetch(`${API_BASE}/api/reviews/submit/`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:      form.name,
          location:  form.location,
          rating:    Number(form.rating),
          partType:  form.partType,
          title:     form.title,
          body:      form.body,
          lovedMost: lovedList.length ? lovedList : ["Great customer support"],
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setErrMsg(data.error || "Submission failed. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrMsg("Network error. Please check your connection.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="rev-modal-box" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          <div style={{ textAlign: "center", padding: "32px 16px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <h3 className="rev-modal-title">Thank you for your review!</h3>
            <p className="rev-modal-sub">Your review has been submitted and is pending approval. It will appear on the website shortly.</p>
            <button className="rev-submit-btn" style={{ marginTop: 24 }} onClick={() => { onClose(); onSuccess(); }}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="rev-modal-box"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Write a Review"
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <h3 className="rev-modal-title">Write a Review</h3>
        <p className="rev-modal-sub">Share your experience with TransmissionsForSale</p>

        <form className="rev-modal-form" onSubmit={handleSubmit}>
          <div className="rev-modal-row">
            <div className="rev-modal-field">
              <label className="rev-modal-label">Your Name *</label>
              <input className="rev-modal-input" required placeholder="e.g. John D." value={form.name} onChange={set("name")} />
            </div>
            <div className="rev-modal-field">
              <label className="rev-modal-label">Location</label>
              <input className="rev-modal-input" placeholder="City, State ZIP" value={form.location} onChange={set("location")} />
            </div>
          </div>

          <div className="rev-modal-row">
            <div className="rev-modal-field">
              <label className="rev-modal-label">Part Type</label>
              <input className="rev-modal-input" disabled value={form.partType} />
            </div>
            <div className="rev-modal-field">
              <label className="rev-modal-label">Rating *</label>
              <div className="rev-star-picker">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    type="button"
                    className={`rev-star-pick-btn ${n <= form.rating ? "active" : ""}`}
                    onClick={() => setForm(f => ({ ...f, rating: n }))}
                    aria-label={`${n} stars`}
                  >★</button>
                ))}
              </div>
            </div>
          </div>

          <div className="rev-modal-field">
            <label className="rev-modal-label">Review Title *</label>
            <input className="rev-modal-input" required placeholder="Summarise your experience" value={form.title} onChange={set("title")} />
          </div>

          <div className="rev-modal-field">
            <label className="rev-modal-label">Your Review *</label>
            <textarea className="rev-modal-textarea" required rows={4} placeholder="Tell us what you loved…" value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} />
          </div>

          <div className="rev-modal-field">
            <label className="rev-modal-label">Loved the Most (pick up to 4)</label>
            <div className="rev-loved-chips">
              {["Great customer support", "Fast shipping", "Competitive pricing", "Accurate description", "Easy ordering"].map(item => (
                <button
                  key={item}
                  type="button"
                  className={`rev-chip ${loved.includes(item) ? "active" : ""}`}
                  onClick={() => toggleLoved(item)}
                >
                  {loved.includes(item) && <span>✓ </span>}{item}
                </button>
              ))}
            </div>
            <input
              className="rev-modal-input"
              style={{ marginTop: 8 }}
              placeholder="Or type your own…"
              value={customLoved}
              onChange={e => setCL(e.target.value)}
            />
          </div>

          {status === "error" && (
            <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>{errMsg}</p>
          )}

          <button type="submit" className="rev-submit-btn" disabled={status === "loading"}>
            {status === "loading" ? "Submitting…" : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Main Section ────────────────────────────────────────────── */
export default function ReviewsSection({ partName = "Transmission" }: ReviewsSectionProps) {
  const [reviews, setReviews]     = useState<Review[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  // Fetch approved reviews from Django API specifically for this part category
  const loadReviews = () => {
    setLoading(true);
    fetch(`${API_BASE}/api/reviews/?type=${encodeURIComponent(partName)}`)
      .then(r => r.json())
      .then((data: Review[]) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadReviews(); }, [partName]);

  const visibleReviews = reviews.slice(0, visibleCount);

  return (
    <section id="reviews" className="rev-section">
      {showModal && (
        <WriteReviewModal
          partName={partName}
          onClose={() => setShowModal(false)}
          onSuccess={loadReviews}
        />
      )}

      <div className="rev-inner">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
          <h2 className="rev-heading" style={{ marginBottom: 0 }}>Real Experiences, Real Satisfaction</h2>
          <button id="rev-write-btn" className="rev-write-btn" onClick={() => setShowModal(true)}>
            Write a review
          </button>
        </div>

        {/* Review list */}
        <div className="rev-list" role="list">
          {loading && (
            <p className="rev-empty">Loading {partName} reviews…</p>
          )}

          {!loading && reviews.length === 0 && (
            <p className="rev-empty">
              No reviews yet for {partName}. Be the first to share your experience!
            </p>
          )}

          {!loading && visibleReviews.map((r, idx) => (
            <div key={r.id} className="rev-row" role="listitem">
              {/* Col 1 – Reviewer */}
              <div className="rev-col-who">
                <p className="rev-reviewer-name">{r.name}</p>
                <p className="rev-reviewer-location">{r.location}</p>
              </div>

              {/* Col 2 – Stars + Review */}
              <div className="rev-col-body">
                <StarRow rating={r.rating} />
                <p className="rev-review-title">{r.title}</p>
                <p className="rev-review-body">{r.body}</p>
              </div>

              {/* Col 3 – Loved the Most */}
              <div className="rev-col-loved">
                <p className="rev-loved-header">LOVED THE MOST</p>
                <ul className="rev-loved-list">
                  {r.lovedMost.map((item, i) => (
                    <li key={i} className="rev-loved-item">
                      <span className="rev-loved-check">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {idx < visibleReviews.length - 1 && <div className="rev-divider" />}
            </div>
          ))}

          {!loading && reviews.length > visibleReviews.length && (
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <button 
                className="rev-write-btn" 
                style={{ background: "#f3f4f6", color: "#111827" }} 
                onClick={() => setVisibleCount(c => c + 5)}
              >
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
