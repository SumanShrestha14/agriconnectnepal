import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOption } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(AuthOption);
    
    if (!session) {
      return NextResponse.json({ 
        authenticated: false, 
        message: "No active session" 
      });
    }

    return NextResponse.json({ 
      authenticated: true, 
      user: session.user,
      message: "Authentication working correctly" 
    });
  } catch (error) {
    console.error("Error in test route:", error);
    return NextResponse.json({ 
      authenticated: false, 
      error: "Authentication test failed" 
    }, { status: 500 });
  }
} 