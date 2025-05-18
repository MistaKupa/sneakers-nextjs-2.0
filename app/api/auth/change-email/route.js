import { createServerClientInstance } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const supabase = await createClient();

    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newEmail } = await request.json();

    const { error: emailUpdateError } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (emailUpdateError) {
      return NextResponse.json(
        {
          success: false,
          error: emailUpdateError.message,
        },
        { status: 400 }
      );
    }

    const { error: profileUpdateError } = await supabase
      .from("profiles")
      .update({ email: newEmail })
      .eq("user_id", user.user.id);

    if (profileUpdateError) {
      return NextResponse.json(
        { success: false, error: profileUpdateError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
