import { connectToDatabase } from "@/lib/db";
import Farmer from "@/models/Farmer";
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

    // Find farmer by email
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, farmer.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return farmer data (without password)
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: farmer._id,
        email: farmer.email,
        fullname: farmer.fullname,
        phoneNumber: farmer.phoneNumber,
        FarmName: farmer.FarmName,
        FarmLocation: farmer.FarmLocation,
        role: "farmer",
      },
    });
  } catch (error: any) {
    console.error("Error in farmer login:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
} 