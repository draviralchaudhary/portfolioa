const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Data Layer ────────────────────────────────────────────────────────────────
const portfolioData = require('./data/portfolio.json');

// ─── Routes ────────────────────────────────────────────────────────────────────
const indexRoutes = require('./routes/index');
const workRoutes = require('./routes/work');
const educationRoutes = require('./routes/education');
const contactRoutes = require('./routes/contact');
const skillsRoutes = require('./routes/skills');

// ✅ Pass routes
app.use('/', indexRoutes);
app.use('/work', workRoutes);
app.use('/education', educationRoutes);
app.use('/contact', contactRoutes);
app.use('/skills', skillsRoutes);

// ─── 404 (FIXED) ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found — Aviral Chaudhary', // ✅ FIX
    page: '404'
  });
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio running at http://localhost:${PORT}`);
});

module.exports = app;