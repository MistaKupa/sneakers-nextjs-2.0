"use client";

import { useState } from "react";
import { IoEye } from "react-icons/io5";

function PasswordInput({ label, value, onChange, inputName }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        name={inputName}
        type={`${showPassword ? "text" : "password"}`}
        placeholder={label}
        value={value}
        onChange={onChange}
        className="w-full border border-dark-300 rounded-md p-3 outline-newPrimary"
      />
      <button
        className="absolute top-[50%] translate-y-[-50%] right-3"
        onClick={(e) => {
          e.preventDefault();
          setShowPassword(!showPassword);
        }}
      >
        <IoEye
          className={`${showPassword ? "text-newPrimary" : "text-dark-400"} `}
          size={23}
        />
      </button>
    </div>
  );
}

export default PasswordInput;
