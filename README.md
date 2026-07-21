# NovaCart — Ecommerce Project

Clean folder structure with separate **frontend** and **backend**.

## Project Structure

```
flipkart clone/
├── frontend/          → Next.js + React + TypeScript (UI)
│   └── src/components/
│       ├── ui/        → Button, Input, Badge, Logo, PageTitle, SectionHeading
│       ├── layout/    → Navbar, Footer, BottomNav, SearchBar, CategoryMenu, ProfileMenu
│       ├── home/      → HeroBanner, CategoryList, ProductGrid, TrustBar
│       ├── product/   → ProductCard, ProductModal
│       └── providers/ → StoreProvider, Providers
│
└── backend/           → Node.js + Express + MongoDB (API)
    ├── server.js
    ├── models/
    └── routes/
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**

## Run Backend

```bash
cd backend
npm install
npm start
```

API runs on **http://localhost:5000**

> MongoDB should be running on `mongodb://127.0.0.1:27017`

## Component Names (Easy to Use)

| Old Name | New Name |
|----------|----------|
| Header / Navbar nested | **Navbar** |
| MobileNav | **BottomNav** |
| MegaMenu | **CategoryMenu** |
| UserMenu | **ProfileMenu** |
| HeroSlider | **HeroBanner** |
| CategoryStrip | **CategoryList** |
| FeaturedProducts | **ProductGrid** |
| PromoBanner | **TrustBar** |
| PageHeader | **PageTitle** |
| SectionTitle | **SectionHeading** |
| QuickViewModal | **ProductModal** |
| ReduxProvider | **StoreProvider** |
| AppProviders | **Providers** |
