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
import { getFeaturedJournalEntries } from "@/lib/db-journal";

export default async function Home() {
  const [dbProducts, featuredEntries] = await Promise.all([
    getProducts(),
    getFeaturedJournalEntries(),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products = dbProducts.map((p: any) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.tagline ?? p.name,
    price: p.price,
    image: p.heroImage ?? "",
    badge: p.badge ?? undefined,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const journalPosts = featuredEntries.map((e: any) => ({
    id: e.id,
    category: e.category,
    title: e.title,
    description: e.description,
    image: e.image ?? "",
  }));

  return (
    <>
      <SideNav />
      <Header />
      <main className="relative">
        <Hero />
        <Philosophy />
        <ProductCarousel products={products} />
        <Journal posts={journalPosts} />
        <ScentProfile />
      </main>
      <Footer />
    </>
  );
}
