import UserAvatar from "../../accountSideBar/userDetails/UserAvatar";
import PictureInput from "./PictureInput";

export default function ProfilePictureSettings() {
  return (
    <div id="profilePicture" className="w-full flex flex-col gap-10">
      <div className="w-full h-14 flex items-center px-5 bg-dark-200 border border-dark-300 rounded-md">
        <h3 className="text-dark-500 text-xl font-medium">Profile picture</h3>
      </div>

      <div className="w-full px-5">
        <div className="w-full flex items-center gap-5">
          <div>
            <UserAvatar />
          </div>
          <div className="w-full h-14 flex flex-col">
            <span className="text-dark-400">Update profile picture</span>
            <div className="w-full">
              <PictureInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
