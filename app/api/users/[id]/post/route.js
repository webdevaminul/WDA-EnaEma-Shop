import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = await params;

  try {
    await connectDB();
    const { cartItems, wishlistItems } = await req.json();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    if (cartItems !== undefined) {
      user.cartItems = cartItems;
    }
    if (wishlistItems !== undefined) {
      user.wishlistItems = wishlistItems;
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: "User data updated successfully",
      cartItems: user.cartItems,
      wishlistItems: user.wishlistItems,
    });
  } catch (error) {
    console.error("Error updating cart/wishlist:", error);
    return NextResponse.json({ success: false, message: "Failed to update cart/wishlist" });
  }
}
