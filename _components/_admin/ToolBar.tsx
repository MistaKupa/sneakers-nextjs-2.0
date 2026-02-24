import { IoPersonOutline } from "react-icons/io5";

export default function ToolBar() {
  return (
    <div className="h-full flex justify-between items-center px-5">
      <div>Search pls ne</div>
      <div className="flex items-center gap-3">
        <IoPersonOutline size={20} /> <span>John Doe</span>
      </div>
    </div>
  );
}
