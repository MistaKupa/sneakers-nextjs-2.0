"use client";

import { createClientInstance } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const supabase = createClientInstance();

export function useUserProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get user ID
        const { data, error } = await supabase.auth.getUser();

        if (error || !data) {
          setError("User not logged in");
          setIsLoading(false);
          return;
        }

        const userId = data.user.id;

        // Fetch data from "profiles" table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (profileError || !profileData) {
          setError("Failed to fetch user data");
          setIsLoading(false);
          return;
        }

        setProfile(profileData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return { profile, isLoading, error };
}
