# 🧱 `Project_Overview.md` — BlockBazaar

## 📌 Project Name

**BlockBazaar**

## 👨‍💻 Developer

**The NxT LvL**
Individual Project
Contact: [mirfaizan8803@gmail.com](mailto:mirfaizan8803@gmail.com)

---

## 🚀 Vision

BlockBazaar is a **frontend-first Minecraft Mods Marketplace** focused on:

* **Bedrock Mods (initially)** → `.mcaddon`, `.mcworld`, etc.
* Future-ready for **Java mods expansion**
* Clean, modern, **Minecraft-inspired UI (Mojangles aesthetic)**
* Fully responsive, mobile-first
* Extremely simple UX: **Search → View → Download**

This is **not an MVP** — it is a **production-ready lightweight platform** built with **zero-cost development strategy**.

---

## 🧠 Core Philosophy

* Keep architecture **simple, scalable, and low-cost**
* Avoid unnecessary backend complexity
* Use **third-party infra (Gumroad + Firebase)** smartly
* Optimize for:

  * ⚡ Performance
  * 📱 Mobile UX
  * 🔍 SEO discoverability
  * 💸 Zero/Minimal cost

---

## 🏗️ Tech Stack (Final Decisions)

### Frontend

* React + TypeScript (Vite)
* TailwindCSS (custom Minecraft theme layer)
* Framer Motion (UI animations)
* GSAP (minimal hero/advanced animations)
* Lucide Icons (NO emojis)

### Hosting

* Vercel (free tier)

### Data & Storage

* Firebase:

  * Firestore → metadata (mods, downloads, stats)
  * Firebase Storage → screenshots (ONLY if needed)

### File Delivery

* Gumroad:

  * Hosts mod files
  * Handles “pay what you want”
  * Download redirect

---

## 🧩 Core Features

### 1. Homepage

* Featured mods
* Latest uploads
* Trending (based on downloads)

---

### 2. Mod Listing Page

* Grid layout
* Filters:

  * Type (mcaddon, mcworld, etc.)
  * Tags
* Sorting:

  * Newest
  * Popular
* Search (client-side optimized)

---

### 3. Mod Detail Page (Expansion Page)

Each mod includes:

* Title
* Thumbnail
* Description (short + long)
* Author
* Tags
* Upload date
* Version history
* Screenshots
* Download button

---

### 4. Download Flow (IMPORTANT UX)

When user clicks download:

1. Show **modal (10 seconds)**:

   > “Thanks for downloading! Consider supporting the developer ❤️”

2. Options:

   * Continue to download (after timer)
   * Donate (Gumroad)

3. Redirect → Gumroad

---

### 5. Sharing

* Native share (mobile)
* Social links (copy URL)

---

### 6. Download Count

* Increment stored in Firestore
* Lightweight update (no heavy backend)

---

## 🧱 Data Model (Firestore)

### `mods` collection

```
id
title
slug
thumbnail
shortDesc
longDesc
author
tags[]
type
createdAt
versions[]
screenshots[]
gumroadUrl
downloadCount
```

---

## 🎨 UI / Design System

### Theme

* Inspired by Minecraft UI (Mojangles style)
* Pixel-style but modernized

### Typography

* Mojangles-style font (custom import)

### Design Rules

* Minimal
* Grid-based
* Soft shadows
* Rounded cards (slightly)
* Dark theme primary

---

## ⚡ Performance Rules

* Static pages where possible
* Lazy load images
* Avoid heavy libraries
* Minimal API calls
* Cache Firestore reads

---

## 🔍 SEO Strategy

* Each mod = unique SEO page
* Use:

  * title tags
  * meta description
  * keywords from tags
* Clean URLs:

  ```
  /mod/:slug
  ```

---

## 🔐 Security

* No direct file hosting
* All downloads via Gumroad
* Firebase rules:

  * Public read
  * Restricted writes

---

## 🔮 Future Expansion (DO NOT BUILD NOW)

* Creator accounts
* Upload dashboard
* Reviews & ratings
* Java mod support UI toggle
* Admin panel

---

## 🤖 Agentic Development Instructions

> ⚠️ IMPORTANT: DO NOT EXPLAIN. DO NOT COMMENT. JUST BUILD.

* Use **4–5 parallel agents**:

  1. UI/Layout Agent
  2. Components Agent
  3. Firebase/Data Agent
  4. Routing + Pages Agent
  5. Styling/Theme Agent

* Work simultaneously

* Avoid redundant tokens

* Reuse components

* Follow structure strictly

---

## 📁 Folder Structure

```
BlockBazaar/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── styles/
│   ├── types/
│   └── utils/
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Environment Variables

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## 🧰 Libraries (Strict)

* react-router-dom
* firebase
* framer-motion
* gsap
* lucide-react
* clsx
* tailwindcss

---

## 🎯 Development Rules

* No overengineering
* No backend server
* No unnecessary state managers (use hooks)
* Keep everything modular
* Mobile-first always

---

## 🧪 Scalability Approach

* Keep data schema extendable
* Abstract Firebase calls
* Component reuse
* Prepare for future auth layer

---

## 🧠 Final Note to AI

* Build like a **real product**, not a demo
* Keep code clean and scalable
* Prioritize UX over complexity
* Do not output explanations
* Execute fully