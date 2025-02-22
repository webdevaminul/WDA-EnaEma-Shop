import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    await connectDB();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    return NextResponse.json({
      success: true,
      message: "Get cart successfully",
      cartItems: user.cartItems,
      wishlistItems: user.wishlistItems,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ success: false, message: "Failed to get cart" });
  }
}
