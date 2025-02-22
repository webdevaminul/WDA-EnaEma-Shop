import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    await connectDB();
    const { name, image, price, stock, description } = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        image,
        price: Number(price),
        stock: Number(stock),
        description,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ success: false, message: "Product not found" });
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update product" });
  }
}
