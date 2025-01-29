import { useEffect, useState } from "react";
import { getNotes, addNote, updateNote, deleteNote } from "./api";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "tailwindcss";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      if (editingNote) {
        await updateNote(editingNote._id, { title, content });
        setEditingNote(null);
      } else {
        await addNote({ title, content });
      }
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNote(note);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
      <div className="max-w-3xl w-full bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-8">
        
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#A78BFA]">
          📝 Notes App
        </h1>

   
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <input
            type="text"
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 border-2 border-[#3B82F6] rounded-lg bg-[#0F172A] text-white focus:ring-4 focus:ring-[#3B82F6] placeholder-gray-400 transition-all"
          />
          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 border-2 border-[#3B82F6] rounded-lg bg-[#0F172A] text-white focus:ring-4 focus:ring-[#3B82F6] h-32 resize-none placeholder-gray-400 transition-all"
          />
          <button
            type="submit"
            className="w-full py-3 text-white text-lg font-semibold rounded-lg shadow-md transform hover:scale-[1.02] transition-all"
            style={{
              background: "linear-gradient(135deg, #EC4899, #F59E0B)"
            }}
          >
            {editingNote ? "Update Note" : "Add Note"}
          </button>
        </form>

      
        <div className="mt-8 space-y-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all flex justify-between items-center space-x-4"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-[#E2E8F0]">
                  {note.title}
                </h2>
                <p className="text-[#CBD5E1] mt-2">{note.content}</p>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => handleEdit(note)} className="text-[#34D399] hover:scale-110 transition-transform">
                  <AiFillEdit size={24} />
                </button>
                <button onClick={() => handleDelete(note._id)} className="text-[#F87171] hover:scale-110 transition-transform">
                  <AiFillDelete size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
