import React, { useContext } from 'react';
import NoteContext from '../context/Notes/NoteContext';
import { Grow, Slide, Card, CardContent, Typography, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const NoteItem = ({ note, updateNote }) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  return (
    <Grow in={true} timeout={500}>
      <Slide direction="up" in={true} timeout={500}>
        <Card className="my-3" sx={{ maxWidth: 345, margin: 'auto', position: 'relative', overflow: 'hidden', borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ overflowWrap: 'break-word' }}>
              {note.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ overflowWrap: 'break-word' }}>
              {note.desciption}
            </Typography>
            <IconButton
              color="error"
              sx={{ position: 'absolute', bottom: 16, right: 16 }}
              onClick={() => deleteNote(note._id)}
            >
              <Delete />
            </IconButton>
            <IconButton
              color="primary"
              sx={{ position: 'absolute', bottom: 16, right: 56 }}
              onClick={() => updateNote(note)}
            >
              <Edit />
            </IconButton>
          </CardContent>
        </Card>
      </Slide>
    </Grow>
  );
};

export default NoteItem;
