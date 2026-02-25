import { prisma } from "@/lib/prisma";

export async function getJournalEntries(category?: string) {
  const where = category ? { category } : {};
  return prisma.journalEntry.findMany({
    where,
    orderBy: { publishedAt: "desc" },
  });
}

export async function getFeaturedJournalEntries() {
  return prisma.journalEntry.findMany({
    where: { featured: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getJournalEntryBySlug(slug: string) {
  return prisma.journalEntry.findUnique({
    where: { slug },
  });
}

export async function getJournalCategories(): Promise<string[]> {
  const entries = await prisma.journalEntry.findMany({
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });
  return entries.map((e) => e.category);
}
