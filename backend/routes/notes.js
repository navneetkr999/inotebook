import express from 'express';
import { body, validationResult } from "express-validator";
import fetchuser from '../middleware/fetchuser.js';
import Note from '../models/Notes.Schema.js';

const notesRouter = express.Router();

// ROUTE 1: get all the notes using GET call /api/notes/fetchallnotes. Login required.
notesRouter.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        res.status(500).send("Interal server error");
        console.error(error.message);
    }
});

// ROUTE 2: add a note using POST call /api/notes/addnote. Login required.
notesRouter.post('/addnote', fetchuser, [
        body('title', "Enter a valid title").isLength({min: 3}),
        body('description', 'Description cannot be less than 100 Character').isLength({min: 100}),
    ],
    async (req, res) => {
        // If there are errors, return bad request with errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }

        try {
            const {title, description, tag} = req.body;
            // creating new note
            const note = new Note({
                title, description, tag, user: req.user.id
            });
            // saving new note in mongodb
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            res.status(500).send("Interal server error");
            console.error(error.message);
        }
    }
);

// ROUTE 3: update an existing note using PUT call /api/notes/updatenote. Login required.
notesRouter.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        const {title, description, tag} = req.body;
        const newNote = {};
        if (title) { newNote.title = title; }

        if (description) { newNote.description = description; }

        if (tag) { newNote.tag = tag; }
        try {
            // find the note to be updated and update it
            let noteToBeUpdated = await Note.findById(req.params.id);
            if (!noteToBeUpdated) {
                return res.status(400).send("Note not found");
            }
            
            // allow updation only if is users owns it
            if (noteToBeUpdated.user.toString() !== req.user.id) {
                return res.status(401).send("Update not allowed");
            }
            noteToBeUpdated = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
            res.json(noteToBeUpdated)
        } catch (error) {
            res.status(500).send("Interal server error");
            console.error(error.message);
        }
    }
);

// ROUTE 4: delete an existing note using DELETE call /api/notes/deletenote. Login required.
notesRouter.delete('/deletenote/:id', fetchuser,
async (req, res) => {
    try {
        // find the note to be deleted and delete it
        let noteToBeDeleted = await Note.findById(req.params.id);
        if (!noteToBeDeleted) {
            return res.status(400).send("Note not found or already deleted!!");
        }
        
        // allow deletion only if is users owns it
        if (noteToBeDeleted.user.toString() !== req.user.id) {
            return res.status(401).send("Delete not allowed!!");
        }
        noteToBeDeleted = await Note.findByIdAndDelete(req.params.id);
        res.json(noteToBeDeleted)
    } catch (error) {
        res.status(500).send("Interal server error");
        console.error({"Success": "Note has been deleted!!"});
    }
}
);

export default notesRouter;