"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingBag, ShoppingCart, Menu, X, Search } from "lucide-react"
import { useCartStore, useAuthStore } from "@/lib/store"

export function Header() {
  const [open, setOpen] = useState(false)
  const totalItems = useCartStore((s) => s.getTotalItems())
  const user = useAuthStore((s) => s.user)

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="bg-gradient-to-r from-[#FF9933] via-[#FF8C00] to-[#FF6B00] text-white">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <ShoppingBag className="h-6 w-6" />
            <span>SmartBazaar</span>
          </Link>

          <div className="flex-1 hidden sm:block max-w-md mx-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search products..."
                className="w-full h-9 pl-9 pr-3 rounded-full text-sm text-gray-900 border-0"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-white/10">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <Link
                href="/profile"
                className="bg-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full"
              >
                Account
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="bg-white text-[#FF6B00] text-sm font-semibold px-3 py-1.5 rounded-full"
              >
                Login
              </Link>
            )}
            <button
              className="sm:hidden p-2"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden sm:flex bg-white dark:bg-zinc-900 border-b px-4 h-10 items-center gap-6 text-sm font-medium max-w-6xl mx-auto">
        <Link href="/products" className="hover:text-[#FF6B00]">Shop</Link>
        <Link href="/live" className="hover:text-[#FF6B00]">Live</Link>
        <Link href="/group-buy" className="hover:text-[#FF6B00]">Group Buy</Link>
        <Link href="/try-on" className="hover:text-[#FF6B00]">Try On</Link>
        <Link href="/seller" className="hover:text-[#FF6B00]">Sell</Link>
      </nav>

      {open && (
        <div className="sm:hidden bg-white dark:bg-zinc-900 border-b p-4 space-y-3 text-sm font-medium">
          <Link href="/products" onClick={() => setOpen(false)} className="block">Shop</Link>
          <Link href="/live" onClick={() => setOpen(false)} className="block">Live</Link>
          <Link href="/group-buy" onClick={() => setOpen(false)} className="block">Group Buy</Link>
          <Link href="/try-on" onClick={() => setOpen(false)} className="block">Try On</Link>
          <Link href="/seller" onClick={() => setOpen(false)} className="block">Sell</Link>
        </div>
      )}
    </header>
  )
}
