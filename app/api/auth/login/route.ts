import { connectToDatabase } from "@/lib/db";
import Customer from "@/models/Customer";
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

    // Try to find user as farmer first
    let user = await Farmer.findOne({ email });
    let role = "farmer";

    // If not found as farmer, try as customer
    if (!user) {
      user = await Customer.findOne({ email });
      role = "customer";
    }

    // If still not found, return error
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return user data based on role
    const userData = {
      id: user._id,
      email: user.email,
      role: role,
    };

    if (role === "farmer") {
      Object.assign(userData, {
        name: user.fullname,
        phoneNumber: user.phoneNumber,
        farmName: user.FarmName,
        farmLocation: user.FarmLocation,
      });
    } else {
      Object.assign(userData, {
        name: user.fullName,
        phoneNumber: user.phoneNumber,
      });
    }

    return NextResponse.json({
      message: "Login successful",
      user: userData,
    });
  } catch (error: any) {
    console.error("Error in login:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
} 