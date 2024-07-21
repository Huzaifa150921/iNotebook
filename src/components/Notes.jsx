import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal, TextField, Button, Box, Typography, Snackbar, Alert as MuiAlert, Pagination } from '@mui/material';
import AddNote from './Addnote';
import NoteContext from '../context/Notes/NoteContext';
import NoteItem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNote, editNote, alert } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edesciption: "", etag: "" });
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const notesPerPage = 3;
  const lastNoteRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      getNote();
    }
  }, [navigate, getNote]);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edesciption, note.etag);
    setOpen(false);
  };

  const updateNote = (currentNote) => {
    setOpen(true);
    setNote({ id: currentNote._id, etitle: currentNote.title, edesciption: currentNote.desciption, etag: currentNote.tag });
  };

  const handleNoteAdded = () => {
    setTimeout(() => {
      lastNoteRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300); // Adjust the timeout to match the note fetch delay
  };

  // Pagination logic
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;
  const paginatedNotes = notes.slice(startIndex, endIndex);

  return (
    <>
      <AddNote onNoteAdded={handleNoteAdded} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Note
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              name="etitle"
              value={note.etitle}
              onChange={onChange}
              required
              margin="normal"
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="edesciption"
              value={note.edesciption}
              onChange={onChange}
              required
              margin="normal"
            />
            <TextField
              label="Tag"
              variant="outlined"
              fullWidth
              name="etag"
              value={note.etag}
              onChange={onChange}
              required
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleClick} disabled={note.etitle.length < 3 || note.edesciption.length < 5 || note.etag.length < 5}>
              Update Note
            </Button>
          </Box>
        </Box>
      </Modal>

      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Your Notes
      </Typography>
      <div className="row my-3">
        <div className="container text-center">
          {paginatedNotes.length === 0 && "No notes to display"}
        </div>
        {paginatedNotes.map((note, index) => {
          if (index === paginatedNotes.length - 1) {
            return <NoteItem key={note._id} updateNote={updateNote} note={note} ref={lastNoteRef} />;
          }
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>

      {notes.length > notesPerPage && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination
            count={Math.ceil(notes.length / notesPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </div>
      )}

      {alert && (
        <Snackbar open={true} autoHideDuration={3000}>
          <MuiAlert severity={alert.type} sx={{ width: '100%' }}>
            {alert.message}
          </MuiAlert>
        </Snackbar>
      )}
    </>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Notes;
