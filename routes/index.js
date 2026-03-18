const express = require('express');
const router = express.Router();
const data = require('../data/portfolio.json');

router.get('/', (req, res) => {
  res.render('index', {
  title: 'Aviral Chaudhary — Portfolio',
  owner: data.owner,
  page: 'home'
  });
});

module.exports = router;