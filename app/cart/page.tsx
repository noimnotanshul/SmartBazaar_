"use client"

import Link from "next/link"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
        <p className="text-gray-500 mb-6">Cart empty hai</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 rounded-xl border bg-white dark:bg-zinc-900 p-3"
          >
            <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden shrink-0">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm line-clamp-2">{item.name}</p>
              <p className="text-[#FF6B00] font-bold mt-1">₹{item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  className="w-7 h-7 rounded-full border text-sm"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                >
                  −
                </button>
                <span className="text-sm font-semibold w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  className="w-7 h-7 rounded-full border text-sm"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  className="ml-auto text-xs text-red-500"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border bg-white dark:bg-zinc-900 p-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-[#FF6B00]">₹{getTotalPrice()}</span>
        </div>
        <Link href="/checkout">
          <Button className="w-full mt-4 h-12">Proceed to Checkout</Button>
        </Link>
      </div>
    </div>
  )
}
