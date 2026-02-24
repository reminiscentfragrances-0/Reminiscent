import Link from "next/link";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="flex-none w-[320px] lg:w-[400px] group cursor-pointer">
      <Link href={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-6">
          <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <div
            className="w-full h-full bg-center bg-cover transform group-hover:scale-110 transition-transform duration-700"
            style={{ backgroundImage: `url("${product.image}")` }}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-[family-name:var(--font-serif)] text-2xl text-parchment group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-parchment/60 text-sm mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-parchment font-medium">
            ${product.price.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <span className="material-symbols-outlined text-parchment/40 group-hover:text-primary transition-colors">
              add_shopping_cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
