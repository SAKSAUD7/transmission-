"use client";
import { useState } from "react";

/* ─── Types ───────────────────────────────────────────────────── */
interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;            // 1-5
  title: string;
  body: string;
  type: string;              // e.g. "Transmission", "Engine", …
  lovedMost: string[];       // up to 4 items
}

interface ReviewsSectionProps {
  /** Used as the "type" label in the write-a-review form */
  partName?: string;
}

/* ─── Static seed data ────────────────────────────────────────── */
const SEED_REVIEWS: Review[] = [
  {
    id: 1,
    name: "San.",
    location: "2349 S Golden park Rd\nPhoenix, AZ 76099",
    rating: 4,
    title: "Absolutely fantastic!",
    body: "I had an outstanding experience with TransmissionsForSale. The ordering process was straightforward, and the part arrived much quicker than I anticipated. The transmission was in excellent condition, exactly as described on the website. I was particularly impressed by the thorough inspection report that came with it. Overall, a top-notch service from start to finish. Highly recommend this company to anyone in need of reliable transmission parts!",
    type: "Transmission",
    lovedMost: ["Great customer support", "Lorem is the text the text is very", "Lorem is the text the text is very is that", "Lorem is the text"],
  },
  {
    id: 2,
    name: "Alex T.",
    location: "1234 Elm Street,\nSpringfield, IL 62704",
    rating: 5,
    title: "Exceeded all expectations",
    body: "I was a bit hesitant about buying a used transmission, but TransmissionsForSale exceeded my expectations. The part arrived on time and was exactly as described. It fit perfectly and has been running smoothly since installation. The shipping was fast, and the price was very competitive compared to other sellers. What I loved the most was the accuracy of the description and the great value for money. I'll certainly be returning for future needs.",
    type: "Transmission",
    lovedMost: ["Great customer support", "Lorem is the text the text is very", "Lorem is the text the text is very is that", "Lorem is the text"],
  },
  {
    id: 3,
    name: "Mark S.",
    location: "6789 Pine Street,\nSpringfield, IL 63704",
    rating: 5,
    title: "Seamless from order to delivery",
    body: "From the moment I placed my order to the delivery of the part, everything went smoothly. The customer service team was incredibly responsive and went above and beyond to ensure I received exactly what I needed. The part was well-packaged and arrived in perfect condition. I've already recommended this company to several of my colleagues who are also in need of transmission parts.",
    type: "Transmission",
    lovedMost: ["Great customer support", "Lorem is the text the text is very", "Lorem is the text the text is very is that", "Lorem is the text"],
  },
  {
    id: 4,
    name: "Linda K.",
    location: "4521 Maple Ave,\nDallas, TX 75201",
    rating: 5,
    title: "Worth every penny",
    body: "After shopping around for weeks, I finally chose TransmissionsForSale and I couldn't be happier. The quality of the part was exceptional and the price was the best I found online. Delivery was faster than expected and the customer service helped me confirm compatibility before I ordered. Five stars all the way!",
    type: "Engine",
    lovedMost: ["Fast shipping", "Accurate part description", "Great customer support", "Competitive pricing"],
  },
  {
    id: 5,
    name: "Robert D.",
    location: "8823 Oak Blvd,\nHouston, TX 77001",
    rating: 4,
    title: "Solid experience overall",
    body: "The part I ordered was in great shape and installed without any issues. Shipping took a couple of days longer than expected but the team kept me updated throughout. The inspection report gave me confidence in the quality. Would definitely order again.",
    type: "Transmission",
    lovedMost: ["Quality inspection report", "Responsive team", "Good packaging", "Fair pricing"],
  },
];

