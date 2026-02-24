import { notFound } from "next/navigation";
import { SideNav, Header, Footer } from "../../components";
import ProductDetailClient from "./ProductDetailClient";

const products = [
  {
    id: "linger",
    name: "Linger",
    tagline: "Sandalwood, Dried Petal & Aged Paper",
    description:
      "A quiet, lingering warmth that feels like the last page of a beloved book. Soft woods, dried petals, and the faint trace of ink.",
    priceLabel: "$180.00",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpGTdYGeEISkxEh3_CBqjrOk8Cwzml6NWbfcwR8j4EM6_R4l6gsMXC13xAtTjrUOJk_2nW_MFCX3OBQjChk8qfqWtVVNdLkIZSAc7lQE46LDSLb58VNAsdH09jwvxts3xebHllMVd3VfLBxfJGrJgllE608sMPKsJI4y1tUMdChgj_7oNzsRn42ySTeZh2D3pLWV-z8f23mUJJOZHpeEs7remC6qymBb8r5rPF_Werypns9aItLKs2HLy-heEnawOvnscnek8B",
    concentration: "Extrait de Parfum",
    longevity: "10–12 Hours",
    projection: "Intimate to Moderate",
    sizes: "30ml | 50ml",
    topNotes: "Faded Citrus Peel, Crushed Rose Petals",
    heartNotes: "Sandalwood, Dried Paper Accord",
    baseNotes: "Amber Resin, Smoked Vanilla",
  },
  {
    id: "trace",
    name: "Trace",
    tagline: "Cold Stone, Bergamot & Sea Salt",
    description:
      "A mineral, windswept memory of standing alone on a shoreline. Sharp citrus, saline air, and the echo of distant thunder.",
    priceLabel: "$210.00",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYsKv1-qhQngP_xyRgTgqCMszMkhghKUzePDg6s6Lz13coeH4qcPIksAlgGO_b7r0XlknfP4IXxgmCnj6Advhw_djUoNfxoclyk_aDAQSBy40CZv7-OKNTRKh3xwZSxs6-fkHKmZ6F8L8l-aRpYLGehXUeSoP28tl2b66aaWOi6L4ccyOb6LEOrSHovSXpSg-L9uL1ZjdRCHW4tTS0-OMqafTsyFYcJeJ5FfpXvPvF6Ca01dFLnYexAAwGCLaWenBt3i9TNPKm",
    concentration: "Eau de Parfum",
    longevity: "8–10 Hours",
    projection: "Moderate",
    sizes: "50ml | 100ml",
    topNotes: "Bergamot, Sea Spray Accord",
    heartNotes: "Crushed Lavender, Cold Stone",
    baseNotes: "White Musk, Driftwood",
  },
  {
    id: "recall",
    name: "Recall",
    tagline: "Dusty Paper, Amber & White Musk",
    description:
      "An intimate archive of memories: old shelves, amber light, and the soft static of a needle finding vinyl.",
    priceLabel: "$195.00",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApbVxIF4MXGibTFX8DFEURSn2y9i0eB6_Wj8ijXeidYcaQB2j5QL6m17ejbZSw_vpOFWXORgBFg10X37Q0To4sNrXOdcjmsWGmQWg9bVHIOWigsYDv5hObllvkqTMSJH7CbFmUt0oCjTYr4Cxgd2czL7pqpbuiO9CfTH2jjdWURmHnXFwOA3crO-85d-r8nkIsa5jAoX5zTHTAlXfDv7eEg_cXQmDKnDFfPMi7gI3wIayZ8ea4gWWa9ICmIMb6lFxGBZQe814y",
    concentration: "Eau de Parfum",
    longevity: "8–10 Hours",
    projection: "Soft to Moderate",
    sizes: "50ml | 100ml",
    topNotes: "Cardamom, Paper Dust Accord",
    heartNotes: "Amber, Worn Leather",
    baseNotes: "White Musk, Oakwood",
  },
];


type ProductId = (typeof products)[number]["id"];

function getProductById(id: ProductId) {
  return products.find((p) => p.id === id) ?? null;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: ProductId }>;
}) {
  const { id } = await params;
  const item = getProductById(id);

  if (!item) {
    notFound();
  }

  const otherProducts = products
    .filter((p) => p.id !== item.id)
    .map((p) => ({
      id: p.id,
      name: p.name,
      label: p.tagline,
      image: p.heroImage,
    }));

  return (
    <>
      <SideNav />
      <Header />
      <ProductDetailClient product={item} otherProducts={otherProducts} />
      <Footer />
    </>
  );
}

