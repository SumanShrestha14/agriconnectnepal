import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { AuthOption } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(AuthOption);
    
    if (!session || session.user.role !== "customer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Find delivered orders that contain the specified product
    const orders = await Order.find({
      customerId: session.user.id,
      status: "delivered",
      "items.productId": productId
    })
    .select("_id items createdAt totalAmount")
    .sort({ createdAt: -1 })
    .lean();

    // Filter and format the orders
    const formattedOrders = orders.map(order => ({
      id: order._id,
      createdAt: order.createdAt,
      totalAmount: order.totalAmount,
      items: order.items.filter((item: any) => {
        const itemProductId = item.productId.toString();
        const requestedProductId = productId.toString();
        return itemProductId === requestedProductId;
      })
    }));

    console.log("Found orders for product:", productId, "Count:", formattedOrders.length);
    console.log("Orders:", formattedOrders.map(order => ({
      id: order.id,
      items: order.items.map((item: any) => ({
        productId: item.productId.toString(),
        name: item.name
      }))
    })));

    return NextResponse.json({
      orders: formattedOrders
    });
  } catch (error: any) {
    console.error("Error fetching delivered orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch delivered orders" },
      { status: 500 }
    );
  }
} 