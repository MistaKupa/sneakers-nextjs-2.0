"use server";

import { createServerClientInstance } from "@/utils/supabase/server";

export async function logout() {
  const supabase = await createServerClientInstance();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Uz jebe mi");
  }
  redirect("/login");
}
