import {
  IoInformationOutline,
  IoLockClosedOutline,
  IoPersonOutline,
  IoPinOutline,
} from "react-icons/io5";

function SettingsLegend() {
  return (
    <div className="flex justify-start">
      <ul className="flex flex-col justify-start gap-3 p-4">
        <li className="w-auto flex items-center gap-2 hover:text-newPrimary transition-all duration-300">
          <IoPersonOutline size={22} />
          <a href="#profilePicture">Profile picture</a>
        </li>

        <li className="flex items-center gap-2 hover:text-newPrimary transition-all duration-300">
          <IoLockClosedOutline size={22} />
          <a href="#password">Password</a>
        </li>

        <li className="flex items-center gap-2 hover:text-newPrimary transition-all duration-300">
          <IoInformationOutline size={22} />
          <a href="#profileInfo">Profile info.</a>
        </li>

        <li className="flex items-center gap-2 hover:text-newPrimary transition-all duration-300">
          <IoPinOutline size={22} />
          <a href="#contactInfo">Contact info.</a>
        </li>
      </ul>
    </div>
  );
}

export default SettingsLegend;
