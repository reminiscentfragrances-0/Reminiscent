import { prisma } from "@/lib/prisma";

export async function getProducts() {
  const list = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });
  return list.map((p) => ({
    ...p,
    price: Number(p.price),
  }));
}

export async function getProductBySlugOrId(slugOrId: string) {
  const product = await prisma.product.findFirst({
    where: { OR: [{ slug: slugOrId }, { id: slugOrId }] },
  });
  if (!product) return null;
  return {
    ...product,
    price: Number(product.price),
    priceLabel: `$${Number(product.price).toFixed(2)}`,
  };
}
