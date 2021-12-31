import http from "./httpServices";
import config from "../config.json";
import { toast } from "react-toastify";

const getNotes = async () => {
  try {
    const { data } = await http.get(config.apiEndPoint + "/notes");
    return data;
  } catch (ex) {
    if (ex.response && ex.response.status >= 400 && ex.response.status <= 500)
      toast.error(ex.response.data.message);
    else toast.error("Unexpected Error Occured");
    return;
  }
};

const updateNotes = async (note) => {
  const { data } = await http.put(
    config.apiEndPoint + "/notes/" + note._id,
    note
  );
  return data;
};

const addNotes = async (note) => {
  const { data } = await http.post(config.apiEndPoint + "/notes", note);
  return data;
};

const deleteNotes = async (id) => {
  const { data } = await http.delete(config.apiEndPoint + "/notes/" + id);
  return data;
};

const notesService = {
  addNotes,
  deleteNotes,
  getNotes,
  updateNotes,
};

export default notesService;
