import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ success: false, message: `No user found with "${email}"` });
    }

    if (existingUser.password !== password) {
      return NextResponse.json({ success: false, message: "Incorrect password." });
    }

    return NextResponse.json({
      success: true,
      message: "User sign in successfully.",
      user: existingUser,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to sign in user." });
  }
}
