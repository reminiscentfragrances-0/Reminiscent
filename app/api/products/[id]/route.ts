import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function serializeProduct(p: { price: unknown; [k: string]: unknown }) {
  return { ...p, price: Number(p.price) };
}

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
    return NextResponse.json(serializeProduct(product));
  } catch (e) {
    console.error("GET /api/products/[id]", e);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const data: Record<string, unknown> = {};
    const allowed = [
      "name",
      "slug",
      "sku",
      "category",
      "stock",
      "price",
      "tagline",
      "description",
      "heroImage",
      "concentration",
      "longevity",
      "projection",
      "sizes",
      "topNotes",
      "heartNotes",
      "baseNotes",
      "badge",
    ];
    for (const key of allowed) {
      if (body[key] !== undefined) {
        if (key === "stock" || key === "price") (data as Record<string, number>)[key] = Number(body[key]);
        else (data as Record<string, string>)[key] = body[key];
      }
    }
    const product = await prisma.product.update({
      where: { id },
      data,
    });
    return NextResponse.json(serializeProduct(product));
  } catch (e) {
    console.error("PATCH /api/products/[id]", e);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
