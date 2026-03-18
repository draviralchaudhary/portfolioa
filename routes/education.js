const express = require('express');
const router = express.Router();
const data = require('../data/portfolio.json');

router.get('/', (req, res) => {
  try {
    res.render('education', {
      title: 'Education — Aviral Chaudhary',
      page: 'education',
      owner: data.owner || {},
      education: data.education || [],         // ✅ SAFE
      certifications: data.certifications || [] // ✅ SAFE
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;