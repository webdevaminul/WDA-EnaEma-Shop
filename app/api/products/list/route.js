import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Get products successfully.",
      products,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to get products." });
  }
}
