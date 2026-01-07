"use client";

import { useState } from "react";
import PasswordInput from "./PasswordInput";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { updatePassword } from "@/app/_lib/account-service";

export default function PasswordForm({ setIsOpen }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await updatePassword(newPassword, oldPassword);
    if (success) {
      setOldPassword("");
      setNewPassword("");
      setIsOpen(false);
    }
  };

  const handleCancelForm = (e) => {
    e.preventDefault();
    setOldPassword("");
    setNewPassword("");
    setIsOpen(false);
  };

  return (
    <form
      className="w-3/4 md:w-2/4  flex flex-col items-center justify-center gap-3"
      onSubmit={handleSubmit}
    >
      <PasswordStrengthIndicator password={newPassword} />

      {/* Old Password Input */}
      <PasswordInput
        inputName="oldPasswordInput"
        label="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      {/* New Password Input */}
      <PasswordInput
        inputName="newPasswordInput"
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      {/* CONFIRM / CANCEL */}
      <div className="flex justify-between items-center gap-3 w-full">
        <button
          onClick={handleCancelForm}
          className="w-full h-10 rounded-md bg-dark-300 text-dark-500"
        >
          Cancel
        </button>
        <button
          className={`w-full h-10 rounded-md text-newWhite bg-newPrimary font-semibold ${
            newPassword.length < 8 || newPassword.length > 15
              ? "cursor-not-allowed bg-opacity-70"
              : "bg-opacity-100"
          }`}
          type="submit"
          disabled={newPassword.length < 8 || newPassword.length > 15}
        >
          Save
        </button>
      </div>
    </form>
  );
}
