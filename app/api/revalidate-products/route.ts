import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: Request) {
  try {
    void request;

    revalidateTag("products", "max");
    revalidatePath("/", "layout");

    return NextResponse.json({
      ok: true,
      message: "Products cache refreshed and routes invalidated",
      at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("POST /api/revalidate-products", error);
    return NextResponse.json(
      { error: "Failed to refresh products cache" },
      { status: 500 },
    );
  }
}
