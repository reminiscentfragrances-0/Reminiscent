import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const STATUSES = ["Processing", "Shipped", "Delivered", "Cancelled"];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { status } = body;
    if (!status || !STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "status must be one of: " + STATUSES.join(", ") },
        { status: 400 }
      );
    }
    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: { include: { product: true } } },
    });
    return NextResponse.json({
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      status: order.status,
      total: Number(order.total),
      createdAt: order.createdAt.toISOString(),
      items: order.items.length,
    });
  } catch (e) {
    console.error("PATCH /api/orders/[id]", e);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
