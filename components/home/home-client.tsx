"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Product } from "@/lib/types"
import { ProductCard } from "@/components/products/product-card"

const CATEGORIES = [
  { name: "Fashion", emoji: "👔", href: "/products?cat=Fashion" },
  { name: "Electronics", emoji: "💻", href: "/products?cat=Electronics" },
  { name: "Grocery", emoji: "🛒", href: "/products?cat=Grocery" },
  { name: "Home", emoji: "🏠", href: "/products?cat=Home" },
  { name: "Beauty", emoji: "💄", href: "/products?cat=Beauty" },
  { name: "Mobiles", emoji: "📱", href: "/products?cat=Electronics" },
  { name: "Appliances", emoji: "🔌", href: "/products?cat=Electronics" },
  { name: "View All", emoji: "➕", href: "/products" },
]

export function HomeClient() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("approved", true)
      .limit(8)
      .then(({ data }) => setProducts(data || []))
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-r from-[#FF9933] to-[#FF6B00] text-white p-8 mb-6">
          <p className="text-xs font-bold mb-2">HYPERLOCAL MARKETPLACE</p>
          <h1 className="text-3xl font-bold mb-2">Shop Local. Save More.</h1>
          <p className="mb-4 text-sm">Bargain · Local sellers · Smart deals</p>
          <Link href="/products" className="bg-white text-[#FF6B00] font-bold px-5 py-2 rounded-full text-sm">
            SHOP NOW
          </Link>
        </div>

        <h2 className="font-bold mb-3">Shop by Category</h2>
        <div className="grid grid-cols-4 gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <Link key={c.name} href={c.href} className="bg-white border rounded-xl p-3 text-center">
              <div className="text-2xl">{c.emoji}</div>
              <p className="text-[11px] font-medium mt-1">{c.name}</p>
            </Link>
          ))}
        </div>

        <div className="grid gap-3 mb-8">
          <Link href="/products" className="rounded-xl p-5 bg-purple-600 text-white font-bold">
            Bhaiya Ji Bargain →
          </Link>
          <Link href="/group-buy" className="rounded-xl p-5 bg-green-600 text-white font-bold">
            Group Buying →
          </Link>
          <Link href="/try-on" className="rounded-xl p-5 bg-orange-500 text-white font-bold">
            Try-On →
          </Link>
        </div>

        <div className="flex justify-between mb-3">
          <h2 className="font-bold">Featured Products</h2>
          <Link href="/products" className="text-[#FF6B00] text-sm">View All</Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
