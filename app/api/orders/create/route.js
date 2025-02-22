import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { userId, products, address, paymentMethod } = await req.json();

    if (!userId || !products || !address) {
      return NextResponse.json({ success: false, message: "Missing required fields." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." });
    }

    let totalAmount = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product || !product.isActive) {
        return NextResponse.json({
          success: false,
          message: `Product not available: ${item.name}`,
        });
      }

      if (item.quantity > product.stock) {
        return NextResponse.json({
          success: false,
          message: `Not enough stock for ${product.name}`,
        });
      }

      totalAmount += product.price * item.quantity;
      orderProducts.push({
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const newOrder = new Order({
      userId,
      products: orderProducts,
      totalAmount,
      address,
      paymentMethod: paymentMethod || "Cash on Delivery",
      status: "Pending",
    });

    await newOrder.save();

    return NextResponse.json({
      success: true,
      message: "Order placed successfully.",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ success: false, message: "Failed to place order." });
  }
}
