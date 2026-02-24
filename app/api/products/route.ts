import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "asc" },
    });
    const serialized = products.map((p) => ({
      ...p,
      id: p.id,
      price: Number(p.price),
      slug: p.slug,
    }));
    return NextResponse.json(serialized);
  } catch (e) {
    console.error("GET /api/products", e);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      sku,
      category = "Parfum",
      stock = 0,
      price,
      tagline,
      description,
      heroImage,
      concentration,
      longevity,
      projection,
      sizes,
      topNotes,
      heartNotes,
      baseNotes,
      badge,
    } = body;
    if (!name || !slug) {
      return NextResponse.json(
        { error: "name and slug are required" },
        { status: 400 }
      );
    }
    const product = await prisma.product.create({
      data: {
        name,
        slug: String(slug).toLowerCase().replace(/\s+/g, "-"),
        sku: sku ?? null,
        category: category ?? "Parfum",
        stock: Number(stock) || 0,
        price: Number(price) || 0,
        tagline: tagline ?? null,
        description: description ?? null,
        heroImage: heroImage ?? null,
        concentration: concentration ?? null,
        longevity: longevity ?? null,
        projection: projection ?? null,
        sizes: sizes ?? null,
        topNotes: topNotes ?? null,
        heartNotes: heartNotes ?? null,
        baseNotes: baseNotes ?? null,
        badge: badge ?? null,
      },
    });
    return NextResponse.json({
      ...product,
      price: Number(product.price),
    });
  } catch (e) {
    console.error("POST /api/products", e);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
