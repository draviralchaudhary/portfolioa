const express = require('express');
const router = express.Router();
const data = require('../data/portfolio.json');

router.get('/', (req, res) => {
  res.render('skills', {
    title: 'Skills — Aviral Chaudhary',
    page: 'skills',
    owner: data.owner,
    skills: data.skills || []
  });
});

module.exports = router;