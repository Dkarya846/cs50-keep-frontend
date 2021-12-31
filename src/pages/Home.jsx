import React, { useState, useEffect } from "react";
import {
  HomeContainer,
  Main,
  NotesContainer,
} from "../styleComponents/Common/Common.styles";
import Note from "../styleComponents/Note/Note";
import Navbar from "../styleComponents/Navbar/Navbar";
import EditNote from "../components/EditNote";
import AddNote from "../components/AddNote";
import AddNoteButton from "../styleComponents/AddNoteButton/AddNoteButton";
import notesService from "../services/notesService";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Home = (props) => {
  const { user, setUser } = props;
  const [notes, setNotes] = useState([]);

  //Retrieving data from database
  useEffect(() => {
    async function getData() {
      const data = await notesService.getNotes();
      setNotes([...data]);
    }

    getData();
  }, []);

  //Adding new note:

  //States for creating new note
  const [addNote, setAddNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  //Method for creating new note
  const handleAdd = async (note) => {
    const newNote = await notesService.addNotes(note);
    toast.success(newNote.title + " added successfully");
    setNotes((prev) => [...prev, newNote]);
    setNewNote({ title: "", content: "" });
    setAddNote(false);
  };

  const handleDelete = async (id) => {
    const data = await notesService.deleteNotes(id);
    const filtered = notes.filter((note) => note._id !== id);
    toast.success(data.title + " deleted successfully.");
    setNotes(filtered);
  };

  // Updating the data:

  //States for Modal ie editing each note
  const [open, setOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState();

  //Update Method
  const handleUpdate = async (newNote) => {
    try {
      const updatedNote = await notesService.updateNotes(newNote);
      setOpen(false);
      const index = notes.findIndex((note) => note._id === updatedNote._id);

      const updatedNotes = [...notes];
      updatedNotes[index] = updatedNote;
      setNotes([...updatedNotes]);
      toast.success("Note Updated");
    } catch (ex) {
      if (ex.response && ex.response.status >= 400 && ex.response.status <= 500)
        toast.error(ex.response.data.message);
    }
  };

  return (
    <HomeContainer>
      <ToastContainer />
      <Main>
        <Navbar user={user} setUser={setUser} />
        <NotesContainer>
          {notes.length === 0 ? (
            <h3
              style={{
                display: "flex",
                height: "calc(100vh - 128px)",
                alignItems: "center",
                textAlign: "center",
                color: "#777777",
              }}
            >
              There are no note saved currently. Click '+' to add notes.
            </h3>
          ) : (
            notes.map((note) => (
              <Note
                key={note._id}
                note={note}
                onClick={() => {
                  setSelectedNote(note);
                  setOpen(true);
                }}
                handleDelete={handleDelete}
              />
            ))
          )}
        </NotesContainer>
        {selectedNote && (
          <EditNote
            note={selectedNote}
            setNote={setSelectedNote}
            handleUpdate={handleUpdate}
            isOpen={open}
            setIsOpen={setOpen}
          />
        )}
        <AddNoteButton
          handleClick={() => {
            setSelectedNote({ title: "", content: "" });
            setAddNote(true);
          }}
        />
        {addNote && (
          <AddNote
            note={newNote}
            setNote={setNewNote}
            handleAdd={handleAdd}
            isOpen={addNote}
            setIsOpen={setAddNote}
          />
        )}
      </Main>
    </HomeContainer>
  );
};

export default Home;
