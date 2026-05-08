# Auto Parts Landing Pages — Monorepo

## 🗂 Structure

```
transmission/
├── apps/
│   ├── web/          → Next.js 15 frontend
│   └── api/          → Django backend
├── design/           → Figma reference PNGs (do not delete)
└── README.md
```

## 🚀 Running Locally

### 1. Frontend (Next.js) — http://localhost:3000
```powershell
cd apps/web
npm run dev
```

### 2. Backend (Django) — http://localhost:8000
```powershell
cd apps/api
.\venv\Scripts\python.exe manage.py runserver 8000
```

### 3. Admin Panel — http://localhost:8000/admin/
- **Username:** `admin`
- **Password:** `admin123`
- View all submitted leads here

---

## 🌐 Pages

| Page | URL |
|------|-----|
| Transmissions For Sale | `http://localhost:3000/` |
| Engines For Sale | `http://localhost:3000/engines-for-sale/` |
| Axle Shaft For Sale | `http://localhost:3000/axle-shaft-for-sale/` |
| Drive Shaft For Sale | `http://localhost:3000/drive-shaft-for-sale/` |
| Differential For Sale | `http://localhost:3000/differential-for-sale/` |
| Speedometer For Sale | `http://localhost:3000/speedometer-for-sale/` |
| Throttle Body For Sale | `http://localhost:3000/throttle-body-for-sale/` |
| Transfer Case Assembly For Sale | `http://localhost:3000/transfer-case-assembly-for-sale/` |
| Steering Gear Rack & Pinion For Sale | `http://localhost:3000/steering-gear-rack-pinion-for-sale/` |
| Intake Manifold For Sale | `http://localhost:3000/intake-manifold-for-sale/` |
| Steering Column For Sale | `http://localhost:3000/steering-column-for-sale/` |
| Spindle Knuckle For Sale | `http://localhost:3000/spindle-knuckle-for-sale/` |
| Axle Assembly For Sale | `http://localhost:3000/axle-assembly-for-sale/` |
| ABS Assembly For Sale | `http://localhost:3000/abs-assembly-for-sale/` |

---

## 📋 How The Lead System Works

```
User visits page
    → Selects Make / Model / Year / Part Type  (Lead Form)
    → Clicks "Get a Free Quote →"
    → Contact Modal opens (Framer Motion popup)
    → Enters Name / Phone / Email / Zip
    → Clicks Submit
    → POST → http://localhost:8000/api/leads/
    → Lead saved to SQLite database
    → View in admin panel
```

## 🔧 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/leads/` | Create a new lead |
| GET | `/api/leads/list/` | List all leads (JSON) |

## ➕ Adding a New Part Page

Edit `apps/web/src/data/parts.ts` and add a new entry:

```ts
{
  slug: "new-part-for-sale",
  name: "New Part",
  pageTitle: "NewPartForSale",
  heroHeadline: "Get the Lowest Prices on\nUsed Parts!",
  heroSubtitle: "Save Up to 50% Off Dealer Prices with Fast Shipping!",
  heroImage: "/images/hero.png",
  productImage: "/images/new-part.png",   // add image to public/images/
  aboutText: "...",
  partTypeLabel: "Select Part Type",
  partFinderTitle: "Find the right part for your vehicle...",
  benefitTitle: "Why Choose Us for New Parts?",
  packageDetails: ["...", "30 Days — Replacement or Refund."],
  seo: {
    title: "New Part For Sale | Best Prices",
    description: "...",
    keywords: "new part for sale",
  },
}
```

That's it — the page auto-generates at `/new-part-for-sale/`.

## 🏗 Production Build (Hostinger)

```powershell
# In apps/web/next.config.ts — uncomment:
# output: "export"

cd apps/web
npm run build
# Upload the `out/` folder to Hostinger file manager
```
