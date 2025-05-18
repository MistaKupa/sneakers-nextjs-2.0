"use client";

import { createClientInstance } from "@/utils/supabase/client";
import { useEffect } from "react";

export default function useProfileUpsert() {
  useEffect(() => {
    const runUpsert = async () => {
      const supabase = createClientInstance();
      const displayName = localStorage.getItem("displayName");

      if (!displayName) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase.from("profiles").upsert([
        {
          user_id: user.id,
          email: user.email,
          display_name: displayName,
        },
      ]);

      if (!error) {
        localStorage.removeItem("displayName");
      } else {
        console.error("Profile upsert failed:", error.message);
      }
    };

    runUpsert();
  }, []);
}
