import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    slug: "linger",
    name: "Linger",
    sku: "RF-LIN-50",
    category: "Parfum",
    stock: 15,
    price: 50400,
    tagline: "Sandalwood, Dried Petal & Aged Paper",
    description:
      "A quiet, lingering warmth that feels like the last page of a beloved book. Soft woods, dried petals, and the faint trace of ink.",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpGTdYGeEISkxEh3_CBqjrOk8Cwzml6NWbfcwR8j4EM6_R4l6gsMXC13xAtTjrUOJk_2nW_MFCX3OBQjChk8qfqWtVVNdLkIZSAc7lQE46LDSLb58VNAsdH09jwvxts3xebHllMVd3VfLBxfJGrJgllE608sMPKsJI4y1tUMdChgj_7oNzsRn42ySTeZh2D3pLWV-z8f23mUJJOZHpeEs7remC6qymBb8r5rPF_Werypns9aItLKs2HLy-heEnawOvnscnek8B",
    concentration: "Extrait de Parfum",
    longevity: "10–12 Hours",
    projection: "Intimate to Moderate",
    sizes: "30ml | 50ml",
    topNotes: "Faded Citrus Peel, Crushed Rose Petals",
    heartNotes: "Sandalwood, Dried Paper Accord",
    baseNotes: "Amber Resin, Smoked Vanilla",
    badge: "Batch 001",
  },
  {
    slug: "trace",
    name: "Trace",
    sku: "RF-TRC-50",
    category: "Parfum",
    stock: 8,
    price: 58800,
    tagline: "Cold Stone, Bergamot & Sea Salt",
    description:
      "A mineral, windswept memory of standing alone on a shoreline. Sharp citrus, saline air, and the echo of distant thunder.",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYsKv1-qhQngP_xyRgTgqCMszMkhghKUzePDg6s6Lz13coeH4qcPIksAlgGO_b7r0XlknfP4IXxgmCnj6Advhw_djUoNfxoclyk_aDAQSBy40CZv7-OKNTRKh3xwZSxs6-fkHKmZ6F8L8l-aRpYLGehXUeSoP28tl2b66aaWOi6L4ccyOb6LEOrSHovSXpSg-L9uL1ZjdRCHW4tTS0-OMqafTsyFYcJeJ5FfpXvPvF6Ca01dFLnYexAAwGCLaWenBt3i9TNPKm",
    concentration: "Eau de Parfum",
    longevity: "8–10 Hours",
    projection: "Moderate",
    sizes: "50ml | 100ml",
    topNotes: "Bergamot, Sea Spray Accord",
    heartNotes: "Crushed Lavender, Cold Stone",
    baseNotes: "White Musk, Driftwood",
    badge: "Limited Edition",
  },
  {
    slug: "recall",
    name: "Recall",
    sku: "RF-REC-50",
    category: "Parfum",
    stock: 22,
    price: 54600,
    tagline: "Dusty Paper, Amber & White Musk",
    description:
      "An intimate archive of memories: old shelves, amber light, and the soft static of a needle finding vinyl.",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApbVxIF4MXGibTFX8DFEURSn2y9i0eB6_Wj8ijXeidYcaQB2j5QL6m17ejbZSw_vpOFWXORgBFg10X37Q0To4sNrXOdcjmsWGmQWg9bVHIOWigsYDv5hObllvkqTMSJH7CbFmUt0oCjTYr4Cxgd2czL7pqpbuiO9CfTH2jjdWURmHnXFwOA3crO-85d-r8nkIsa5jAoX5zTHTAlXfDv7eEg_cXQmDKnDFfPMi7gI3wIayZ8ea4gWWa9ICmIMb6lFxGBZQe814y",
    concentration: "Eau de Parfum",
    longevity: "8–10 Hours",
    projection: "Soft to Moderate",
    sizes: "50ml | 100ml",
    topNotes: "Cardamom, Paper Dust Accord",
    heartNotes: "Amber, Worn Leather",
    baseNotes: "White Musk, Oakwood",
    badge: "Archive",
  },
];

const reviewsBySlug: Record<string, { authorName: string; quote: string }[]> = {
  linger: [
    {
      authorName: "Zoya Rehman",
      quote:
        "I wore this to a gala and three people stopped me to ask what I was wearing. It feels like a second skin, very intimate yet commanding.",
    },
    {
      authorName: "Hamza Ali",
      quote:
        "Finally a perfume that actually lasts the whole day. The dry down is incredible—warm, woody and perfectly balanced. Highly recommend.",
    },
    {
      authorName: "Sarah Khan",
      quote:
        "It smells like a memory of a rainy day in a library. Very niche and sophisticated. Not your typical mass-market scent at all.",
    },
  ],
  trace: [],
  recall: [],
};

async function main() {
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      create: p,
      update: {
        name: p.name,
        sku: p.sku,
        category: p.category,
        stock: p.stock,
        price: p.price,
        tagline: p.tagline,
        description: p.description,
        heroImage: p.heroImage,
        concentration: p.concentration,
        longevity: p.longevity,
        projection: p.projection,
        sizes: p.sizes,
        topNotes: p.topNotes,
        heartNotes: p.heartNotes,
        baseNotes: p.baseNotes,
        badge: p.badge,
      },
    });
  }
  for (const slug of Object.keys(reviewsBySlug)) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) continue;
    const existing = await prisma.review.findMany({
      where: { productId: product.id },
      select: { authorName: true },
    });
    const existingNames = new Set(existing.map((e) => e.authorName));
    for (const r of reviewsBySlug[slug as keyof typeof reviewsBySlug]) {
      if (existingNames.has(r.authorName)) continue;
      await prisma.review.create({
        data: {
          productId: product.id,
          authorName: r.authorName,
          quote: r.quote,
        },
      });
    }
  }
  console.log("Seed done.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
