const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Data Layer ────────────────────────────────────────────────────────────────
const portfolioData = require('./data/portfolio.json');

// ─── Routes ────────────────────────────────────────────────────────────────────
const indexRoutes = require('./routes/index');
const workRoutes = require('./routes/work');
const educationRoutes = require('./routes/education');
const contactRoutes = require('./routes/contact');

app.use('/', indexRoutes);
app.use('/work', workRoutes);
app.use('/education', educationRoutes);
app.use('/contact', contactRoutes);

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('404', { page: '' });
});

app.listen(PORT, () => {
  console.log(`\n  🚀 Portfolio running at http://localhost:${PORT}\n`);
});

module.exports = app;
