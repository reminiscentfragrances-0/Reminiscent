import { notFound } from "next/navigation";
import { SideNav, Header, Footer } from "../../components";
import ProductDetailClient from "./ProductDetailClient";
import { getProductBySlugOrId, getProducts } from "@/lib/db-products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getProductBySlugOrId(id);

  if (!item) {
    notFound();
  }

  const allProducts = await getProducts();
  const otherProducts = allProducts
    .filter((p: { id: string }) => p.id !== item.id)
    .map(
      (p: {
        id: string;
        slug: string;
        name: string;
        tagline: string | null;
        heroImage: string | null;
      }) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        label: p.tagline ?? p.name,
        image: p.heroImage ?? "",
      }),
    );

  const productForClient = {
    id: item.id,
    slug: item.slug,
    name: item.name,
    tagline: item.tagline ?? "",
    description: item.description ?? "",
    price: item.price,
    priceLabel: item.priceLabel ?? `Rs. ${item.price.toFixed(2)}`,
    heroImage: item.heroImage ?? "",
    concentration: item.concentration ?? "",
    longevity: item.longevity ?? "",
    projection: item.projection ?? "",
    sizes: item.sizes ?? "",
    topNotes: item.topNotes ?? "",
    heartNotes: item.heartNotes ?? "",
    baseNotes: item.baseNotes ?? "",
  };

  return (
    <>
      <SideNav />
      <Header />
      <ProductDetailClient
        product={productForClient}
        otherProducts={otherProducts}
      />
      <Footer />
    </>
  );
}
