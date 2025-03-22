import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const shop = await prisma.shop.findFirst({
      include: { services: true, reviews: true },
    });

    if (!shop) {
      return NextResponse.json({ error: "No shop found" }, { status: 404 });
    }

    return NextResponse.json(shop);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching shop" }, { status: 500 });
  }
}
