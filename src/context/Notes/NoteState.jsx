import { useState } from "react";
import noteContext from "./NoteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  const [alert, setAlert] = useState(null);

  // Get all notes
  const getNote = async () => {
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, desciption, tag) => {
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, desciption, tag })
    });

    if (!response.ok) {
      console.error('Failed to add note:', await response.json());
      setAlert({ message: "Error Adding Note", type: "error" });
      setTimeout(() => {
        setAlert(null); // Hide the alert after 3 seconds
      }, 3000);
      return;
    }

    const note = await response.json();
    setNotes(notes.concat(note));
    setAlert({ message: "Successfully Note Added", type: "success" });
    setTimeout(() => {
      setAlert(null); // Hide the alert after 3 seconds
    }, 3000);
  };

  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    if (!response.ok) {
      console.error('Failed to delete note:', await response.json());
      setAlert({ message: "Error Deleting Note", type: "error" });
      setTimeout(() => {
        setAlert(null); // Hide the alert after 3 seconds
      }, 3000);
      return;
    }

    const json = await response.json();
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
    setAlert({ message: "Successfully Note Deleted", type: "success" });
    setTimeout(() => {
      setAlert(null); // Hide the alert after 3 seconds
    }, 3000);
  };

  // Edit a note
  const editNote = async (id, title, desciption, tag) => {
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, desciption, tag })
    });

    if (!response.ok) {
      console.error('Failed to update note:', await response.json());
      setAlert({ message: "Error Updating Note", type: "error" });
      setTimeout(() => {
        setAlert(null); // Hide the alert after 3 seconds
      }, 3000);
      return;
    }

    const json = await response.json();
    const newNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, title, desciption, tag };
      }
      return note;
    });
    setNotes(newNotes);
    setAlert({ message: "Successfully Note Updated", type: "success" });
    setTimeout(() => {
      setAlert(null); // Hide the alert after 3 seconds
    }, 3000);
  };

  return (
    <noteContext.Provider value={{ notes, getNote, addNote, editNote, deleteNote, alert }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
