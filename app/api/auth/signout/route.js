import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ success: true, message: "User sign out successfully." });
  } catch (error) {
    return NextResponse.json({ success: true, message: "User sign out failed." });
  }
}
