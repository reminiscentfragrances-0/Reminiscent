import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function run() {
  const products = await prisma.product.findMany();
  for (const p of products) {
    if (Number(p.price) < 1000) {
      await prisma.product.update({
        where: { id: p.id },
        data: { price: Number(p.price) * 280 },
      });
      console.log(`Updated price for ${p.name} to ${Number(p.price) * 280}`);
    }
  }
}
run().then(() => prisma.$disconnect());
