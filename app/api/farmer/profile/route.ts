import { connectToDatabase } from "@/lib/db";
import Farmer from "@/models/Farmer";
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

    const farmer = await Farmer.findById(session.user.id).select('-password');
    
    if (!farmer) {
      return NextResponse.json({ error: "Farmer not found" }, { status: 404 });
    }

    return NextResponse.json({
      profile: {
        id: farmer._id,
        fullname: farmer.fullname,
        email: farmer.email,
        phoneNumber: farmer.phoneNumber,
        FarmName: farmer.FarmName,
        FarmLocation: farmer.FarmLocation,
        FarmDescription: farmer.FarmDescription,
        profilePicture: farmer.profilePicture,
        deliveryRadius: farmer.deliveryRadius,
        createdAt: farmer.createdAt,
        updatedAt: farmer.updatedAt,
      }
    });
  } catch (error: any) {
    console.error("Error fetching farmer profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
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

    const { fullname, phoneNumber, FarmName, FarmLocation, FarmDescription, deliveryRadius } = body;

    // Validate input
    if (!fullname || !phoneNumber || !FarmName || !FarmLocation || !FarmDescription) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if phone number is already taken by another farmer
    const existingFarmer = await Farmer.findOne({
      phoneNumber,
      _id: { $ne: session.user.id }
    });

    if (existingFarmer) {
      return NextResponse.json(
        { error: "Phone number is already registered" },
        { status: 400 }
      );
    }

    const updateData: any = {
      fullname,
      phoneNumber,
      FarmName,
      FarmLocation,
      FarmDescription,
    };

    if (deliveryRadius !== undefined) {
      updateData.deliveryRadius = deliveryRadius;
    }

    const updatedFarmer = await Farmer.findByIdAndUpdate(
      session.user.id,
      updateData,
      { new: true }
    ).select('-password');

    return NextResponse.json({
      message: "Profile updated successfully",
      profile: {
        id: updatedFarmer._id,
        fullname: updatedFarmer.fullname,
        email: updatedFarmer.email,
        phoneNumber: updatedFarmer.phoneNumber,
        FarmName: updatedFarmer.FarmName,
        FarmLocation: updatedFarmer.FarmLocation,
        FarmDescription: updatedFarmer.FarmDescription,
        profilePicture: updatedFarmer.profilePicture,
        deliveryRadius: updatedFarmer.deliveryRadius,
        createdAt: updatedFarmer.createdAt,
        updatedAt: updatedFarmer.updatedAt,
      }
    });
  } catch (error: any) {
    console.error("Error updating farmer profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
} 