# GWCL Digital Water Utility Management System

A responsive, glassmorphic single-page dashboard for Ghana Water Company Limited (GWCL) featuring landing/login, KPI overview, leak monitoring map, customer database, and technician dispatch UI. Built as a static front-end suitable for GitHub Pages.

## Live Demo
- GitHub Pages: https://brighteduful.github.io/Lloyd-Nana-Kwesi-Siaw-Digital-Water-Utility-Management-System-GWCL-Solution-/

## Features
- Modern glass UI with light/dark theme toggle and smooth animations.
- KPI cards, bar chart visuals, and animated leak map with live-style controls.
- Customers table with add-customer modal and status badges.
- Technician grid with dispatch modal and availability filter.
- Toast notifications, modal dialogs, and ripple/tilt micro-interactions.
- Responsive layout across desktop, tablet, and mobile.

## Tech Stack
- HTML, CSS (custom), JavaScript (vanilla)
- Phosphor Icons CDN, Google Fonts
- Mock data in `js/data.js` (no backend dependencies)

## Local Development
1. Clone or download the repo.
2. From the project root, start a static server (prevents CORS issues):
   - Python: `python -m http.server 8000`
   - Node (serve): `npx serve .`
3. Open http://localhost:8000/ in your browser.

## Project Structure
- `index.html` — layout and sections
- `css/style.css` — styling, themes, responsiveness
- `js/data.js` — mock datasets (kpis, leaks, customers, technicians)
- `js/app.js` — interactions, rendering, navigation, modals, toasts
- `assets/` — logo and static assets

## Deployment (GitHub Pages)
1. Push to the `main` branch of the Pages repo.
2. In GitHub: Settings → Pages → Source: `main`, folder: `/`.
3. Wait for the site to publish at the Pages URL.

## Customization
- Update data in `js/data.js` to change KPIs, leaks, customers, or technicians.
- Swap the map background or integrate a live map API in `css/style.css` / `js/app.js`.
- Adjust colors/spacing in `css/style.css` and themes via CSS variables.

## License
Proprietary – all rights reserved unless explicitly licensed otherwise.
