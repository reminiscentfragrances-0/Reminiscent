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

export default function Home() {
  return (
    <>
      <SideNav />
      <Header />
      <main className="relative">
        <Hero />
        <Philosophy />
        <ProductCarousel />
        <Journal />
        <ScentProfile />
      </main>
      <Footer />
    </>
  );
}
