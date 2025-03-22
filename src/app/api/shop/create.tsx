import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserRole } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { userId, name, tagline, location, description, phone, hours } = await req.json();
    
    // 🔒 Check if user is an Admin
    const role = await getUserRole(userId);
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // ❌ Check if a shop already exists
    const existingShop = await prisma.shop.findFirst();
    if (existingShop) {
      return NextResponse.json({ error: "Shop already exists" }, { status: 400 });
    }

    // ✅ Create a new shop
    const shop = await prisma.shop.create({
      data: { name, tagline, location, description, phone, hours, rating: 0, reviewCount: 0 },
    });

    return NextResponse.json({ message: "Shop created", shop });
  } catch (error) {
    return NextResponse.json({ error: "Error creating shop" }, { status: 500 });
  }
}
