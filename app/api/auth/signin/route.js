import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password, cartItems, wishlistItems } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: `No user found with "${email}"` });
    }

    if (user.password !== password) {
      return NextResponse.json({ success: false, message: "Incorrect password." });
    }

    const updatedCart = [...user.cartItems];
    cartItems.forEach((item) => {
      const existingItem = updatedCart.find((p) => p.productId.toString() === item.productId);
      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + item.quantity, item.stock);
      } else {
        updatedCart.push(item);
      }
    });

    const updatedWishlist = [...user.wishlistItems];
    wishlistItems.forEach((item) => {
      const exists = updatedWishlist.some((p) => p.productId.toString() === item.productId);
      if (!exists) updatedWishlist.push(item);
    });

    user.cartItems = updatedCart;
    user.wishlistItems = updatedWishlist;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "User signed in successfully.",
      user,
      cartItems: updatedCart,
      wishlistItems: updatedWishlist,
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json({ success: false, message: "Failed to sign in user." });
  }
}
