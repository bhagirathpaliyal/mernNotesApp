import { AiFillDelete, AiFillEdit } from "react-icons/ai";

 function NoteItem({ note, onEdit, onDelete }) {
  return (
    <div className="p-[20px] rounded-[8px] shadow-xl flex justify-between items-center border border-[#736f72] bg-[#9a8f97]">
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-[#E2E8F0]">{note.title}</h2>
        <p className="text-[#CBD5E1] mt-2">{note.content}</p>
      </div>
      <div className="flex gap-[4px]">
        <button onClick={() => onEdit(note)} className="text-[#736f72] hover:scale-110 rounded-[20%] border-[#736f72]">
          <AiFillEdit size={24} />
        </button>
        <button onClick={() => onDelete(note._id)} className="text-[#736f72] hover:scale-110 rounded-[20%] border-[#736f72]">
          <AiFillDelete size={24} />
        </button>
      </div>
    </div>
  );
}


export default NoteItem;