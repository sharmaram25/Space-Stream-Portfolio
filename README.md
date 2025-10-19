# Streamfolio

Minimal, dark-only developer portfolio template inspired by streaming UIs—polished glassmorphism, subtle motion, and an immersive 3D Earth + Moon background.

Live demo: https://space-stream-portfolio.netlify.app/

![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=0d1b2a)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38BDF8?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-7.x-0055FF?logo=framer&logoColor=white)
![three.js](https://img.shields.io/badge/three.js-0.159-black?logo=three.js&logoColor=white)

— Created by Ram Sharma · https://github.com/sharmaram25

## Table of Contents
- Features
- Screenshots
- Tech Stack
- Quickstart
- Structure
- Customize
- Deploy
- Credits

## Features
- Fixed, interactive 3D background (Earth + Moon, star field, gentle bloom)
- Crisp glass UI with soft shadows and accent rings
- Segmented navbar with animated active pill and rAF-based scroll spy
- Sections: Hero, About, Education, Skills, Projects, Experience, Contact, Footer
- Contact as interactive cards (no message form, copy-to-clipboard)
- Netlify-ready SPA redirects

## Screenshots
These screenshots reflect the current look and feel.

![Home Hero](docs/screenshots/hero-home.png)
![Projects Grid](docs/screenshots/projects.png)
![Experience Timeline](docs/screenshots/experience.png)

## Tech Stack
- Vite + React 18
- Tailwind CSS (class-based dark mode)
- Framer Motion for motion/UX
- three.js + react-three-fiber + postprocessing for the 3D scene

## Quickstart
1) Install dependencies
	npm install
2) Start dev server
	npm run dev
3) Build
	npm run build
4) Preview build
	npm run preview

## Structure
Key files at a glance:

- index.html — dark mode enforced, fonts, favicon
- src/App.jsx — page wiring and sections
- src/components/FixedBackground.jsx — Earth + Moon, stars, bloom, parallax
- src/components/Navbar.jsx — segmented control + animated active pill
- src/components/* — content sections (About, Education, Projects, Experience, Contact)
- src/index.css — Tailwind layers and small utilities (glass, chips, etc.)
- public/_redirects — SPA routing for Netlify
- public/favicon.svg — solar-system favicon

## Customize
- Update content in components under `src/components` (About, Education, Projects, Experience, Contact, etc.).
- Replace the favicon at `public/favicon.svg`.
- Colors/fonts: `tailwind.config.js` and `src/index.css`.
- Tweak the 3D scene in `src/components/FixedBackground.jsx` (lights, bloom, parallax).

## Deploy
- Netlify
  - Build: npm run build
  - Publish directory: dist
  - `_redirects` in `public/` enables SPA routing

## Credits
- Template Creator: Ram Sharma · https://github.com/sharmaram25
- Earth/Moon textures via threejs.org examples (used for demo purposes).

— Enjoy building your portfolio. Attribution is appreciated.
