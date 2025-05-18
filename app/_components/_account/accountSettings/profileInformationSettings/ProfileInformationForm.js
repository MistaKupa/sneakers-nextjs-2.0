"use client";

import { useState } from "react";
import ProfileInformationInput from "./ProfileInformationInput";
import { updateProfileInfo } from "@/app/_lib/account-service";
import { format } from "date-fns";

export default function ProfileInformationForm({ setIsOpen, profile }) {
  const { display_name: displayName, gender, birth_date: birthDate } = profile;

  const formatedBirthDateInput = format(new Date(birthDate), "yyyy-MM-dd");

  const [newDisplayName, setNewDisplayName] = useState(
    displayName || newDisplayName
  );
  const [newGender, setNewGender] = useState(gender || "");
  const [newBirthDate, setNewBirthDate] = useState(birthDate || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await updateProfileInfo(
      newBirthDate,
      newGender,
      newDisplayName
    );

    if (success) {
      setNewDisplayName(newDisplayName);
      setNewGender(newGender);
      setNewBirthDate(newBirthDate);
      setIsOpen(false);
    }
  };

  const handleCancelForm = (e) => {
    e.preventDefault();
    setNewDisplayName(displayName);
    setNewGender(gender);
    setNewBirthDate(birthDate);
    setIsOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-4/5 md:w-1/2 flex flex-col items-center gap-4 px-2 lg:gap-3"
    >
      {/*DisplayName Input*/}
      <div className="relative w-full">
        <ProfileInformationInput
          inputName="Display name"
          type="text"
          placeHolder="Display name"
          value={newDisplayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
        />
        <span className="absolute top-0.5 left-3 text-[10px] text-dark-400 font-medium">
          Display Name
        </span>
      </div>

      {/*Gender Input*/}
      <div className="relative w-full">
        <ProfileInformationInput
          inputName="Display name"
          inputType="select"
          type="text"
          placeHolder="Gender"
          value={newGender}
          onChange={(e) => setNewGender(e.target.value)}
        />
        <span className="absolute top-0.5 left-3 text-[10px]  text-dark-400 font-medium">
          Gender
        </span>
      </div>

      {/*BirthDate Input*/}
      <div className="relative w-full">
        <ProfileInformationInput
          inputName="Birth Date"
          type="date"
          placeHolder="BirthDate"
          value={newBirthDate}
          onChange={(e) => setNewBirthDate(e.target.value)}
        />
        <span className="absolute top-0.5 left-3 text-[10px] text-dark-400 font-medium">
          Birth Date
        </span>
      </div>

      {/*Form Buttons */}
      <div className="flex items-center gap-3 w-full md:px-0">
        <div className="w-full">
          <button
            onClick={handleCancelForm}
            className="w-full h-10 rounded-md bg-dark-300 text-dark-500"
          >
            Cancel
          </button>
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="w-full h-10 rounded-md text-newWhite bg-newPrimary"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
