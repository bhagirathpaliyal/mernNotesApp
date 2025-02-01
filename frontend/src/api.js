import axios from "axios";

const API_URL = "https://mernnotesapp-1.onrender.com/api/notes";

export const getNotes = async () => axios.get(API_URL);
export const addNote = async (note) => axios.post(API_URL, note);
export const updateNote = async (id, note) => axios.put(`${API_URL}/${id}`, note);
export const deleteNote = async (id) => axios.delete(`${API_URL}/${id}`);


