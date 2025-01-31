import { useState, useEffect } from "react";

function NoteForm({ onSubmit, editingNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col my-[20px] gap-[10px]">
      <input
        type="text"
        placeholder="Enter Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-[10px] border border-[#736f72] rounded-[6px] bg-[#b2b2b2] text-white focus:ring-4 focus:ring-[#736f72]"
      />
      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-[10px] border border-[#736f72] rounded-[6px] bg-[#b2b2b2] text-white focus:ring-4 focus:ring-[#736f72] h-32 resize-none"
      />
      <button
        type="submit"
        className="w-full text-white text-lg font-semibold rounded-[6px] bg-[#736f72] py-[10px] border border-[#736f72]"
        // style={{ background: "linear-gradient(135deg, #EC4899, #F59E0B)" }}
      >
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}

export default NoteForm;
