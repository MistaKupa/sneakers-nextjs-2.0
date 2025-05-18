"use client";

import { createClientInstance } from "@/utils/supabase/client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PictureInput() {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const supabase = createClientInstance();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const fileExt = selectedFile.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { data, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, selectedFile, { upsert: true });

    if (uploadError) {
      toast.error("Upload failed");
      console.error(uploadError);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const { error: updateProfileError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrlData.publicUrl })
      .eq("user_id", user.id);

    if (updateProfileError) {
      toast.error("Upload to profile failed");
      console.error(updateProfileError);
      setUploading(false);
      return;
    }

    setUploading(false);
    toast.success("Profile picture uploaded!");
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="imageForm"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ opacity: 0, width: 0 }}
            className="w-full sm:max-w-xs"
          >
            <div className="">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full h-full bg-dark-200 border border-dark-300 text-sm font-medium rounded-md"
              ></input>
            </div>
            <div className="w-full flex justify-between">
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => {
                  setIsOpen(!isOpen);
                  handleUpload();
                }}
                className="text-sm text-newPrimary font-medium"
              >
                Upload
              </motion.button>
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-sm text-newPrimary font-medium"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="showFormButton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="h-14"
          >
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sm text-newPrimary font-medium"
            >
              Update
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
