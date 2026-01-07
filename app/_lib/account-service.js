import { createClientInstance } from "@/utils/supabase/client";

import toast from "react-hot-toast";

export async function signUpUser(formData) {
  try {
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!result.success) {
      toast.error(result.error);
      return { success: false, error: result.error || "Unknown error" };
    }

    toast.success(result.message);
    return { success: true };
  } catch (error) {
    const msg = error?.message || "Network error";
    toast.error(
      "Something went wrong while creating account. Please try again."
    );
    return { success: false, error: msg };
  }
}

export async function updatePassword(newPassword, oldPassword) {
  try {
    const response = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword, oldPassword }),
    });

    const result = await response.json();

    if (!result.success) {
      toast.error(result.error);
      return false;
    }

    toast.success(result.message);
    return true;
  } catch (error) {
    toast.error(
      "Something went wrong while updating password, please try again."
    );
    return false;
  }
}

export async function updateProfileInfo(
  newBirthDate,
  newGender,
  newDisplayName
) {
  try {
    const supabase = createClientInstance();
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (!user || userError) {
      console.error(userError);
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        birth_date: newBirthDate,
        gender: newGender,
        display_name: newDisplayName,
      })
      .eq("user_id", user.user.id);

    if (error) {
      console.error(error);
      throw new Error("Couldnt update profile information.");
    }

    toast.success("Profile information updated succesfully");
    return true;
  } catch (error) {
    toast.error(error.message);
    return false;
  }
}

export async function updateEmail(newEmail) {
  try {
    const response = await fetch("/api/auth/change-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newEmail }),
    });

    const result = await response.json();

    if (!result.success) {
      toast.error(result.error);
      return false;
    }

    toast.success(result.message);
    return true;
  } catch (error) {
    toast.error("Something went wrong while updating email, please try again.");
    return false;
  }
}
