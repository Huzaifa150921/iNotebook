import React, { useState, useContext } from 'react';
import NoteContext from '../context/Notes/NoteContext';
import { TextField, Button, Container, Typography, Snackbar, Alert as MuiAlert } from '@mui/material';

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", desciption: "", tag: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.desciption, note.tag);
    setNote({ title: "", desciption: "", tag: "" });
    setSnackbarMessage("Note added successfully");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 4, background: 'linear-gradient(135deg, #f9f9f9, #f0f0f0)', borderRadius: 2, marginTop: 10 }}>
      <Typography variant="h4" gutterBottom sx={{
        background: 'linear-gradient(135deg, #2a2a2a, #4f4f4f, #787878, #a0a0a0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textFillColor: 'transparent'
      }}>
        Add a Note
      </Typography>
      <form noValidate autoComplete="off" sx={{ background: 'linear-gradient(135deg, #f8f9fa, #e2e2e2)', padding: 4, borderRadius: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={note.title}
          onChange={onChange}
          required
          inputProps={{ minLength: 3 }}
          sx={{
            backgroundColor: '#e0e0e0',
            borderRadius: 1,
            '& .MuiInputBase-input': {
              padding: '12px 14px',
              background: 'linear-gradient(135deg, #6D83F2, #A1C4FD)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'black'
            },
            '& .MuiFormLabel-root': {
              color: '#888',
            },
            '& .MuiFormLabel-root.Mui-focused': {
              color: '#6D83F2',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#6D83F2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6D83F2',
              },
            },
          }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          name="desciption"
          value={note.desciption}
          onChange={onChange}
          required
          inputProps={{ minLength: 5 }}
          sx={{
            backgroundColor: '#e0e0e0',
            borderRadius: 1,
            '& .MuiInputBase-input': {
              padding: '12px 14px',
              background: 'linear-gradient(135deg, #6D83F2, #A1C4FD)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'black'
            },
            '& .MuiFormLabel-root': {
              color: '#888',
            },
            '& .MuiFormLabel-root.Mui-focused': {
              color: '#6D83F2',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#6D83F2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6D83F2',
              },
            },
          }}
        />
        <TextField
          label="Tag"
          variant="outlined"
          fullWidth
          margin="normal"
          name="tag"
          value={note.tag}
          onChange={onChange}
          required
          inputProps={{ minLength: 5 }}
          sx={{
            backgroundColor: '#e0e0e0',
            borderRadius: 1,
            '& .MuiInputBase-input': {
              padding: '12px 14px',
              background: 'linear-gradient(135deg, #6D83F2, #A1C4FD)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'black'
            },
            '& .MuiFormLabel-root': {
              color: '#888',
            },
            '& .MuiFormLabel-root.Mui-focused': {
              color: '#6D83F2',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#6D83F2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6D83F2',
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          onClick={handleClick}
          disabled={note.title.length < 3 || note.desciption.length < 5 || note.tag.length < 5}
        >
          Add Note
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default AddNote;
