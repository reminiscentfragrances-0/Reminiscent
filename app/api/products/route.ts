import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getProducts } from "@/lib/db-products";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
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
    revalidateTag("products");
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
