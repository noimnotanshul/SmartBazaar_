"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingBag, ShoppingCart, Menu, X, Search } from "lucide-react"
import { useCartStore, useAuthStore } from "@/lib/store"

export function Header() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const router = useRouter()
  const totalItems = useCartStore((s) => s.getTotalItems())
  const user = useAuthStore((s) => s.user)

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(q.trim() ? `/products?q=${encodeURIComponent(q.trim())}` : "/products")
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="bg-gradient-to-r from-[#FF9933] via-[#FF8C00] to-[#FF6B00] text-white">
        <div className="max-w-6xl mx-auto px-3 h-14 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-1.5 font-bold text-lg shrink-0">
            <ShoppingBag className="h-6 w-6" />
            <span>SmartBazaar</span>
          </Link>

          <form onSubmit={onSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="w-full h-9 pl-9 pr-3 rounded-full text-sm text-gray-900"
              />
            </div>
          </form>

          <Link href="/cart" className="relative p-2">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <Link href="/profile" className="bg-white/20 text-xs font-semibold px-3 py-1.5 rounded-full">
              Account
            </Link>
          ) : (
            <Link href="/auth/login" className="bg-white text-[#FF6B00] text-xs font-semibold px-3 py-1.5 rounded-full">
              Login
            </Link>
          )}

          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav className="hidden md:flex bg-white border-b px-3 h-10 items-center gap-4 text-sm font-medium max-w-6xl mx-auto">
        <Link href="/products?cat=Fashion">Fashion</Link>
        <Link href="/products?cat=Electronics">Electronics</Link>
        <Link href="/products?cat=Grocery">Grocery</Link>
        <Link href="/products">Shop</Link>
        <Link href="/group-buy">Group Buy</Link>
        <Link href="/try-on">Try On</Link>
        <Link href="/live">Live</Link>
        <Link href="/seller">Sell</Link>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-b p-4 space-y-3 text-sm font-medium">
          <Link href="/products" onClick={() => setOpen(false)} className="block">Shop</Link>
          <Link href="/group-buy" onClick={() => setOpen(false)} className="block">Group Buy</Link>
          <Link href="/try-on" onClick={() => setOpen(false)} className="block">Try On</Link>
          <Link href="/live" onClick={() => setOpen(false)} className="block">Live</Link>
          <Link href="/seller" onClick={() => setOpen(false)} className="block">Sell</Link>
        </div>
      )}
    </header>
  )
}
