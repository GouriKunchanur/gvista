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
In accordance with product guidelines, the active MVP strictly supports three languages:
1. **Kannada**
2. **English**
3. **Hindi**

---

## Tech Stack
- **Framework:** React (TypeScript) + Vite
- **Styling:** Tailwind CSS + PostCSS
- **Icons:** Lucide React
- **Cloud & Backend (Phase 2):** Firebase (Auth, Cloud Firestore, Firebase Storage)

---

## Project Structure
```text
gvista/
├── public/
│   └── logo.svg
├── src/
│   ├── components/
│   │   ├── AnchorCard.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── SoundWaveVisualizer.tsx
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── AnchorsDiscoveryPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── HowItWorksPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
