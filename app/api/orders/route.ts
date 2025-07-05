import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { AuthOption } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(AuthOption);
    
    if (!session || session.user.role !== "customer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    const {
      items,
      totalAmount,
      deliveryAddress,
      deliveryInstructions,
      paymentMethod,
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    // Create separate orders for each farmer
    const ordersByFarmer = new Map();

    for (const item of items) {
      const farmerId = item.farmerId;
      if (!ordersByFarmer.has(farmerId)) {
        ordersByFarmer.set(farmerId, {
          customerId: session.user.id,
          farmerId,
          items: [],
          totalAmount: 0,
          deliveryFee: 5.99,
          deliveryAddress,
          deliveryInstructions,
          paymentMethod,
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        });
      }

      const order = ordersByFarmer.get(farmerId);
      order.items.push({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        unit: item.unit,
      });
      order.totalAmount += item.price * item.quantity;
    }

    // Create orders in database
    const createdOrders = [];
    for (const orderData of ordersByFarmer.values()) {
      const order = await Order.create(orderData);
      createdOrders.push(order);
    }

    return NextResponse.json({
      message: "Orders created successfully",
      orders: createdOrders,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(AuthOption);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");

    const filter: any = {};

    if (session.user.role === "customer") {
      filter.customerId = session.user.id;
    } else if (session.user.role === "farmer") {
      filter.farmerId = session.user.id;
    }

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(filter)
      .populate("customerId", "fullName email")
      .populate("farmerId", "fullname FarmName")
      .populate("items.productId", "name images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Order.countDocuments(filter);

    return NextResponse.json({
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalOrders: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
} 