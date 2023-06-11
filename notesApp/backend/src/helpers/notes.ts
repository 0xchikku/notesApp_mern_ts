
import mongoose from "mongoose";
import createHttpError from "http-errors";

export const ifNoteIdIsValid = (noteId: string) => {
  if(!mongoose.isValidObjectId(noteId)) {
    throw createHttpError(404, "Invalid Note id");
  }
}

export const ifNoteNotFound = (note: unknown) => {
  if(!note) {
    throw createHttpError(404, "Note no found!");
  }
  return note;
}

export const updateNote = async (note: any, title: string, text: string) => {

  note.title = title;
  note.text = text;

  const updatedNote = await note.save();
  return updatedNote;
}