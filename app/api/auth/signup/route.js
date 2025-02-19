import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, phone, password, cartItems = [], wishlistItems = [] } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email already exists." });
    }

    // Directly initialize cart and wishlist if provided
    const updatedCart = cartItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const updatedWishlist = wishlistItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
    }));

    const newUser = new User({
      name,
      email,
      phone,
      password,
      cartItems: updatedCart,
      wishlistItems: updatedWishlist,
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User registered successfully.",
      user: newUser,
      cartItems: newUser.cartItems,
      wishlistItems: newUser.wishlistItems,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ success: false, message: "Failed to register user." });
  }
}
