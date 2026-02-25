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

const journalEntries = [
  {
    slug: "the-ghost-of-a-rose",
    category: "Olfactory Poetry",
    title: "The Ghost of a Rose",
    description:
      "In the quiet corners of a forgotten garden, the scent of crushed petals evokes a childhood long passed, where time stood still under the weight of summer dew. It is not the rose itself we remember, but the hollow space it left in the air after the harvest.",
    body: "In the quiet corners of a forgotten garden, where the iron gate has long since rusted shut, the scent of crushed rose petals still drifts through the overgrown hedgerows.\n\nIt is a curious thing—the way memory clings to molecules. A single whiff of centifolia, bruised and left to oxidise on warm stone, can transport us to a childhood we barely remember living. The ghost of a rose is not the rose itself, but the hollow space it leaves in the air after the harvest.\n\nWhen we composed our 'Linger' fragrance, we began here—in that liminal space between presence and absence. The top notes of faded citrus peel and crushed rose petals are designed to evoke this spectral quality: something beautiful that is already in the process of disappearing.\n\nIn perfumery, the most poignant notes are often the ones that vanish first. They set the stage for deeper truths—the sandalwood and amber resin that emerge slowly, like memories surfacing through layers of forgetting.\n\nThis is the paradox of scent: the more fleeting it is, the more indelible the impression it leaves.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbyLWiDYyYF5gVzjawBmNVsumPFWBkaM1T7QNZFWYH9yfx5bsN70EulMtU7nXJ33FQIlXcbbdAbvm5MI8Mv8CX3s3cp8-s0BG9wIJN9b6I0qcU9DDaJ2YANpCsvoD3DUgR0OPhbgtTDGL_BfDtEi3W35JZV76I6aRBk0tX4OvLdAG_4BEW9-Ut0vaoq81DqSmsrc4HOSjC23m6ldajfyrusuCY-FPXKxILYhwdfV8y0mPeqPrwMgpZsckqsQOu88AMHaYvqsCouiqn",
    featured: true,
    publishedAt: new Date("2023-10-14"),
  },
  {
    slug: "scent-as-a-vessel-for-time",
    category: "Philosophical Musings",
    title: "Scent as a Vessel for Time",
    description:
      "How does a single molecule carry the weight of a decade? Exploring the architecture of memory through the lens of niche perfumery. We are all archives of invisible maps, guided by the phantom limbs of aromas we once knew.",
    body: "How does a single molecule carry the weight of a decade?\n\nThe olfactory bulb sits just millimetres from the hippocampus—the brain's cartographer of memory. No other sense enjoys such intimate proximity to the machinery of remembering. This is not coincidence; it is architecture.\n\nWhen we inhale a familiar scent, we do not simply recognise it. We are momentarily *inside* the memory it encodes. The sunlit kitchen. The rain-soaked wool of a grandmother's coat. The chalk dust of a schoolroom we thought we had forgotten.\n\nIn this way, perfume is not decoration. It is a vessel—a liquid archive that carries time in suspension.\n\nAt Reminiscent, this understanding shapes every composition we create. We do not design fragrances to smell 'good' in the conventional sense. We design them to feel *true*—to resonate with the invisible cartography of lived experience.\n\nConsider the base notes of smoked vanilla and amber resin in 'Linger'. These are not mere ingredients; they are the olfactory equivalent of a sepia photograph—warm, slightly faded, imbued with the patina of time passing.\n\nWe are all archives of invisible maps, guided by the phantom limbs of aromas we once knew. The question is not whether scent can capture time. The question is whether we are brave enough to let it.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpobVXBb5hdHMnNNiyxqEj1NKh6gkedeu0ngvW6USSQum4pq6_d6_r_7mKM5hdcqoNazdKqHm6EeVeQSEz37RLS7fFm861K6TFUrUhk47WadOsmOabLHRdPfdyPS9z23dRmnz8sUR26bOf9-qs50wakWu72I9UA1xyMtCmVzbRLQqx4K1jp6sQmrG1TCW2Xj2EFwGbU-lGAXFsR5rIsL2Py_-4wmDMSjJGFjuXOoiBnujH3pJVxcZLPnN2g-Vsmdii4jI4wKLGlClH",
    featured: true,
    publishedAt: new Date("2023-09-28"),
  },
  {
    slug: "the-anatomy-of-melancholy",
    category: "Fragrant Memories",
    title: "The Anatomy of Melancholy",
    description:
      "Rain-slicked pavement and the iron-rich scent of impending storms. Why does the smell of earth before rain feel like a homecoming? In the heart of the storm, we find the notes that compose our most silent griefs.",
    body: "Rain-slicked pavement and the iron-rich scent of impending storms.\n\nThere is a word for the smell of earth after rain: petrichor. But there is no word for the feeling it summons—that strange, aching comfort, as if the sky were weeping on your behalf.\n\nWhy does the smell of wet earth feel like a homecoming? Perhaps because it is one of the oldest scents our species has known. Long before we had language for sadness, we had the olfactory experience of it—the mineral sharpness of stone under water, the green decay of fallen leaves, the metallic edge of ozone.\n\nIn the heart of the storm, we find the notes that compose our most silent griefs. These are the accords we explored in 'Trace': bergamot and sea spray for the sharp inhale of loss, cold stone and crushed lavender for the slow exhale of acceptance.\n\nMelancholy, we have come to believe, is not the absence of joy. It is joy remembered—and the tender ache of knowing it cannot be held.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnY4uNVP69syLBeXGINeKsopEWTBGFlnJOrrIKM91zUmiI5As99PT91u0WNwdxVmesGWlBvmfb-tHcX2YLmbSAYtBJYRYcfW7i167aPd9_4WkAptVEP8ykP0oYHs315sWYC6JhWExb195HCxAUDkN4lPw3_et2yUV-TDWzJKPusvolgh4BWtDzDV1SBqOdtEFhDowTkGopsjBrUsM6pZbqUGnkAaWDkH1B0ZvM4J4-oNXW_MiOon4pciHb0QvI8JWBgJ0sjCnWAl-J",
    featured: false,
    publishedAt: new Date("2023-09-12"),
  },
  {
    slug: "the-sourcing-of-somalian-frankincense",
    category: "Raw Materials",
    title: "The Sourcing of Somalian Frankincense",
    description:
      "An exploration into the high-altitude resins that form the backbone of our 'Ancient Ink' collection. From the arid plateaus of the Cal Madow mountains to the distillation chamber.",
    body: "The Boswellia sacra trees that cling to the limestone cliffsides of Somalia's Cal Madow mountains have been producing resin for millennia.\n\nHarvesting frankincense is an act of patience. The harvesters—known locally as 'tappers'—make shallow incisions in the bark and return weeks later to collect the hardened tears of sap that have wept from the wounds. It is, in its own way, a form of perfumery distilled to its most elemental: wound, patience, and the beauty that emerges from both.\n\nThe resin we source for our compositions comes from a cooperative of family-run farms in the Sanaag region. Each harvest is graded by colour, clarity, and aromatic profile. The finest tears—translucent, pale green, almost jade-like—yield an oil that is simultaneously sacred and savage: smoky, citric, and deeply resinous.\n\nIn 'Recall', we use this oil as a bridge between the dusty paper accord of the top notes and the warm amber resin of the base. It is the connective tissue that holds the fragrance's narrative together—the thread that links memory to meaning.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDDCKWGyN8CQAbaKPA_4QBMwXq0X5OVo81sxVTBL_w2Glsxwj3UIpX2fw0UW6DyXtsF-BUjMyQiy9f-729MNLnsNx6nznwPcCMqtPml5Gc1od6OxlFTqxhs_mbqyJlCbANu5lAA4GsUmRB9rW8vWTJGrMQNnP-5K9Yh2Z8aGkeqbMwlUfQ9zOhKPlclhCGKpzzJysULEJRG8ZrblOFazdIwxY6GzcA4h8v7eJV1WuKa_6gx7rhP0WaRrkouNBjOMkYwTX9gVVpY",
    featured: false,
    publishedAt: new Date("2023-08-20"),
  },
  {
    slug: "form-and-function-the-travertine-cap",
    category: "Architecture",
    title: "Form and Function: The Travertine Cap",
    description:
      "Why we chose the porous, architectural nature of travertine stone as our signature tactile element. A meditation on the intersection of material and memory.",
    body: "The bottle cap is, in most perfumery, an afterthought. A functional closure. Something to be removed and set aside.\n\nWe wanted ours to be the opposite—a tactile invitation. Something you'd pick up even when you weren't planning to spray.\n\nTravertine is a form of limestone deposited by mineral springs. Its surface is characterised by a network of tiny voids—pores left behind by gas bubbles trapped during formation. Run your thumb across it and you feel a landscape in miniature: craters, ridges, the topography of deep time compressed into a disc.\n\nWe source our travertine from a quarry outside Tivoli, near Rome, where the stone has been extracted since the time of the Colosseum. Each cap is hand-turned on a lathe, then buffed to a matte finish that preserves the stone's natural imperfections.\n\nThe result is a closure that feels ancient and modern simultaneously—much like the fragrances it seals. It absorbs a trace of perfume over time, becoming a personal artefact. Your cap will not smell like anyone else's.\n\nThis is the philosophy that guides every material decision at Reminiscent: form should deepen function, and function should reveal beauty.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAs-dpLDysJF_yfd2KlOw5rul5KT1WFFcxEGS0zWHMYHL-wELMHbcR1xggMuGA3ALJrCc1nnY6I_WtAVnr6828r3eKiV12QA1-vNONpi67CyxeeMFTv8ClUqBY6oRj9JM4vHbfGPnitsGM_Gbz49Sc00wIkD7tnxkKvkMa6RJQbskH7JN2aKR6scmr8h4tqDdf-xWkxZv2cCyPTNXyBrEtSTPWEsDVbv-VC27TNExE4CGCpGVusqCw93t_9ptBGvpHW_pakvNQq",
    featured: false,
    publishedAt: new Date("2023-07-15"),
  },
];

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

  // Seed journal entries
  for (const entry of journalEntries) {
    await prisma.journalEntry.upsert({
      where: { slug: entry.slug },
      create: entry,
      update: {
        category: entry.category,
        title: entry.title,
        description: entry.description,
        body: entry.body,
        image: entry.image,
        featured: entry.featured,
        publishedAt: entry.publishedAt,
      },
    });
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
