import { useEffect, useState } from "react";
import { getNotes, addNote, updateNote, deleteNote } from "./api";
import NoteForm from "./NotesForm";
import NoteItem from "./NoteItem";

  function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      
      //dummy data if fetching fails
      // const dummyNotes = [
      //   {
      //     _id: "1",
      //     title: "Welcome to Notes App",
      //     content: "This is a dummy note because we couldn't fetch real data."
      //   },
      //   {
      //     _id: "2",
      //     title: "Network Issue?",
      //     content: `Check your internet connection or try again later. Error:${error}`
      //   },
      //   {
      //     _id: "3",
      //     title: "Use Notes Efficiently",
      //     content: "Write your thoughts, ideas, and tasks in one place."
      //   }
      // ];
      // setNotes(dummyNotes);
    }
  };
  

  const handleSubmit = async (title, content) => {
    try {
      if (editingNote) {
        await updateNote(editingNote._id, { title, content });
        setEditingNote(null);
      } else {
        await addNote({ title, content });
      }
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleEdit = (note) => setEditingNote(note);
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9a8f97] via-[#c3baba] to-[#e9e3e6] p-[20px] font-poppins">
      
      <div className="w-[95%] m-auto">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-[#9a8f97]">
          📝 Notes App
        </h1>
        <NoteForm onSubmit={handleSubmit} editingNote={editingNote} />
        <div className="flex flex-col gap-[10px]">
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      </div>
     
    </div>
  );
}

export default App;
