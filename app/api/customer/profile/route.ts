import { connectToDatabase } from "@/lib/db";
import Customer from "@/models/Customer";
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

    const customer = await Customer.findById(session.user.id).select('-password');
    
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json({
      profile: {
        id: customer._id,
        fullName: customer.fullName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      }
    });
  } catch (error: any) {
    console.error("Error fetching customer profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(AuthOption);
    
    if (!session || session.user.role !== "customer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    const { fullName, phoneNumber } = body;

    // Validate input
    if (!fullName || !phoneNumber) {
      return NextResponse.json(
        { error: "Full name and phone number are required" },
        { status: 400 }
      );
    }

    // Check if phone number is already taken by another customer
    const existingCustomer = await Customer.findOne({
      phoneNumber,
      _id: { $ne: session.user.id }
    });

    if (existingCustomer) {
      return NextResponse.json(
        { error: "Phone number is already registered" },
        { status: 400 }
      );
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      session.user.id,
      {
        fullName,
        phoneNumber,
      },
      { new: true }
    ).select('-password');

    return NextResponse.json({
      message: "Profile updated successfully",
      profile: {
        id: updatedCustomer._id,
        fullName: updatedCustomer.fullName,
        email: updatedCustomer.email,
        phoneNumber: updatedCustomer.phoneNumber,
        createdAt: updatedCustomer.createdAt,
        updatedAt: updatedCustomer.updatedAt,
      }
    });
  } catch (error: any) {
    console.error("Error updating customer profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
} 