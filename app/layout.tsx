import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { ApiProgressProvider } from "./components/ApiProgressProvider";
import { Analytics } from "@vercel/analytics/next";

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Reminiscent Fragrances | Niche Fragrance House",
  description:
    "A cinematic collection of sensory recalls and high-end niche essences. Crafted for those who find beauty in the traces left behind.",
  keywords: [
    "fragrance",
    "perfume",
    "niche",
    "luxury",
    "artisan",
    "scent",
    "reminiscent",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${manrope.variable} ${playfairDisplay.variable} antialiased`}
      >
        <CartProvider>
          <ApiProgressProvider>{children}</ApiProgressProvider>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
