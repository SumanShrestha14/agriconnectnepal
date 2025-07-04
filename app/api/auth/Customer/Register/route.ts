import { connectToDatabase } from "@/lib/db";
import Customer from "@/models/Customer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("sakdina ma ")
  try {
    const {
      fullName: fullName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    } = await req.json();

    if (!fullName || !email || !password || !phoneNumber) {
      console.log({ fullName, email, password, phoneNumber });
      return NextResponse.json(
        {
          error: "Please fill all required fields",
          requiredFields: {
            fullName: !fullName,
            email: !email,
            password: !password,
            phoneNumber: !phoneNumber,
          },
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return NextResponse.json(
        { error: "Customer already exists" },
        { status: 400 }
      );
    }

    // Create new customer
    await Customer.create({
      fullName,
      email,
      password,
      phoneNumber,
    });

    return NextResponse.json(
      { message: "Customer registered successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in registration:", error);
    return NextResponse.json(
      {
        error: error.message || "Registration failed",
      },
      { status: 500 }
    );
  }
}
