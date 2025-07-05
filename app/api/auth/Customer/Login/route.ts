import { connectToDatabase } from "@/lib/db";
import Customer from "@/models/Customer";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find customer by email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, customer.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return customer data (without password)
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: customer._id,
        email: customer.email,
        fullName: customer.fullName,
        phoneNumber: customer.phoneNumber,
        role: "customer",
      },
    });
  } catch (error: any) {
    console.error("Error in customer login:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
} 