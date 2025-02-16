import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { userName, userEmail, userPhone, userPassword } = await req.json();

  const existingUser = await User.findOne({ userEmail });
  if (existingUser) {
    return NextResponse.json({ success: false, message: "Email already exists." }, { status: 400 });
  }

  const newUser = new User({ userName, userEmail, userPhone, userPassword });

  await newUser.save();

  return NextResponse.json(
    { success: true, message: "User registered successfully." },
    { status: 201 }
  );
}
