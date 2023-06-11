
import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/notes';
import style from "../styles/Note.module.css";
import styleUtiles from "../styles/utils.module.css";
import { formatDate } from '../utils/formatDate';
import { AiOutlineDelete } from "react-icons/ai";

interface NoteProps {
  note: NoteModel,
  noteStyle?: string,
  onDelete: (note: NoteModel) => void,
  setEditNote: (note: NoteModel) => void,
}

function Note({note, noteStyle = '', onDelete, setEditNote}: NoteProps) {

  const { title = "", text = "", updatedAt = ""} = note;

  const lastModified = `last Modified: ${formatDate(updatedAt)}`; 

  return (
      <Card 
        onClick={() => {
          setEditNote(note)
        }}
        className={`${style.noteCard} ${noteStyle}`}
      >
        <Card.Body className={style.cardBody}>
          <Card.Title className={`${styleUtiles.flexCenter}`}>
            {title}
            <AiOutlineDelete 
              onClick={(e: any) => {
                onDelete(note);
                e.stopPropagation();
              }}
              className="ms-auto text-muted"
            />
          </Card.Title>
          <Card.Text className={style.cardText}>
            {text}
          </Card.Text>
        </Card.Body>
        <Card.Footer className='text-muted'>
          <Card.Text>
            {lastModified}
          </Card.Text>
        </Card.Footer>
      </Card>
  )
}

export default Note