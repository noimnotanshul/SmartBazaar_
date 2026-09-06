"use client"

import Link from "next/link"
import { Product } from "@/lib/types"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)
  const img = product.images?.[0] || "https://picsum.photos/400/500"

  return (
    <div className="rounded-xl border bg-white dark:bg-zinc-900 overflow-hidden shadow-sm hover:shadow-md transition">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-[4/5] bg-gray-100 relative">
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.mrp && product.mrp > product.price && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
            </span>
          )}
        </div>
      </Link>
      <div className="p-3">
        <p className="text-xs text-gray-500 truncate">{product.brand}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-bold text-[#FF6B00]">₹{product.price}</span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
          )}
        </div>
        <Button
          className="w-full mt-3 h-9 text-xs"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: img,
            })
          }
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
