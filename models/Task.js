// models/Task.js
const mongoose = require('mongoose'); 
const taskSchema = new mongoose.Schema({
title: { type: String, required: [true, 'title is required'], 
    trim: true, minlength: 1},
    done: { type: Boolean, default: false}}, 
    {
    timestamps: true	// adds createdAt and updatedAt fields automatically
    });

module.exports = mongoose.model('Task', taskSchema);
