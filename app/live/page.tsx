"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const SESSIONS = [
  {
    id: "1",
    title: "Evening Fashion Deals",
    host: "Mira Styles",
    status: "upcoming",
    time: "Aaj 8:00 PM",
  },
  {
    id: "2",
    title: "Gadget Flash Hour",
    host: "Tech Bazaar",
    status: "live",
    time: "Live now",
  },
]

export default function LivePage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">Live Shopping</h1>
      <p className="text-sm text-gray-500 mb-6">
        Live sessions mein deals dekho. Stream integration next update — abhi schedule + join ready.
      </p>

      <div className="space-y-4">
        {SESSIONS.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border bg-white dark:bg-zinc-900 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">{s.title}</h2>
                <p className="text-sm text-gray-500">{s.host}</p>
                <p className="text-xs mt-1 text-gray-400">{s.time}</p>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  s.status === "live"
                    ? "bg-red-100 text-red-600"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {s.status === "live" ? "LIVE" : "UPCOMING"}
              </span>
            </div>
            <Link href="/products">
              <Button className="w-full mt-4" variant={s.status === "live" ? "default" : "outline"}>
                {s.status === "live" ? "Watch & Shop" : "Set Reminder / Browse"}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
