import {
  SideNav,
  Header,
  Hero,
  ProductCarousel,
  ScentProfile,
  Footer,
  Philosophy,
  Journal,
} from "./components";
import { getProducts } from "@/lib/db-products";

export default async function Home() {
  const dbProducts = await getProducts();
  const products = dbProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.tagline ?? p.name,
    price: p.price,
    image: p.heroImage ?? "",
    badge: p.badge ?? undefined,
  }));

  return (
    <>
      <SideNav />
      <Header />
      <main className="relative">
        <Hero />
        <Philosophy />
        <ProductCarousel products={products} />
        <Journal />
        <ScentProfile />
      </main>
      <Footer />
    </>
  );
}
