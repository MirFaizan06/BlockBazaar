# 🧱 BlockBazaar — Full UI Wireframe (Dev-Oriented)

> Style: Minecraft-inspired (Mojangles), dark, pixel-clean, minimal
> Grid: 12-column responsive
> Radius: small (not too modern, slight block feel)

---

# 🌐 1. GLOBAL LAYOUT

## 🔲 Structure

```
[ Navbar ]
[ Page Content ]
[ Footer ]
```

---

## 🧭 Navbar (Sticky Top)

```
[Logo]   [Search Bar.............]   [Browse] [About] [Donate]
```

### Behavior:

* Sticky
* Shrinks on scroll
* Mobile → collapses into hamburger

---

## 📱 Mobile Navbar

```
[Logo]        [☰]
```

Drawer:

```
Search
Browse
About
Donate
```

---

# 🏠 2. HOMEPAGE

## 🔷 Hero Section

```
-----------------------------------------
|  BlockBazaar                          |
|  Discover Minecraft Mods Easily       |
|                                       |
|  [ Search Mods................. ]     |
|                                       |
|  Tags: Survival | PvP | Shader | Fun  |
-----------------------------------------
```

* Subtle GSAP background animation (blocks floating)
* Search is PRIMARY CTA

---

## 🔥 Featured Mods

```
Featured Mods
-----------------------------------------
[Card] [Card] [Card]
-----------------------------------------
```

---

## 🆕 Latest Mods

```
Latest Mods
-----------------------------------------
[Card Grid - 3/4 cols desktop]
-----------------------------------------
```

---

## 📈 Trending

```
Trending
-----------------------------------------
[Horizontal Scroll Cards →]
-----------------------------------------
```

---

# 🧩 3. MOD CARD COMPONENT

```
---------------------------------
| [Thumbnail Image]             |
|                               |
|  Title                        |
|  Short description...         |
|                               |
|  #survival #addon             |
|                               |
|  ⬇ 12.4K     👤 Author        |
---------------------------------
```

### Interaction:

* Hover → slight scale + glow
* Click → go to mod page

---

# 🔍 4. BROWSE PAGE

## Layout

```
-----------------------------------------
| Filters Sidebar |  Mods Grid          |
|                 |                     |
|                 | [Card][Card][Card]  |
|                 | [Card][Card][Card]  |
-----------------------------------------
```

---

## 🧰 Filters Sidebar

```
Filter
-----------------
Type:
[ ] mcaddon
[ ] mcworld

Tags:
[ ] Survival
[ ] PvP
[ ] UI
[ ] Fun

Sort By:
( ) Newest
( ) Popular
```

---

## 📱 Mobile Filters

* Button: **[Filters]**
* Opens modal drawer

---

# 📄 5. MOD DETAIL PAGE

## 🔷 Top Section

```
-----------------------------------------
| [Thumbnail]      Title                |
|                  by Author            |
|                                      |
|  Tags: #survival #addon              |
|                                      |
|  ⬇ 12.4K downloads                   |
|                                      |
|  [ Download Button ]                 |
-----------------------------------------
```

---

## 📸 Screenshots Section

```
Screenshots
-----------------------------------------
[Image] [Image] [Image]
-----------------------------------------
```

* Horizontal scroll
* Click → fullscreen modal

---

## 📜 Description

```
Description
-----------------------------------------
Long formatted text...
-----------------------------------------
```

---

## 🧾 Version History

```
Version History
-----------------------------------------
v1.2.0 - Added features
v1.1.0 - Fixes
-----------------------------------------
```

---

## 🚀 Download Button Behavior

### Click → Modal

```
-----------------------------------------
|  ❤️ Thanks for downloading!           |
|                                       |
|  Support the creator if you can       |
|                                       |
|  Redirecting in 10 seconds...         |
|                                       |
|  [Donate]     [Skip]                  |
-----------------------------------------
```

---

# 🔲 6. MODAL COMPONENT (Reusable)

Used for:

* Download delay
* Image preview
* Filters (mobile)

---

# 💖 7. DONATION MODAL (Global Trigger)

```
-----------------------------------------
|  Support BlockBazaar ❤️               |
|                                       |
|  Help us keep this platform running   |
|                                       |
|  [Donate via Gumroad]                |
-----------------------------------------
```

---

# 📎 8. FOOTER

```
-----------------------------------------
BlockBazaar

Built by The NxT LvL

[Contact] [GitHub (future)]

© 2026
-----------------------------------------
```

---

# 🎨 DESIGN SYSTEM

## Colors (Minecraft Inspired)

```
Background: #0f0f0f
Surface:    #1a1a1a
Primary:    #7ED957 (Minecraft green)
Accent:     #3C8527
Text:       #EDEDED
Muted:      #A1A1A1
```

---

## Typography

* Headings → Mojangles-style
* Body → Clean sans fallback

---

## Spacing

* 8px grid system
* Cards padding: 12–16px

---

## Buttons

```
Primary:
[ Download ]
Green block style

Secondary:
Outlined
```

---

# ⚡ ANIMATIONS

### Use:

* Framer Motion → UI transitions
* GSAP → Hero animation ONLY

### Examples:

* Page fade-in
* Card hover lift
* Modal scale-in

---

# 📱 RESPONSIVENESS

## Breakpoints

* Mobile: 0–640px → 1 column
* Tablet: 640–1024 → 2 columns
* Desktop: 1024+ → 3–4 columns

---

# 🔍 SEARCH UX

* Instant filtering (client-side first)
* Debounced input
* Highlight matches (optional later)

---

# 🧠 UX PRINCIPLES

* 2-click access to download
* No clutter
* Always visible search
* Fast loading

---

# 🧩 COMPONENT LIST (FOR AGENTS)

* Navbar
* Footer
* ModCard
* SearchBar
* FilterSidebar
* Modal
* Button
* Tag
* SectionWrapper
* GridLayout

---

# 🚀 FINAL NOTE

This wireframe is intentionally:

* **Simple**
* **Scalable**
* **Fast to build**

No unnecessary dashboards, no auth yet — just a **clean, addictive browsing + download experience**.