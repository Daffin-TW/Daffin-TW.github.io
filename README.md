
# Daffin TW — Personal Portfolio

[![Deploy to GitHub Pages](https://github.com/Daffin-TW/Daffin-TW.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Daffin-TW/Daffin-TW.github.io/actions/workflows/deploy.yml)

> **Live site:** [https://daffin-tw.github.io](https://daffin-tw.github.io)

A clean, modern, responsive personal portfolio website built with pure **HTML5 + CSS3 + JavaScript** — no build step required.

---

## 📁 Project Structure

```
Daffin-TW.github.io/
├── index.html                  # Main single-page site
├── src/
│   ├── config/
│   │   └── site.js             # Site-wide config (name, social links, email)
│   ├── data/
│   │   └── projects.js         # Project data (titles, descriptions, images)
│   ├── scripts/
│   │   └── main.js             # All JS functionality
│   ├── styles/
│   │   └── main.css            # Complete stylesheet
│   └── img/                    # All project screenshots & profile picture
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions auto-deploy workflow
└── README.md
```

---

## 🚀 Local Development

No build step or package installation required. Just open the file in your browser or serve it locally:

### Option 1 — Open directly (simplest)
Double-click `index.html` to open it in your browser. Everything works on the `file://` protocol.

### Option 2 — Local HTTP server (recommended)

Using Python (built-in):
```bash
cd /path/to/Daffin-TW.github.io
python3 -m http.server 8080
# Open: http://localhost:8080
```

Using Node.js (if installed):
```bash
npx serve .
```

---

## ⚙️ Configuration

### Add Your Email
Edit [`src/config/site.js`](src/config/site.js) and fill in the `email` field to enable the email contact button:

```js
window.SITE_CONFIG = {
  name: "Daffin TW",
  tagline: "Turning Data into Insights.",
  github: "https://github.com/Daffin-TW",
  linkedin: "https://www.linkedin.com/in/daffintw",
  email: "dtwdaffintw@email.com",   // ← add your email here
};
```

If `email` is empty (`""`), the email button is automatically hidden.

### Update Projects
Edit [`src/data/projects.js`](src/data/projects.js) to add, remove, or update projects. Each project object supports:

| Field | Type | Description |
|---|---|---|
| `id` | number | Unique identifier (used as badge number) |
| `title` | string | Project title |
| `description` | string | Short description |
| `technologies` | string[] | List of tech tags |
| `images` | string[] | Relative paths to two screenshot images |
| `repoUrl` | string \| null | Optional GitHub link |

---

## 🌐 Deployment

The site deploys automatically via **GitHub Actions** on every push to `main`.

### Manual deployment
1. Push your changes to the `main` branch.
2. GitHub Actions builds and deploys to GitHub Pages automatically.
3. Visit `https://daffin-tw.github.io` after the workflow finishes (~1 min).

### First-time setup
1. Go to your repo **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push any change to `main` to trigger the first deploy.

---

## 🎨 Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (custom properties, Grid, Flexbox) |
| Interactivity | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts — Inter |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

---

## ♿ Accessibility

- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`)
- Skip-to-main-content link
- ARIA labels on icon-only controls
- Meaningful `alt` text on all images
- Keyboard navigation for lightbox and modals
- `prefers-reduced-motion` support
- Visible focus indicators

---

© 2026 Daffin TW. All rights reserved.
