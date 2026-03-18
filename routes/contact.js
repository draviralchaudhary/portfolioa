const express = require('express');
const router = express.Router();
const data = require('../data/portfolio.json');

router.get('/', (req, res) => {
  res.render('contact', { title: 'Contact — Rahul Verma', owner: data.owner, page: 'contact', success: req.query.success });
});

router.post('/send', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.redirect('/contact?success=false');
  }
  // Store message (in production, save to DB and send email)
  const msg = { id: Date.now(), name, email, subject, message, date: new Date().toISOString() };
  data.messages.push(msg);
  console.log('New message received:', msg);
  res.redirect('/contact?success=true');
});

module.exports = router;
