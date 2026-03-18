"use server";

import { createServerClientInstance } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createServerClientInstance();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("The user could not be logged out");
    throw new Error("Something went wrong while logging you out.");
  }
  redirect("/login");
}
