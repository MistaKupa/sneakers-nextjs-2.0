import AvatarAdmin from "./AvatarAdmin";

export default function ToolBar() {
  return (
    <div className="h-full flex justify-between items-center lg:px-10">
      <div></div>
      <div className="flex items-center gap-3">
        <AvatarAdmin />
        <span></span>
      </div>
    </div>
  );
}
