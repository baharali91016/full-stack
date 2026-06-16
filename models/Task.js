// models/Task.js
<<<<<<< HEAD
const mongoose = require('mongoose'); 
const taskSchema = new mongoose.Schema({
title: { type: String, required: [true, 'title is required'], 
    trim: true, minlength: 1},
    done: { type: Boolean, default: false}}, 
    {
    timestamps: true	// adds createdAt and updatedAt fields automatically
    });

module.exports = mongoose.model('Task', taskSchema);
=======
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'title is required'], trim: true, minlength: 1 },
  done: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

>>>>>>> d725e53 (Add task-api)
