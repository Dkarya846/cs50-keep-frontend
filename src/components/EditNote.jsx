import { Backdrop, Box, Fade, Modal, Alert } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Joi from "joi";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  display: "flex",
  alignItems: "center",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const EditNote = (props) => {
  const { isOpen, note, setNote, handleUpdate } = props;
  const handleClose = () => props.setIsOpen(false);
  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(note).error;
    if (errors) setError(errors.details[0].message);
    else {
      setError(null);
      handleUpdate(note);
    }
  };

  const validate = (user) => {
    const schema = Joi.object({
      title: Joi.string().required().min(5),
      content: Joi.string().required().min(5),
    });

    return schema.validate({ title: user.title, content: user.content });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <CloseIcon
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              cursor: "pointer",
            }}
          />

          <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
            {error && (
              <Alert
                severity="error"
                onClose={() => {
                  setError(null);
                }}
              >
                {error}
              </Alert>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={note.title}
                type="text"
                onChange={handleChange}
                name="title"
                placeholder="Enter title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows="10"
                value={note.content}
                onChange={handleChange}
                name="content"
                placeholder="Enter Content"
                style={{ resize: "none" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="submit"
                value={"Save"}
                name="submit"
                className="primary-buttton large-button"
              />
            </Form.Group>
          </Form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditNote;
