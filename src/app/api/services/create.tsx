import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserRole } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { userId, name, description, price, duration } = await req.json();

    // 🔒 Check if user is Admin
    const role = await getUserRole(userId);
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 🏢 Get Shop (Since only one shop exists)
    //Ullu
    const shop = await prisma.shop.findFirst();
    if (!shop) {
      return NextResponse.json({ error: "Shop does not exist" }, { status: 400 });
    }

    // ✅ Create Service
    const service = await prisma.service.create({
      data: { name, description, price, duration, shopId: shop.id },
    });

    return NextResponse.json({ message: "Service added", service });
  } catch (error) {
    return NextResponse.json({ error: "Error adding service" }, { status: 500 });
  }
}
