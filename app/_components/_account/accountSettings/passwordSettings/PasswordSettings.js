"use client";

import { motion } from "motion/react";
import { useState } from "react";
import PasswordForm from "./PasswordForm";

export default function PasswordSettings({}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="password" className="w-full flex flex-col">
      <div
        className={`w-full h-14 flex items-center justify-between px-5 bg-dark-200 border border-dark-300 ${
          isOpen ? "rounded-t-md" : "rounded-md"
        }`}
      >
        <h3 className="text-dark-500 text-xl font-medium">Password</h3>
        <button
          className="font-medium text-sm text-newPrimary"
          onClick={() => setIsOpen(!isOpen)}
        >
          Update
        </button>
      </div>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, maxHeight: 0 }}
          animate={{ opacity: 1, maxHeight: "470px" }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 300,
            damping: 50,
          }}
          className="w-full h-[470px] flex flex-col items-center justify-center gap-5 bg-dark-200 border-x border-b border-dark-300 overflow-hidden"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex justify-center text-dark-400 w-full px-5 text-wrap"
          >
            We recommend that the password contains uppercase letters, lowercase
            letters, and numbers.
            <br />
            The password must be at least 8 characters long, but no more than 15
            characters long.
          </motion.span>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="w-full flex justify-center"
          >
            <PasswordForm setIsOpen={setIsOpen} />
          </motion.div>
        </motion.div>
      ) : (
        <div className="w-full px-5 mt-10">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-dark-400"
          >
            We recommend that the password contains uppercase letters, lowercase
            letters, and numbers.
            <br />
            The password must be at least 8 characters long, but no more than 15
            characters long.
          </motion.span>
        </div>
      )}
    </div>
  );
}
