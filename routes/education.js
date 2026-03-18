const express = require('express');
const router = express.Router();
const data = require('../data/portfolio.json');

router.get('/', (req, res) => {
  try {
    res.render('education', {
      title: 'Education — Aviral Chaudhary',
      page: 'education',
      owner: data.owner || {},
      education: Array.isArray(data.education) ? data.education : [],
      certifications: Array.isArray(data.certifications) ? data.certifications : []
    });
  } catch (err) {
    console.error("EDUCATION ERROR:", err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;