import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Clear session cookies
    const response = NextResponse.json({ message: "Logged out successfully" });
    
    // Clear the session cookie
    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("__Secure-next-auth.session-token");
    response.cookies.delete("next-auth.csrf-token");
    response.cookies.delete("__Host-next-auth.csrf-token");
    
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
} 