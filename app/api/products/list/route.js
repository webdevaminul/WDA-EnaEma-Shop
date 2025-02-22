import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    if (!products || products.length === 0) {
      return NextResponse.json({ success: false, message: "No products found." });
    }

    return NextResponse.json({
      success: true,
      message: "Get products successfully.",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to get products.",
    });
  }
}
