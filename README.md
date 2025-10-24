# ShopSphere

> A small React + Vite + TypeScript storefront demo with Tailwind CSS styling and a minimal Express server file included.

This repository contains a simple e-commerce front-end built with React (TypeScript), Vite for bundling, and Tailwind CSS for styling. It includes example pages (Shop, Deals, Categories, Login/Signup) and a client-side cart persisted to localStorage.

## Features
- React + TypeScript UI
- Vite dev server and build
- Tailwind CSS for styling (with plugins)
- Example product catalog included in `src/App.tsx` and `src/Shop.tsx`
- Simple cart persisted to `localStorage`
- Framer Motion for animations
- Basic Express server file present (`server.js`) for demonstration (not required to run the client)

## Requirements
- Node.js 18+ recommended
- npm (comes with Node) or yarn/pnpm

## Quick start

1. Install dependencies

```powershell
npm install
```

2. Run the dev server

```powershell
npm run dev
```

This starts Vite and serves the app at http://localhost:5173 (or another port Vite chooses).

3. Build for production

```powershell
npm run build
```

4. Preview production build

```powershell
npm run preview
```

## Project structure (important files)
- `index.html` - Vite entry HTML
- `src/main.tsx` - React entry file
- `src/App.tsx` - Primary layout and (currently) product data
- `src/Shop.tsx` - Shop page that also contains a large product list
- `src/ShopFooter.tsx` - Footer component
- `src/*.tsx` - Pages/components
- `src/index.css` / `style.css` - Tailwind / custom styles
- `server.js` - Simple Express server (optional)

## Notes about product data
The repository currently contains product arrays inside `src/App.tsx` and `src/Shop.tsx`. These are static example datasets. If you plan to extend the app, I recommend centralizing product data into a module (for example `src/data/products.ts`) and importing it where needed to avoid duplication and keep data consistent.

If you'd like, I can move the product list into `src/data/products.ts` and update `App.tsx` and `Shop.tsx` to import it.

## Development tips
- Tailwind is configured in `tailwind.config.js`. If you add classes and they don't appear, ensure your files are included in the `content` list in that config.
- TypeScript is included — run `npm run build` to run `tsc` (project uses `tsconfig.json`).

## Tests & Linting
There are currently no automated tests or linters configured. Adding ESLint/Prettier and a couple of unit tests (Jest/Vitest) is a recommended next step.

## Next steps (suggested)
- Centralize product data into `src/data/products.ts` and import from pages.
- Add ESLint and Prettier for consistent code style.
- Add unit/integration tests (Vitest or Jest + React Testing Library).
- Add a small API (Express) to serve products instead of static data.

## Contact / License
This project is a demo. No license is specified — add a LICENSE file if you plan to share it publicly.

---

If you want I can also:
- Run a quick TypeScript build/check to confirm there are no issues after the recent change
- Move product data into a shared module and update imports

Tell me which you'd like next.
