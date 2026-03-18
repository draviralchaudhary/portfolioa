const express = require('express');
const router = express.Router();
const data = require('../data/portfolio.json');
router.get('/', (req, res) => {
  res.render('education', {
    title: 'Aviral Chaudhary – Education',
    owner: data.owner,
    certifications: data.certifications || [],
    education: data.education || [],
    page: 'education'
  });
});

module.exports = router;