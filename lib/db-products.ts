import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getProductsCached = unstable_cache(
  async () => {
    const list = await prisma.product.findMany({
      orderBy: { createdAt: "asc" },
    });
    return list.map((p) => ({
      ...p,
      price: Number(p.price),
    }));
  },
  ["products-list"],
  {
    // Never mark stale by time; only via revalidateTag("products")
    revalidate: false,
    tags: ["products"],
  },
);

export async function getProducts() {
  return getProductsCached();
}

export async function getProductBySlugOrId(slugOrId: string) {
  const products = await getProducts();
  const product = products.find((p) => p.slug === slugOrId || p.id === slugOrId);
  if (!product) return null;
  return {
    ...product,
    price: Number(product.price),
  };
}
