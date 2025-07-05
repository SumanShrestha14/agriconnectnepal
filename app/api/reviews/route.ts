import { connectToDatabase } from "@/lib/db";
import Review from "@/models/Review";
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
      productId,
      orderId,
      rating,
      comment,
      images,
    } = body;

    if (!productId || !orderId || !rating || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Verify that the customer has purchased this product
    const order = await Order.findOne({
      _id: orderId,
      customerId: session.user.id,
      status: "delivered",
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found or not delivered" },
        { status: 404 }
      );
    }

    // Check if product is in the order
    const orderItem = order.items.find(
      (item: any) => item.productId.toString() === productId
    );

    if (!orderItem) {
      return NextResponse.json(
        { error: "Product not found in order" },
        { status: 400 }
      );
    }

    // Check if review already exists
    const existingReview = await Review.findOne({
      customerId: session.user.id,
      productId,
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this product" },
        { status: 400 }
      );
    }

    // Create review
    const review = await Review.create({
      customerId: session.user.id,
      productId,
      farmerId: order.farmerId,
      orderId,
      rating,
      comment,
      images: images || [],
    });

    return NextResponse.json({
      message: "Review created successfully",
      review,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    const farmerId = searchParams.get("farmerId");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    const filter: any = {};

    if (productId) {
      filter.productId = productId;
    }

    if (farmerId) {
      filter.farmerId = farmerId;
    }

    const skip = (page - 1) * limit;

    const reviews = await Review.find(filter)
      .populate("customerId", "fullName")
      .populate("productId", "name")
      .populate("farmerId", "fullname FarmName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Review.countDocuments(filter);

    return NextResponse.json({
      reviews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalReviews: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
} 