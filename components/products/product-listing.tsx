"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/lib/types"
import { ProductCard } from "@/components/products/product-card"

export function ProductListing({ category }: { category?: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        let query = supabase
          .from("products")
          .select("*")
          .eq("approved", true)
          .order("created_at", { ascending: false })

        if (category) {
          query = query.ilike("category", category)
        }

        const { data, error } = await query
        if (error) throw error
        setProducts(data || [])
      } catch (err) {
        console.error(err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category])

  if (loading) {
    return <div className="text-center py-16 text-gray-500">Loading products...</div>
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        No products found.
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">{products.length} products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
