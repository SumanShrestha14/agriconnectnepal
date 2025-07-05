import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOption } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(AuthOption);
    
    if (!session) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: session.user });
  } catch (error) {
    console.error("Error getting session:", error);
    return NextResponse.json({ user: null });
  }
} 