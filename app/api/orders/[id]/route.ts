import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { AuthOption } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(AuthOption);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    // Await params before using its properties
    const { id } = await params;

    const order = await Order.findById(id)
      .populate("customerId", "fullName email phoneNumber")
      .populate("farmerId", "fullname FarmName FarmLocation phoneNumber")
      .populate("items.productId", "name images description")
      .lean();

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Check if user has access to this order
    const orderObj = order as any;
    if (
      session.user.role === "customer" && 
      orderObj.customerId._id.toString() !== session.user.id
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (
      session.user.role === "farmer" && 
      orderObj.farmerId._id.toString() !== session.user.id
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(AuthOption);
    
    if (!session || session.user.role !== "farmer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    
    // Await params before using its properties
    const { id } = await params;

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Check if farmer owns this order
    if (order.farmerId.toString() !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update order status
    if (body.status) {
      const allowedStatuses = ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
      if (!allowedStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: "Invalid status" },
          { status: 400 }
        );
      }

      order.status = body.status;

      // Set actual delivery date when status is delivered
      if (body.status === 'delivered') {
        order.actualDelivery = new Date();
      }
    }

    // Update payment status
    if (body.paymentStatus) {
      const allowedPaymentStatuses = ['paid', 'failed'];
      if (!allowedPaymentStatuses.includes(body.paymentStatus)) {
        return NextResponse.json(
          { error: "Invalid payment status" },
          { status: 400 }
        );
      }

      order.paymentStatus = body.paymentStatus;
    }

    await order.save();

    return NextResponse.json({
      message: "Order updated successfully",
      order,
    });
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
} 