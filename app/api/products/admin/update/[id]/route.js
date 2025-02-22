import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = await params;

  try {
    await connectDB();
    const updatedData = await req.json();

    const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" });
    }

    return NextResponse.json({ success: true, message: "Product updated successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update product.", error });
  }
}
