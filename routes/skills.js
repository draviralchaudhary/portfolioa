const express = require('express');
const router = express.Router();
const data = require('../data/portfolio.json');

router.get('/', (req, res) => {
  res.render('skills', { title: 'Skills — Rahul Verma', skills: data.skills, owner: data.owner, page: 'skills' });
});

module.exports = router;
