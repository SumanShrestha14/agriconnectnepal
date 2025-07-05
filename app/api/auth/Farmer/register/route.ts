import { connectToDatabase } from "@/lib/db";
import Farmer from "@/models/Farmer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      fullname: fullname,
      email :email,
      password : password,
      phoneNumber: phoneNumber,
      FarmName: FarmName,
      FarmLocation: FarmLocation,
      FarmDescription: FarmDescription,
    } = await req.json();

    if (
      !fullname ||
      !email ||
      !password ||
      !phoneNumber ||
      !FarmName ||
      !FarmLocation ||
      !FarmDescription
    ) {
        console.log(fullname,email,password,phoneNumber,FarmName,FarmLocation,FarmDescription)
      return NextResponse.json(
        {
          error: "Please fill all form details",
          requiredFields: {
            fullname: !fullname,
            email: !email,
            password: !password,
            phoneNumber: !phoneNumber,
            FarmName: !FarmName,
            FarmLocation: !FarmLocation,
            FarmDescription: !FarmDescription,
          },
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) {
      return NextResponse.json(
        { error: "Farmer already exists" },
        { status: 400 }
      );
    }

    await Farmer.create({
      fullname,
      email,
      password,
      phoneNumber,
      FarmName,
      FarmLocation,
      FarmDescription,
    });

    return NextResponse.json(
      {
        message: "Farmer registered successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in registration:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: error.message || "Registration failed",
      },
      { status: 500 }
    );
  }
}