const RATING_OPTIONS  = ["All Ratings", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];
const TYPE_OPTIONS    = ["All Types", "Transmission", "Engine", "Axle", "Differential", "Drive Shaft"];
const LOVED_OPTIONS   = ["Loved the most", "Great customer support", "Fast shipping", "Competitive pricing", "Accurate description"];

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
  onSubmit,
}: {
  partName: string;
  onClose: () => void;
  onSubmit: (r: Review) => void;
}) {
  const [form, setForm]     = useState({ name: "", location: "", rating: 5, title: "", body: "", type: partName });
  const [loved, setLoved]   = useState<string[]>([]);
  const [customLoved, setCL] = useState("");

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const toggleLoved = (item: string) =>
    setLoved(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lovedList = [...loved, ...(customLoved.trim() ? [customLoved.trim()] : [])].slice(0, 4);
    onSubmit({
      id: Date.now(),
      name: form.name,
      location: form.location,
      rating: Number(form.rating),
      title: form.title,
      body: form.body,
      type: form.type,
      lovedMost: lovedList.length ? lovedList : ["Great customer support"],
    });
    onClose();
  };

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
              <select className="rev-modal-select" value={form.type} onChange={set("type")}>
                {TYPE_OPTIONS.filter(t => t !== "All Types").map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="rev-modal-field">
              <label className="rev-modal-label">Rating *</label>
              <div className="rev-star-picker">
                {[1,2,3,4,5].map(n => (
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

          <button type="submit" className="rev-submit-btn">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

/* ─── Main Section ────────────────────────────────────────────── */
export default function ReviewsSection({ partName = "Transmission" }: ReviewsSectionProps) {
  const [reviews, setReviews]     = useState<Review[]>(SEED_REVIEWS);
  const [typeFilter, setType]     = useState("All Types");
  const [ratingFilter, setRating] = useState("All Ratings");
  const [lovedFilter, setLoved]   = useState("Loved the most");
  const [showModal, setShowModal] = useState(false);

  /* ── filtering ── */
  const filtered = reviews.filter(r => {
    const typeOk   = typeFilter   === "All Types"     || r.type === typeFilter;
    const ratingOk = ratingFilter === "All Ratings"   || r.rating === Number(ratingFilter[0]);
    const lovedOk  = lovedFilter  === "Loved the most" || r.lovedMost.some(l => l.toLowerCase().includes(lovedFilter.toLowerCase()));
    return typeOk && ratingOk && lovedOk;
  });

  const handleNewReview = (r: Review) => setReviews(prev => [r, ...prev]);

  return (
    <section id="reviews" className="rev-section">
      {showModal && (
        <WriteReviewModal
          partName={partName}
          onClose={() => setShowModal(false)}
          onSubmit={handleNewReview}
        />
      )}

      <div className="rev-inner">
        {/* Header */}
        <h2 className="rev-heading">Real Experiences, Real Satisfaction</h2>

        {/* Filter bar */}
        <div className="rev-filters">
          <div className="rev-filter-left">
            <select
              id="rev-filter-type"
              className="rev-filter-select"
              value={typeFilter}
              onChange={e => setType(e.target.value)}
              aria-label="Filter by type"
            >
              {TYPE_OPTIONS.map(t => <option key={t}>{t}</option>)}
            </select>

            <select
              id="rev-filter-rating"
              className="rev-filter-select"
              value={ratingFilter}
              onChange={e => setRating(e.target.value)}
              aria-label="Filter by rating"
            >
              {RATING_OPTIONS.map(r => <option key={r}>{r}</option>)}
            </select>

            <select
              id="rev-filter-loved"
              className="rev-filter-select"
              value={lovedFilter}
              onChange={e => setLoved(e.target.value)}
              aria-label="Filter by loved the most"
            >
              {LOVED_OPTIONS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>

          <button
            id="rev-write-btn"
            className="rev-write-btn"
            onClick={() => setShowModal(true)}
          >
            Write a review
          </button>
        </div>

        {/* Scrollable review list */}
        <div className="rev-list" role="list">
          {filtered.length === 0 && (
            <p className="rev-empty">No reviews match your filters. <button className="rev-reset-link" onClick={() => { setType("All Types"); setRating("All Ratings"); setLoved("Loved the most"); }}>Reset filters</button></p>
          )}

          {filtered.map((r, idx) => (
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

              {idx < filtered.length - 1 && <div className="rev-divider" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
