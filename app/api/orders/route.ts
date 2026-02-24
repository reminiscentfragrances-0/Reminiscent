import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function orderNumber() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${n}`;
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: { include: { product: true } } },
    });
    const serialized = orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      customerEmail: o.customerEmail,
      deliveryAddress: o.deliveryAddress,
      note: o.note,
      status: o.status,
      total: Number(o.total),
      createdAt: o.createdAt.toISOString(),
      items: o.items.map((i) => ({
        id: i.id,
        productId: i.productId,
        productName: i.product.name,
        quantity: i.quantity,
        price: Number(i.price),
      })),
    }));
    return NextResponse.json(serialized);
  } catch (e) {
    console.error("GET /api/orders", e);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      deliveryAddress,
      note,
      items,
    }: {
      customerName: string;
      customerEmail: string;
      deliveryAddress?: string;
      note?: string;
      items: { productId: string; quantity: number }[];
    } = body;

    if (!customerName?.trim() || !customerEmail?.trim() || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "customerName, customerEmail, and items are required" },
        { status: 400 }
      );
    }

    const productIds = items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    const productMap = new Map(products.map((p) => [p.id, p]));
    let total = 0;
    const orderItems: { productId: string; quantity: number; price: number }[] = [];
    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product || item.quantity < 1) continue;
      const qty = Math.min(item.quantity, product.stock);
      if (qty === 0) continue;
      const price = Number(product.price);
      orderItems.push({ productId: product.id, quantity: qty, price });
      total += price * qty;
    }
    if (orderItems.length === 0) {
      return NextResponse.json(
        { error: "No valid items" },
        { status: 400 }
      );
    }

    let orderNumberVal = orderNumber();
    while (await prisma.order.findUnique({ where: { orderNumber: orderNumberVal } })) {
      orderNumberVal = orderNumber();
    }

    const order = await prisma.order.create({
      data: {
        orderNumber: orderNumberVal,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        deliveryAddress: deliveryAddress?.trim() ?? null,
        note: note?.trim() ?? null,
        total,
        items: {
          create: orderItems.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    // Decrement stock
    for (const i of order.items) {
      await prisma.product.update({
        where: { id: i.productId },
        data: { stock: { decrement: i.quantity } },
      });
    }

    return NextResponse.json({
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      status: order.status,
      total: Number(order.total),
      createdAt: order.createdAt.toISOString(),
      items: order.items.map((i) => ({
        productName: i.product.name,
        quantity: i.quantity,
        price: Number(i.price),
      })),
    });
  } catch (e) {
    console.error("POST /api/orders", e);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
