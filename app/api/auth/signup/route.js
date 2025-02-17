import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, phone, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email already exists." });
    }

    const newUser = new User({ name, email, phone, password });
    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User registered successfully.",
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to register user." });
  }
}
