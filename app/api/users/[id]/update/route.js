import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = await params;

  try {
    await connectDB();
    const { name, phone, profile, address } = await req.json();

    console.log("Received profile data:", { name, phone, profile, address });

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        profile,
        address,
      },
      { new: true }
    );

    console.log("Updated user", updatedUser);

    if (!updatedUser) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "User data updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({
      success: false,
      message: "User update failed",
    });
  }
}
