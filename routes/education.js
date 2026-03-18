const express = require('express');
const router = express.Router();
const data = require('../data/portfolio.json');

router.get('/', (req, res) => {
  res.render('education', {
    title: 'Education — Aviral Chaudhary',
    page: 'education',
    owner: data.owner,
    education: data.education || [],         // ✅ prevents crash
    certifications: data.certifications || [] // ✅ prevents crash
  });
});

module.exports = router;