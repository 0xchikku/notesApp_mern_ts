
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { NoteInput} from '../apis/notesApi';
import * as notesApi from "../apis/notesApi";
import { Note as NoteModel } from '../models/notes';

interface NoteModalProps {
  editNote?: NoteModel|null,
  onDismiss: (status :boolean) => void,
  onNoteSave: (note: NoteModel) => void
}

function NoteModal({onDismiss, onNoteSave, editNote = null,}: NoteModalProps) {

  const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<NoteInput>({
    defaultValues: {
      title: editNote?.title || "",
      text: editNote?.text || "",
    }
  })


  const onSubmit = async (note:NoteInput) => {
    try {
      let noteResponse: NoteModel;
      if(editNote){ 
        noteResponse = await notesApi.updateNote(editNote._id, note)
      }else{
        noteResponse = await notesApi.createNote(note);
      }
      onNoteSave(noteResponse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal show onHide={() => onDismiss(false)}>

        <Modal.Header closeButton>
          <Modal.Title>
            {editNote ? "Update Note" : "New Note"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className='mb-5'>
          <Form id='NoteForm' onSubmit={handleSubmit(onSubmit)}>

            <Form.Group>
              <Form.Label>
                Title:
              </Form.Label>
              <Form.Control 
                type='text'
                placeholder='Give a Title'
                isInvalid={!!errors.title}
                {...register("title", { required: "Required "})}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Text:
              </Form.Label>
              <Form.Control 
                as="textarea"
                rows={5}
                placeholder='Start Typing...'
                isInvalid={!!errors.text}
                {...register("text")}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.text?.message}
              </Form.Control.Feedback>
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            type='submit'
            form='NoteForm'
            disabled={isSubmitting}
          >
            {editNote ? "Update" : "Save"}
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default NoteModal