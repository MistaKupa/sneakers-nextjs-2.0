"use client";

import { format } from "date-fns";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ProfileInformationForm from "./ProfileInformationForm";
import { useUserProfile } from "@/hooks/useUSerProfile";
import LoadingSpinner from "@/app/_components/loadingspinner/LoadingSpinner";

export default function ProfileInformation({}) {
  const { profile, isLoading, error } = useUserProfile();

  const [isOpen, setIsOpen] = useState(false);

  const formatedBirthDate = profile?.birth_date
    ? format(new Date(profile.birth_date), "MMMM dd, yyyy")
    : "";

  return (
    <div id="profileInfo" className=" w-full flex flex-col">
      <div
        className={`w-full h-14 flex items-center justify-between px-5 bg-dark-200 border border-dark-300 ${
          isOpen ? "rounded-t-md" : "rounded-md"
        }`}
      >
        <h3 className="text-dark-500 text-xl font-medium">
          Profile information
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-medium text-sm text-newPrimary"
        >
          Update
        </button>
      </div>

      {isLoading ? (
        <AnimatePresence>
          <motion.div
            key="spinner"
            exit={{ opacity: 0, scale: 0 }}
            className="w-full h-20 flex items-end justify-center"
          >
            <LoadingSpinner />
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="profileInfoForm"
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{
                opacity: 1,
                maxHeight: 400,
                transition: {
                  duration: 0.2,
                  type: "spring",
                  stiffness: 150,
                  damping: 30,
                },
              }}
              exit={{ opacity: 0, maxHeight: 85 }}
              className="w-full h-[25rem] flex items-center justify-center gap-5 bg-dark-200 border-x border-b border-dark-300 overflow-hidden"
            >
              <ProfileInformationForm setIsOpen={setIsOpen} profile={profile} />
            </motion.div>
          ) : (
            <motion.div
              key="profileInfo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-20 grid grid-rows-2 gap-8 md:gap-1 px-5 mt-10"
            >
              <div className="grid grid-cols-2">
                <span className="text-dark-400">Display name</span>
                <span>{profile.display_name || "-"}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-dark-400">Gender</span>
                <span>{profile.gender || "-"}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-dark-400">Birth date</span>
                <span>{formatedBirthDate || "-"}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
