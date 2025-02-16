import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("api hit");
  return NextResponse.json(
    { success: true, message: "User logged in successfully." },
    { status: 201 }
  );
}
