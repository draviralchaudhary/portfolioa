const express = require('express');
const router = express.Router();
const data = require('../data/portfolio.json');

// GET /api/skills
router.get('/skills', (req, res) => res.json({ success: true, data: data.skills }));

// GET /api/projects
router.get('/projects', (req, res) => {
  const { category } = req.query;
  let projects = data.projects;
  if (category && category !== 'all') projects = projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
  res.json({ success: true, data: projects });
});

// GET /api/projects/:id
router.get('/projects/:id', (req, res) => {
  const project = data.projects.find(p => p.id === req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data: project });
});

// GET /api/education
router.get('/education', (req, res) => res.json({ success: true, data: { education: data.education, certifications: data.certifications } }));

// GET /api/owner
router.get('/owner', (req, res) => res.json({ success: true, data: data.owner }));

// POST /api/contact
router.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
  const msg = { id: Date.now(), name, email, subject: subject || '(no subject)', message, date: new Date().toISOString() };
  data.messages.push(msg);
  res.json({ success: true, message: 'Message received! I\'ll get back to you soon.' });
});

module.exports = router;
