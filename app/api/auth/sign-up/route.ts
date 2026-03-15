import { SignUpFormData } from "@/types/auth.types";
import { createServerClientInstance } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createServerClientInstance();
    const body: Pick<SignUpFormData, "email" | "password" | "displayName"> =
      await request.json();

    const { email, password, displayName } = body;

    const { data: newUser, error: newUserError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (newUserError || !newUser?.user?.id) {
      return NextResponse.json(
        { success: false, error: newUserError?.message || "Signup failed" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "User succesfully signed up.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
