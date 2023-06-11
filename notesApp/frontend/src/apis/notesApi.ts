
import axios from "../utils/axios";
import { Note } from "../models/notes";


const fetchData = async (endPoint: string) => {
  try{
    const response = await axios.get(endPoint);
    return response.data;
  }catch (error: any) {
    const errorBody = error.response.data;
    const errorMessage = errorBody.error;
    throw new Error(errorMessage);
  }
}

export async function fetchNote(): Promise<Note[]> {
  const response = await fetchData("/notes");
  return response;
}

export interface NoteInput {
  title: string,
  text?: string,
}

export async function createNote(note: NoteInput): Promise<Note> {
  try {
    const response = await axios.post('/notes', note);
    return response.data;
  } catch (error: any) {
    const errorBody = error.response.data;
    const errorMessage = errorBody.error;
    throw new Error(errorMessage);
  }
}

export async function deleteNote(note: Note) {
  try{
    await axios.delete(`/notes/${note._id}`);
  }catch (error) {
    console.log(error);
  }
}

export async function updateNote(noteId: string, note: NoteInput) {
  try {
    const response = await axios.patch(`/notes/${noteId}`, note);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}