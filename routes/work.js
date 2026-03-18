const express = require('express');
const router = express.Router();
const data = require('../data/portfolio.json');

router.get('/', (req, res) => {
  const { category } = req.query;
  let projects = data.projects;
  if (category && category !== 'all') {
    projects = projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  const categories = ['all', ...new Set(data.projects.map(p => p.category))];
  res.render('work', { title: 'Work — Rahul Verma', projects, categories, activeCategory: category || 'all', owner: data.owner, page: 'work' });
});

router.get('/:id', (req, res) => {
  const project = data.projects.find(p => p.id === req.params.id);
  if (!project) return res.status(404).render('404', { title: '404' });
  res.render('project', { title: `${project.title} — Rahul Verma`, project, owner: data.owner, page: 'work' });
});

module.exports = router;
