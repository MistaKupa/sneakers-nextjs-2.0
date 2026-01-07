"use client";

import { createClientInstance } from "@/utils/supabase/client";
import { useEffect } from "react";

export default function useProfileUpsert() {
  useEffect(() => {
    const runUpsert = async () => {
      const supabase = createClientInstance();
      // const displayName = localStorage.getItem("displayName");

      // if (!displayName) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Check if profile exists
      const { data: profile } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("user_id", user.id)
        .single();

      if (!profile) {
        const displayName =
          user.display_name ||
          user.identities[0].identity_data.full_name ||
          "Unknown user";

        const avatarUrl = user.identities[0].identity_data.avatar_url || null;

        const { error } = await supabase.from("profiles").upsert([
          {
            user_id: user.id,
            email: user.email,
            display_name: displayName,
            avatar_url: avatarUrl,
          },
        ]);
        if (error) {
          console.error("Profile upsert failed:", error.message);
        }
      }

      // if (!error) {
      //   localStorage.removeItem("displayName");
      // } else {
      //   console.error("Profile upsert failed:", error.message);
      // }
    };

    runUpsert();
  }, []);
}
