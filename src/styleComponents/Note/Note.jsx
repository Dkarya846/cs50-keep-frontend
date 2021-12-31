import React, { useState } from "react";
import { NoteContainer, NoteContent, NoteTitle } from "./Note.styles";

import { StyledDelete } from "../Navbar/Navbar.styles";
import { Close } from "@mui/icons-material";

const Note = (props) => {
  const deleteStyles = {
    position: "absolute",
    right: "-1rem",
    width: "2.25rem",
    height: "2.25rem",
    top: "-1rem",
    cursor: "pointer",
    color: "white",
    background: "rgb(165, 28, 48)",
  };

  const [showDelete, setShowDelete] = useState();
  const { note, handleDelete, onClick } = props;

  return (
    <NoteContainer
      onClick={onClick}
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <NoteTitle>
        {note.title.substring(0, 17) + (note.title.length > 15 ? "..." : "")}
      </NoteTitle>
      <NoteContent>{note.content}</NoteContent>
      {showDelete && (
        <StyledDelete
          style={deleteStyles}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(note._id);
          }}
        >
          <Close
            style={{
              fontSize: "1rem",
            }}
          />
        </StyledDelete>
      )}
    </NoteContainer>
  );
};

export default Note;
