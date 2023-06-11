import { useEffect, useState } from 'react';
import style from "./styles/App.module.css"
import styleUtils from "./styles/utils.module.css";
import { Note as NoteModel } from './models/notes';
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import * as NotesApi from './apis/notesApi';
import NoteModal from './components/NoteModal';
import { AiOutlineFileAdd } from "react-icons/ai";

function App() {

  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [noteModal, setNoteModal] = useState(false);
  const [editNote, setEditNote] = useState<NoteModel|null>(null);

  useEffect(() => {
    const loadNotes = async () => {
        try {
          const data = await NotesApi.fetchNote();
          setNotes(data);
        } catch (error) {
          console.log(error);
        }
    };

    loadNotes();

  }, []);

  const handleToggle = (status :boolean) => {
    setNoteModal(status);
  }

  const handleSaveNote = (newNote: NoteModel) => {
    setNotes([
      ...notes,
      newNote,
    ]);
    setNoteModal(false);
  }

  const handleDeleteNote = (note: NoteModel) => {
    NotesApi.deleteNote(note);
    setNotes(notes.filter(existingNote => existingNote._id !== note._id));
  }

  const handleUpdateNote = async (updatedNote: NoteModel) => {
    setNotes(
      notes.map( existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote)
    );
    setEditNote(null);
  }

  return (
      <Container>
        <Row>
          <Button 
            className={`mb-4 w-50 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
           onClick={() => handleToggle(true)}
          >
            <AiOutlineFileAdd />
            New Note
          </Button>
        </Row>
        <Row
          xs={1}
          md={2}
          xl={3}
          className='g-4'
        >
          {notes.map( note => (
              <Col key={note._id}>
                <Note 
                  setEditNote={setEditNote}
                  note={note} 
                  noteStyle={style.note} 
                  onDelete={handleDeleteNote}
                />
              </Col>
            ))
          }
        </Row>
          { noteModal 
            && <NoteModal 
                  onDismiss={handleToggle}
                  onNoteSave={(newNote) => handleSaveNote(newNote)}
                />
          }
          { editNote 
            && <NoteModal
                editNote={editNote}
                onDismiss={() => setEditNote(null)}
                onNoteSave={(updatedNote) => handleUpdateNote(updatedNote)}
              />
          }
      </Container>
  )
}

export default App
