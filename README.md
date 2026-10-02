# GVista

> **"Your Voice. Your Stage. Your Opportunity."**

GVista is a dedicated web application connecting event organizers with authentic public speakers, anchors, and MCs fluent in **Kannada**, **English**, and **Hindi**.

---

## Brand & Aesthetic Standards
- **Primary Color:** Deep Brown (`#1A120B`)
- **Secondary Color:** Warm Brown (`#3E2723`)
- **Accent:** Gold (`#C9A44C` / `#DFC27D`)
- **Light Contrast:** Cream (`#F5E6C8`)
- **Typography:** Plus Jakarta Sans & Cinzel

---

## Initial Language Scope
In accordance with product guidelines, the active platform strictly supports three languages:
1. **Kannada**
2. **English**
3. **Hindi**

---

## Tech Stack
- **Framework:** React 18 (TypeScript) + Vite
- **Routing:** React Router v6 (SPA configured with `vercel.json`)
- **Styling:** Tailwind CSS + PostCSS
- **Icons:** Lucide React
- **Authentication & Database:** Firebase Authentication & Cloud Firestore

---

## Project Structure
```text
gvista/
├── firestore.rules          # Production security rules for users & admins
├── firestore.indexes.json   # Firestore composite indexes definition
├── vercel.json              # SPA rewrite rule for Vercel deployment
├── .env.example             # Firebase environment variables template
├── public/
│   └── logo.svg
├── src/
│   ├── components/
│   │   ├── AnchorCard.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── SoundWaveVisualizer.tsx
│   ├── context/
│   │   └── AuthContext.tsx  # Auth state, session persistence & admin listener
│   ├── lib/
│   │   └── firebase.ts      # Firebase SDK client initialization
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── AdminDashboardPage.tsx # Secure owner dashboard
│   │   ├── AnchorsDiscoveryPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── ForgotPasswordPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── HowItWorksPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── types/
│   │   └── index.ts
│   ├── vite-env.d.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Production Firebase & Deployment Setup

Follow these steps to configure Firebase and deploy to Vercel.

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** (or **Create a project**), name it `gvista` (or your choice), and continue.
3. Click **Add app** and select the **Web** icon (`</>`).
4. Register the app (e.g., `gvista-web`). You will see the `firebaseConfig` object with your API keys.

### 2. Enable Firebase Authentication
1. In the Firebase Console left menu, navigate to **Build** → **Authentication**.
2. Click **Get Started**.
3. Under the **Sign-in method** tab, choose **Email/Password**.
4. Enable the **Email/Password** toggle and click **Save**.

### 3. Create Cloud Firestore Database
1. In the Firebase Console left menu, navigate to **Build** → **Firestore Database**.
2. Click **Create database**.
3. Choose your nearest Cloud Firestore location (e.g., `asia-south1` for Mumbai).
4. Start in **Production mode** and finish setup.
5. In the **Rules** tab of Firestore Database, copy and paste the contents of [`firestore.rules`](file:///c:/Users/HP/gvista/firestore.rules) and click **Publish**.

### 4. Create the First Owner/Admin Record in Firebase Console
The owner dashboard (`/admin`) is secured at the database layer using Firestore security rules that check for the existence of `admins/{uid}`. Client code cannot create or write to `admins/{uid}`.

To grant yourself initial owner/admin access:
1. Register an account on the GVista frontend via `/register` (e.g. `owner@gvista.com`).
2. Go to **Firebase Console** → **Authentication** → **Users** tab. Copy your newly created account's **User UID** (a string like `a1B2c3D4e5...`).
3. In Firebase Console, navigate to **Firestore Database** → **Data** tab.
4. Click **Start collection**:
   - **Collection ID**: `admins`
   - Click **Next**.
   - **Document ID**: Paste your copied **User UID** exactly.
   - **Field**: `role` | **Type**: `string` | **Value**: `admin`
   - **Field**: `addedAt` | **Type**: `string` | **Value**: `2026-09-30T00:00:00.000Z`
   - Click **Save**.
5. Log into GVista with that account. You will now see the **Admin** link in the navigation bar and have full authorization to view `/admin`. Any non-admin attempting to visit `/admin` will be denied by both the UI barrier and Firestore rules.

---

## Environment Variables Configuration

Copy `.env.example` to `.env` for local testing:
```bash
cp .env.example .env
```

Fill in the environment variables from your Firebase Web App configuration:
```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Adding to Vercel:
1. In your [Vercel Dashboard](https://vercel.com/), select the **gvista** project.
2. Go to **Settings** → **Environment Variables**.
3. Add the 6 variables above for **Production**, **Preview**, and **Development** environments.
4. Trigger a Redeploy (or push to the repository) for the variables to take effect.

---

## Local Development & Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Server
```bash
npm run dev
```
Visit `http://localhost:5173`.

### 3. Production Build & Verification
```bash
npm run build
```
Verify that TypeScript compilation passes and chunks are generated under `dist/`.
