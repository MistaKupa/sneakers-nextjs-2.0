"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createClient,
  createServerClientInstance,
} from "@/utils/supabase/server";

export async function login(formData) {
  const supabase = await createServerClientInstance();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: "Invalid email or password. Please try again." };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function loginWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    },
  });

  if (error) {
    return {
      error:
        "Could not log in via Google. Try again or try a different method.",
    };
  }
}
