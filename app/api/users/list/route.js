import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({});

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch users" });
  }
}
