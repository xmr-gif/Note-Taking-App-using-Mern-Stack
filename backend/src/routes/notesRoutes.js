import express from "express";
import { createNote, deleteNote, getAllNotes,getNoteById, updateNote } from "../controllers/notesController.js";

const router = express.Router() ;

// this is route
router.get("/" ,getAllNotes);
router.get("/:id" ,getNoteById); // fetch a specific note
router.post("/" ,createNote);
router.put("/:id" , updateNote); // :id means dynamic value
router.delete("/:id" , deleteNote);


export default router ;
