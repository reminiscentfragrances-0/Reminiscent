import { NextRequest, NextResponse } from "next/server";
import { getJournalEntries, getJournalCategories } from "@/lib/db-journal";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category") ?? undefined;
  const [entries, categories] = await Promise.all([
    getJournalEntries(category),
    getJournalCategories(),
  ]);
  return NextResponse.json({ entries, categories });
}
