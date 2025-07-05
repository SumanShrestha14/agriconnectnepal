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

    console.log("Received review request body:", body);
    console.log("Body type:", typeof body);
    console.log("productId from body:", body.productId);
    console.log("productId type:", typeof body.productId);

    const { productId, orderId, rating, comment } = body;

    // Validate input
    if (!productId || !orderId || !rating || !comment) {
      return NextResponse.json(
        { error: "Product ID, Order ID, rating, and comment are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if order exists and belongs to the customer
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    console.log("Order found:", {
      orderId: order._id,
      customerId: order.customerId,
      sessionUserId: session.user.id,
      status: order.status,
      items: order.items.map((item: any) => ({
        productId: item.productId.toString(),
        name: item.name
      }))
    });

    if (order.customerId.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Order does not belong to you" },
        { status: 403 }
      );
    }

    // Check if order status is delivered
    if (order.status !== "delivered") {
      return NextResponse.json(
        { error: "You can only review products from delivered orders" },
        { status: 400 }
      );
    }

    // Ensure we have the correct product ID (handle case where productId might be an object)
    const actualProductId = typeof productId === 'object' && productId._id 
      ? productId._id 
      : productId;

    // Check if product exists in the order
    const productInOrder = order.items.find((item: any) => {
      const itemProductId = item.productId.toString();
      const requestedProductId = actualProductId.toString();
      return itemProductId === requestedProductId;
    });
    
    if (!productInOrder) {
      console.log("Order items:", order.items.map((item: any) => ({
        productId: item.productId.toString(),
        name: item.name
      })));
      console.log("Requested productId:", productId);
      console.log("Requested productId type:", typeof productId);
      console.log("Actual productId:", actualProductId);
      return NextResponse.json(
        { 
          error: "Product not found in this order",
          debug: {
            orderItems: order.items.map((item: any) => ({
              productId: item.productId.toString(),
              name: item.name
            })),
            requestedProductId: productId,
            requestedProductIdType: typeof productId,
            actualProductId: actualProductId
          }
        },
        { status: 400 }
      );
    }

    // Check if customer has already reviewed this product
    const existingReview = await Review.findOne({
      customerId: session.user.id,
      productId: actualProductId
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this product" },
        { status: 400 }
      );
    }

    // Create the review
    const review = await Review.create({
      customerId: session.user.id,
      productId: actualProductId,
      farmerId: order.farmerId,
      orderId: orderId,
      rating: rating,
      comment: comment,
      images: [],
    });

    return NextResponse.json({
      message: "Review created successfully",
      review: {
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
      }
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
      .populate("productId", "name images")
      .populate("farmerId", "fullname FarmName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Review.countDocuments(filter);

    // Calculate average rating
    const avgRatingResult = await Review.aggregate([
      { $match: filter },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);

    const averageRating = avgRatingResult.length > 0 ? avgRatingResult[0].avgRating : 0;

    // Get rating distribution
    const ratingDistribution = await Review.aggregate([
      { $match: filter },
      { $group: { _id: "$rating", count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);

    return NextResponse.json({
      reviews: reviews.map(review => ({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        helpful: review.helpful,
        createdAt: review.createdAt,
        customer: {
          name: review.customerId.fullName,
        },
        product: {
          name: review.productId.name,
        },
        farmer: {
          name: review.farmerId.fullname,
          farmName: review.farmerId.FarmName,
        },
      })),
      stats: {
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: total,
        ratingDistribution: ratingDistribution.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {} as Record<number, number>),
      },
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