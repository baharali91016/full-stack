// routes/tasks.js
var express = require('express'); 
var router = express.Router();

// Temporary in-memory data store (replaced by MongoDB in LU3) 
let tasks = [
{ id: 1, title: 'Learn Express', done: false },
{ id: 2, title: 'Build a REST API', done: false }];
let nextId = 3;

// GET /api/tasks - list all 
router.get('/', function(req, res) {
res.json(tasks);
});

// GET /api/tasks/:id - fetch one 
router.get('/:id', function(req, res) {
const id = Number(req.params.id);
const task = tasks.find(t => t.id === id);
if (!task) 
    return res.status(404).json({ error: 'Task not found' }); 
res.json(task);
});

// POST /api/tasks - create 
router.post('/', function(req, res) {
const { title } = req.body;
if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: 'title is required' });
}

const newTask = { id: nextId++, title: title.trim(), done: false }; 
tasks.push(newTask);
res.status(201).json(newTask);
});

// PUT /api/tasks/:id - update 
router.put('/:id', function(req, res) {
const id = Number(req.params.id);
const task = tasks.find(t => t.id === id);

if (!task) 
    return res.status(404).json({ error: 'Task not found' }); 
if (req.body.title !== undefined) 
    task.title = req.body.title;
if (req.body.done !== undefined) 
    task.done = req.body.done; 

res.json(task);
});

// DELETE /api/tasks/:id - delete 
router.delete('/:id', function(req, res) {
const id = Number(req.params.id);
const index = tasks.findIndex(t => t.id === id);
if (index === -1) 
    return res.status(404).json({ error: 'Task not found' }); 
const removed = tasks.splice(index, 1)[0];
res.json(removed);
});

module.exports = router;
