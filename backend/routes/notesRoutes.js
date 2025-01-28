const express = require('express');
const router = express.Router();
const Note = require('../models/notes');

// Create a note
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = await Note.create({ title, content });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a note
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a note
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Note.findByIdAndDelete(id);
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
