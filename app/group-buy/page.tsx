"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const DEALS = [
  {
    id: "1",
    name: "Wireless Earbuds — Group Deal",
    price: 999,
    mrp: 2499,
    target: 10,
    joined: 6,
    image: "https://picsum.photos/seed/gb1/400/300",
  },
  {
    id: "2",
    name: "Cotton T-Shirt Pack (3)",
    price: 599,
    mrp: 1299,
    target: 15,
    joined: 11,
    image: "https://picsum.photos/seed/gb2/400/300",
  },
]

export default function GroupBuyPage() {
  const [joined, setJoined] = useState<Record<string, number>>({})

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">Group Buy</h1>
      <p className="text-sm text-gray-500 mb-6">
        Saath milke kharido — price aur kam. Target complete hote hi deal lock.
      </p>

      <div className="space-y-4">
        {DEALS.map((d) => {
          const count = joined[d.id] ?? d.joined
          const pct = Math.min(100, Math.round((count / d.target) * 100))
          return (
            <div
              key={d.id}
              className="rounded-xl border bg-white dark:bg-zinc-900 overflow-hidden"
            >
              <img
                src={d.image}
                alt={d.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold">{d.name}</h2>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold text-[#FF6B00]">
                    ₹{d.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{d.mrp}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>
                      {count}/{d.target} joined
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-[#FF6B00] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() =>
                    setJoined((j) => ({
                      ...j,
                      [d.id]: (j[d.id] ?? d.joined) + 1,
                    }))
                  }
                >
                  Join Group Buy
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
