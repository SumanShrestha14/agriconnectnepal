import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import Review from "@/models/Review";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    // Await params before using its properties
    const { id } = await params;

    const product = await Product.findById(id)
      .populate("farmerId", "fullname FarmName FarmLocation FarmDescription")
      .lean();

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Get reviews for this product
    const reviews = await Review.find({ productId: id })
      .populate("customerId", "fullName")
      .sort({ createdAt: -1 })
      .lean();

    // Calculate average rating
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    // Get rating distribution
    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length,
    };

    return NextResponse.json({
      product: {
        ...product,
        averageRating: Math.round(averageRating * 10) / 10,
        reviewCount: reviews.length,
        ratingDistribution,
      },
      reviews,
    });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
} 