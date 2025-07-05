import { connectToDatabase } from "@/lib/db"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { AuthOption } from "@/lib/auth"
import Product from "@/models/Product"

export async function POST(req: Request) {
  const session = await getServerSession(AuthOption)
  console.log(session)
  if (!session || session.user.role !== "farmer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await req.json()

  try {
    await connectToDatabase()
    const newProduct = await Product.create({
      ...body,
      farmerId: session.user.id,
    })

    return NextResponse.json({ message: "Product created", product: newProduct }, { status: 201 })
  } catch (err) {
    console.error("❌ Failed to save product:", err)
    return NextResponse.json({ error: "Server Error" }, { status: 500 })
  }
}
