import React, { useState } from "react";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

const AddNote = (props) => {
  const [showText, setShowText] = useState(false);
  return (
    <Fab
      onMouseOver={() => setShowText(true)}
      onMouseOut={() => setShowText(false)}
      style={{
        position: "fixed",
        bottom: "3rem",
        right: "3rem",
        width: "3rem",
        height: "3rem",
        background: "#A51C30",
        color: "#fff",
      }}
      onClick={props.handleClick}
    >
      <Add />

      <p
        style={{
          display: showText ? "block" : "none",
          width: "max-content",
          position: "absolute",
          left: "-6rem",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        Add a Note
      </p>
    </Fab>
  );
};

export default AddNote;
