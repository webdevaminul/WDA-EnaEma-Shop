import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("api hit");
  return NextResponse.json(
    { success: true, message: "User registered successfully." },
    { status: 201 }
  );
}
