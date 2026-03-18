# Rahul Verma — Portfolio Website

A full-stack multi-page portfolio built with **Node.js**, **Express**, and **EJS** templating.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run in development (auto-reload)
npm run dev

# 3. Or run in production
npm start
```

Open **http://localhost:3000** in your browser.

---

## 📁 Project Structure

```
portfolio/
├── server.js              # Express app entry point
├── package.json
├── data/
│   └── portfolio.json     # ← ALL your content lives here
├── routes/
│   ├── index.js           # GET /
│   ├── skills.js          # GET /skills
│   ├── education.js       # GET /education
│   ├── work.js            # GET /work  +  GET /work/:id
│   ├── contact.js         # GET /contact  +  POST /contact/send
│   └── api.js             # REST API  /api/*
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs          # Home page
│   ├── skills.ejs         # Skills page
│   ├── education.ejs      # Education page
│   ├── work.ejs           # Projects grid
│   ├── project.ejs        # Project detail
│   ├── contact.ejs        # Contact form
│   └── 404.ejs
└── public/
    ├── css/style.css
    └── js/main.js
```

---

## ✏️ Personalising Your Portfolio

**All content is in one file: `data/portfolio.json`**

Edit these fields:
- `owner` — your name, title, email, phone, social links
- `skills` — categories and percentage levels
- `education` — degrees and certifications
- `projects` — your real work (title, description, tags, metrics)

### Adding Your Photo
In `views/index.ejs`, find the `<div class="photo-inner">` block and replace the SVG with:
```html
<img src="/images/your-photo.jpg" style="width:100%;height:100%;object-fit:cover;object-position:top">
```
Place your photo in `public/images/`.

---

## 🌐 REST API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/owner` | Owner info |
| GET | `/api/skills` | All skill categories |
| GET | `/api/projects` | All projects |
| GET | `/api/projects?category=EdTech` | Filtered projects |
| GET | `/api/projects/:id` | Single project |
| GET | `/api/education` | Education + certs |
| POST | `/api/contact` | Submit contact message |

### POST `/api/contact` body:
```json
{
  "name": "John",
  "email": "john@example.com",
  "subject": "Project enquiry",
  "message": "Hello..."
}
```

---

## 📧 Enabling Real Email (Optional)

Install nodemailer: `npm install nodemailer`

In `routes/contact.js`, add after storing the message:
```js
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'your@gmail.com', pass: 'your-app-password' }
});
transporter.sendMail({
  from: email, to: 'your@gmail.com',
  subject: subject || 'New portfolio message',
  text: message
});
```

---

## 🚢 Deploying

**Render.com (free):**
1. Push to GitHub
2. New Web Service → connect repo
3. Build: `npm install` | Start: `npm start`

**Railway.app:**
1. `railway login && railway init && railway up`

**VPS (Ubuntu):**
```bash
npm install pm2 -g
pm2 start server.js --name portfolio
pm2 save && pm2 startup
```
