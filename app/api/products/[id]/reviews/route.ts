import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const product = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const reviews = await prisma.review.findMany({
      where: { productId: product.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reviews);
  } catch (e) {
    console.error("GET /api/products/[id]/reviews", e);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const product = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const body = await request.json();
    const { authorName, quote, rating } = body;
    if (!authorName?.trim() || !quote?.trim()) {
      return NextResponse.json(
        { error: "authorName and quote are required" },
        { status: 400 }
      );
    }
    const review = await prisma.review.create({
      data: {
        productId: product.id,
        authorName: String(authorName).trim(),
        quote: String(quote).trim(),
        rating:
          rating != null && rating >= 1 && rating <= 5 ? Number(rating) : null,
      },
    });
    return NextResponse.json(review);
  } catch (e) {
    console.error("POST /api/products/[id]/reviews", e);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
