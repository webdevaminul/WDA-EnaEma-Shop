import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { name, image, price, stock, description } = await req.json();

    const newProduct = new Product({ name, image, price, stock, description });
    await newProduct.save();

    return NextResponse.json({
      success: true,
      message: "Product created successfully.",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create product." });
  }
}
