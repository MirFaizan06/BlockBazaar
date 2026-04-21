# BlockBazaar

A production-ready Minecraft Bedrock Mods Marketplace — browse, search, and download mods, addons, and worlds.

Built by **The NxT LvL** · [mirfaizan8803@gmail.com](mailto:mirfaizan8803@gmail.com)

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | CSS Modules + CSS custom properties |
| Animations | Framer Motion + GSAP |
| Icons | Lucide React |
| Database | Firebase Firestore |
| Storage | Firebase Storage |
| Auth | Firebase Authentication |
| File delivery | Gumroad |
| Hosting | Vercel |

---

## Features

- **Homepage** — featured, latest, and trending mods
- **Browse** — search, filter by type/tag, sort by newest or popular
- **Mod Detail** — full description, screenshots lightbox, version history, 10-second download countdown
- **Admin Panel** — full CRUD for mods, multi-admin support, dark/light mode toggle
- **Legal** — Privacy Policy (`/privacy`) and Terms of Service (`/terms`)
- **Dark / Light mode** — persisted to localStorage, works globally

---

## Getting Started

```bash
npm install
npm run dev
```

### Environment variables

Create a `.env` file at the project root (never commit this):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## Firebase Setup

### 1. Firestore — Security Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /mods/{modId} {
      allow read: if true;
      allow write: if request.auth != null
        && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    match /admins/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if false;
    }
  }
}
```

### 2. Admin account setup (per admin)

1. Firebase Console → Authentication → Add user  
   - Email: `blockbazaar.adminuser@blockbazaar.app`  
   - Password: *(see `admin-accounts.txt`)*
2. Copy the generated UID
3. Firestore → `admins` collection → New document  
   - Document ID: the UID  
   - Fields: `displayId` (string), `email` (string), `role` = `"admin"`

See `admin-accounts.txt` for all admin credentials (not committed to git).

---

## Deployment (Vercel)

1. Push to GitHub (`.env` and `admin-accounts.txt` are gitignored)
2. Import repo in Vercel
3. Add all `VITE_*` environment variables in Vercel project settings
4. Deploy — `vercel.json` handles SPA routing automatically

---

## Project Structure

```
src/
├── components/
│   ├── admin/          # AdminLayout, AdminSidebar, ToastContainer, ConfirmDialog
│   └── ui/             # Shared UI components
├── contexts/           # AuthContext, ToastContext, ThemeContext
├── guards/             # AdminRoute
├── layouts/            # MainLayout
├── pages/
│   ├── admin/          # AdminLogin, AdminDashboard, AdminMods, AdminModForm
│   ├── Home.tsx
│   ├── Browse.tsx
│   ├── ModDetail.tsx
│   ├── PrivacyPolicy.tsx
│   └── TermsOfService.tsx
├── services/           # modService, authService
├── styles/             # globals.css, variables.css (dark + light vars)
├── types/              # Mod, Version interfaces
└── lib/                # firebase.ts
```

---

## License

Private project — all rights reserved © The NxT LvL
