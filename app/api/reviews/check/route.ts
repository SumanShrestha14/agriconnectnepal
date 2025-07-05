import { connectToDatabase } from "@/lib/db";
import Review from "@/models/Review";
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

    const existingReview = await Review.findOne({
      customerId: session.user.id,
      productId: productId
    });

    return NextResponse.json({
      hasReviewed: !!existingReview,
      review: existingReview ? {
        id: existingReview._id,
        rating: existingReview.rating,
        comment: existingReview.comment,
        createdAt: existingReview.createdAt,
      } : null
    });
  } catch (error: any) {
    console.error("Error checking review:", error);
    return NextResponse.json(
      { error: "Failed to check review" },
      { status: 500 }
    );
  }
} 