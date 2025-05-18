import { createServerClientInstance } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const supabase = await createServerClientInstance();

    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { oldPassword, newPassword } = await request.json();
    // Verify old password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.user.email,
      password: oldPassword,
    });

    if (signInError) {
      return NextResponse.json(
        { success: false, error: "Old password is incorrect" },
        { status: 400 }
      );
    }

    // Change password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
