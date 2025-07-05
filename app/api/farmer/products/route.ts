import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { AuthOption } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(AuthOption);
    
    if (!session || session.user.role !== "farmer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const products = await Product.find({ farmerId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      products: products.map(product => ({
        _id: product._id,
        name: product.name,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        description: product.description,
        images: product.images,
        organic: product.organic,
        harvestDate: product.harvestDate,
        expiryDate: product.expiryDate,
        createdAt: product.createdAt,
      }))
    });
  } catch (error: any) {
    console.error("Error fetching farmer products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(AuthOption);
    
    if (!session || session.user.role !== "farmer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    const {
      productId,
      name,
      category,
      price,
      unit,
      quantity,
      description,
      harvestDate,
      expiryDate,
      organic,
      images,
    } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Check if farmer owns this product
    if (product.farmerId.toString() !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update product fields
    const updateData: any = {};
    if (name) updateData.name = name;
    if (category) updateData.category = category;
    if (price) updateData.price = price;
    if (unit) updateData.unit = unit;
    if (quantity) updateData.quantity = quantity;
    if (description) updateData.description = description;
    if (harvestDate) updateData.harvestDate = harvestDate;
    if (expiryDate) updateData.expiryDate = expiryDate;
    if (typeof organic === "boolean") updateData.organic = organic;
    if (images) updateData.images = images;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(AuthOption);
    
    if (!session || session.user.role !== "farmer") {
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

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Check if farmer owns this product
    if (product.farmerId.toString() !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if product has any active orders
    const Order = (await import("@/models/Order")).default;
    const activeOrders = await Order.countDocuments({
      "items.productId": productId,
      status: { $in: ["pending", "confirmed", "processing", "shipped"] },
    });

    if (activeOrders > 0) {
      return NextResponse.json(
        { error: "Cannot delete product with active orders" },
        { status: 400 }
      );
    }

    await Product.findByIdAndDelete(productId);

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
} 