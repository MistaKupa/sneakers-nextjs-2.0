"use client";

import { useUserProfile } from "@/hooks/useUSerProfile";
import LoadingSpinner from "../../../loadingspinner/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import ContactEmailForm from "./ContactEmailForm";
import { useEffect, useState } from "react";

export default function ContactInformation() {
  const { profile, isLoading, error } = useUserProfile();

  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);

  useEffect(() => {
    if (isEmailOpen || isPhoneOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isEmailOpen, isPhoneOpen]);

  return (
    <div id="contactInfo" className="w-full flex flex-col gap-10">
      <div className="w-full h-14 flex items-center px-5 bg-dark-200 border border-dark-300 rounded-md">
        <h3 className="text-dark-500 text-xl font-medium">
          Contact information
        </h3>
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
        <>
          <div className="w-full grid grid-rows-auto gap-3 md:gap-1 px-5 ">
            {/*EMAIL ROW*/}
            <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_0.5fr] border-b md:border-none pb-3 md:pb-0">
              <span className="text-dark-400">Email</span>
              <span>{profile.email}</span>
              <button
                className="text-newPrimary text-sm font-medium row-start-1 col-start-2 md:row-auto md:col-auto place-self-end"
                onClick={() => setIsEmailOpen(!isEmailOpen)}
              >
                Update
              </button>
            </div>

            {/*PHONE ROW*/}
            <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_0.5fr] border-b md:border-none pb-3 md:pb-0">
              <span className="text-dark-400">Phone Number</span>
              <span>{profile.user_phone || "-"}</span>
              <button className=" text-newPrimary text-sm font-medium row-start-1 col-start-2 md:row-auto md:col-auto place-self-end ">
                Update
              </button>
            </div>
          </div>

          {/*EMAIL FORM */}
          {isEmailOpen && (
            <>
              <div className="fixed inset-0 z-5 bg-lightBox opacity-60"></div>
              <div className="fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                <ContactEmailForm
                  profile={profile}
                  setIsEmailOpen={setIsEmailOpen}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
