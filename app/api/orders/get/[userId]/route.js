import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req, { params }) {
  try {
    await connectDB();

    // Await params to ensure it's resolved before accessing its properties
    const { userId } = await params;

    console.log("Fetching orders for user:", userId);

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch orders." });
  }
}
