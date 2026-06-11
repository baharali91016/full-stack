// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /api/tasks - list all 
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/tasks/:id - fetch one 
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: 'Invalid id' });
    }
});

// POST /api/tasks - create 
router.post('/', async (req, res) => {
try {
    const task = await Task.create({ title: req.body.title }); 
    res.status(201).json(task);
} catch (err) {
    res.status(400).json({ error: err.message });
}
});

// PUT /api/tasks/:id - update 
router.put('/:id', async (req, res) => {
try {
    const task = await Task.findByIdAndUpdate(req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' }); res.json(task);
} catch (err) {
    res.status(400).json({ error: err.message });
}
});

// DELETE /api/tasks/:id 
router.delete('/:id', async (req, res) => {
try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' }); 
    res.json(task);
} catch (err) {
    res.status(400).json({ error: 'Invalid id' });
}
});

module.exports = router;
