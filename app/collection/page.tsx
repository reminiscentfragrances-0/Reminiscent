import { getProducts } from "@/lib/db-products";
import CollectionClient from "./CollectionClient";

export default async function CollectionPage() {
  const products = await getProducts();
  const initialProducts = products.map((p) => ({
    ...p,
    price: Number(p.price),
  }));

  return <CollectionClient initialProducts={initialProducts} />;
}
