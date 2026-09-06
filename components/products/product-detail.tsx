"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/lib/types"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { BargainChat } from "@/components/bargaining/bargain-chat"
import Link from "next/link"

export function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBargain, setShowBargain] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()
      setProduct(data)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="mb-4">Product not found</p>
        <Link href="/products" className="text-[#FF6B00] font-medium">
          Back to Shop
        </Link>
      </div>
    )
  }

  const img = product.images?.[0] || "https://picsum.photos/400/500"

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden bg-gray-100 aspect-square">
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
          <div className="flex items-baseline gap-3 mt-3">
            <span className="text-3xl font-bold text-[#FF6B00]">
              ₹{product.price}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-gray-400 line-through">₹{product.mrp}</span>
            )}
          </div>
          {product.rating && (
            <p className="text-sm mt-2 text-gray-600">
              ★ {product.rating} ({product.review_count || 0} reviews)
            </p>
          )}
          <p className="text-sm mt-4 text-gray-600">
            Stock: {product.stock > 0 ? product.stock : "Out of stock"}
          </p>

          {!showBargain ? (
            <div className="flex flex-col gap-3 mt-6">
              <Button
                className="w-full h-12"
                disabled={product.stock <= 0}
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
              <Button
                variant="outline"
                className="w-full h-12 border-2 border-[#FF6B00] text-[#FF6B00]"
                onClick={() => setShowBargain(true)}
              >
                Bargain with Bhaiya Ji
              </Button>
            </div>
          ) : (
            <div className="mt-6">
              <BargainChat
                productId={product.id}
                productName={product.name}
                price={Number(product.price)}
                floorPrice={product.floor_price}
                image={img}
                onClose={() => setShowBargain(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
