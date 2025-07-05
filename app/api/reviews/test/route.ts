import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
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

    // Get all orders for the customer
    const allOrders = await Order.find({
      customerId: session.user.id
    })
    .populate("farmerId", "fullname FarmName")
    .sort({ createdAt: -1 })
    .lean();

    // Get delivered orders
    const deliveredOrders = allOrders.filter(order => order.status === "delivered");

    // Get products
    const products = await Product.find({}).select("_id name farmerId").lean();

    return NextResponse.json({
      customerId: session.user.id,
      totalOrders: allOrders.length,
      deliveredOrders: deliveredOrders.length,
      allOrders: allOrders.map(order => ({
        id: order._id,
        status: order.status,
        createdAt: order.createdAt,
        items: order.items.map((item: any) => ({
          productId: item.productId.toString(),
          name: item.name
        }))
      })),
      deliveredOrdersDetail: deliveredOrders.map(order => ({
        id: order._id,
        status: order.status,
        createdAt: order.createdAt,
        farmer: order.farmerId,
        items: order.items.map((item: any) => ({
          productId: item.productId.toString(),
          name: item.name
        }))
      })),
      products: products.map((product: any) => ({
        id: (product._id as any).toString(),
        name: product.name,
        farmerId: (product.farmerId as any).toString()
      })),
      requestedProductId: productId
    });
  } catch (error: any) {
    console.error("Error in test endpoint:", error);
    return NextResponse.json(
      { error: "Failed to get test data" },
      { status: 500 }
    );
  }
} 