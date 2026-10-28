# Daffin Tanjiro Widison — Personal Portfolio

[![Deploy to GitHub Pages](https://github.com/Daffin-TW/Daffin-TW.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Daffin-TW/Daffin-TW.github.io/actions/workflows/deploy.yml)

> **Live site:** [https://daffin-tw.github.io](https://daffin-tw.github.io)

A modern, elegant, and responsive personal portfolio website for Data Science & Machine Learning, styled with ambient dark glassmorphism and an interactive showcase inspired by `vannesanth.github.io`.

---

## 📁 Project Structure

```
Daffin-TW.github.io/
├── index.html                  # Main single-page portfolio
├── src/
│   ├── config/
│   │   └── site.js             # Site-wide configuration (WhatsApp, LinkedIn, GitHub, email)
│   ├── data/
│   │   └── projects.js         # Structured project data (titles, descriptions, repo URLs, images)
│   ├── scripts/
│   │   └── main.js             # Interactive gallery lightbox, dynamic rendering, mobile navigation
│   ├── styles/
│   │   └── main.css            # Custom glassmorphism, glowing backdrop, and smooth scrollbar
│   └── img/                    # Personal logo (tw_logo.png), profile picture, and screenshots
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions automated deployment workflow
└── README.md
```

---

## 🚀 Local Development

No compilation or build step required. Simply open the site in your browser or run a lightweight local server:

### Option 1 — Local HTTP Server (Recommended)

Using Python 3:
```bash
python3 -m http.server 8080
# Open: http://localhost:8080
```

Using Node.js:
```bash
npx serve .
```

---

## ⚙️ Configuration & Customization

### 1. Social Links & WhatsApp
Edit [`src/config/site.js`](src/config/site.js) to configure personal links:

```js
window.SITE_CONFIG = {
  name: "Daffin Tanjiro Widison",
  tagline: "Turning Complex Data into Actionable Insights & Intelligent Solutions",
  github: "https://github.com/Daffin-TW",
  linkedin: "https://www.linkedin.com/in/daffintw",
  whatsapp: "+6282332232896",
  whatsappUrl: "https://wa.me/6282332232896?text=Hello%20Daffin%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.",
  email: "dtwdaffintw@gmail.com",
};
```

### 2. Managing Projects & Repository URLs
Edit [`src/data/projects.js`](src/data/projects.js) to add or update projects. Each project entry supports:

| Field | Type | Description |
|---|---|---|
| `id` | number | Unique ID |
| `title` | string | Project title |
| `category` | string | Project category badge (e.g. `Sales Analytics & Interactive Dashboard`) |
| `categoryIcon` | string | Font Awesome icon class (e.g. `fa-solid fa-chart-pie`) |
| `description` | string | Project description |
| `technologies` | string[] | Array of technologies used |
| `images` | object[] | Screenshots with `src` and descriptive `caption` |
| `repoUrl` | string \| null | GitHub repository URL (displays "View Repository" button if set, or "Confidential / Internal" if null) |

---

## 🌐 Deployment to GitHub Pages

The portfolio is pre-configured for automated deployment via **GitHub Actions** upon pushing to the `main` branch.

1. Ensure your repository settings in **Settings → Pages** have **Source** set to **GitHub Actions**.
2. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Update portfolio for Daffin Tanjiro Widison"
   git push origin main
   ```
3. GitHub Actions will deploy the website automatically.

---

## 🎨 Tech Stack & Design Highlights

- **Aesthetic**: Slate-950 dark theme with ambient radial glows and glassmorphism.
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Space Grotesk*).
- **Styling**: Tailwind CSS CDN + custom glassmorphic CSS rules.
- **Icons**: Font Awesome 6.5.1 CDN.
- **Interactivity**:
  - Full-screen image lightbox with prev/next controls, keyboard navigation (Left/Right/Esc), and backdrop blur.
  - Responsive mobile drawer menu.
  - Smooth scrolling navigation.

---

© 2026 Daffin Tanjiro Widison. All rights reserved.
