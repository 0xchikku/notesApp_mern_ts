import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import * as notesHelper from "../helpers/notes";


export const getNotes: RequestHandler = async (req, res, next) => {
  try{
    // throw createHttpError(401, 'Manual zerror')
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  }catch(error) {
    console.log(`Error while getting notes`);
    console.log(error);
    next(error);
  }
}


export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try{

    notesHelper.ifNoteIdIsValid(noteId);

    const note = await NoteModel.findById(noteId).exec();

    notesHelper.ifNoteNotFound(note);

    res.status(200).json(note);
  }catch(error){
    console.log(`Error while fetching note for id: ${noteId}`);
    console.log(error);
    next(error);
  }
}

interface CreateNoteBody {
  title?: string,
  text?: string,
}

export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
  const { title = "", text = "" } = req.body;
  try{

    if(!title.trim()) {
      throw createHttpError(400, "title is required!");
    }

    const newNote = await NoteModel.create({
      title,
      text
    });
    res.status(201).json(newNote);
  }catch (error) {
    console.log(`Error while creating note`);
    console.log(error);
    next(error);
  }
}

interface UpdateNoteParams {
  noteId: string
}

interface UpdateNoteBody {
  title?: string,
  text?: string,
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
  const { noteId = ""} = req.params;
  const { title = "", text = ""} = req.body;
  try {
    
    notesHelper.ifNoteIdIsValid(noteId);

    const note = await NoteModel.findById(noteId).exec();

    notesHelper.ifNoteNotFound(note);

    const updatedNote = await notesHelper.updateNote(note, title, text);
    
    res.status(200).json(updatedNote);


  } catch (error) {
    console.log("Error while updating note id", noteId);
    console.log(error);
    next(error);
  }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
  const { noteId = "" } = req.params;
  try {
    
    notesHelper.ifNoteIdIsValid(noteId);

    const note = await NoteModel.findById(noteId).exec();

    notesHelper.ifNoteNotFound(note);

    await note?.deleteOne({ _id: noteId });
    res.sendStatus(204)
  } catch (error) {
    console.log(`Error while deleting note id: ${noteId}`);
    console.log(error);
    next(error);
  }
}