"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "@/lib/store"
import { signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const router = useRouter()
  const { user, setUser } = useAuthStore()

  useEffect(() => {
    if (!user) router.replace("/auth/login")
  }, [user, router])

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-500">Loading...</div>
    )
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } catch {}
    setUser(null)
    router.push("/")
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="rounded-2xl border bg-white dark:bg-zinc-900 p-6 text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-[#FF6B00] flex items-center justify-center text-2xl font-bold mx-auto mb-3">
          {user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <h1 className="text-xl font-bold">{user.name}</h1>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="mt-3 text-sm">
          SmartCoins:{" "}
          <span className="font-bold text-[#FF6B00]">{user.coins || 0}</span>
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </div>

      <div className="space-y-3">
        <Link
          href="/products"
          className="block rounded-xl border p-4 bg-white dark:bg-zinc-900 font-medium"
        >
          Continue Shopping →
        </Link>
        <Link
          href="/cart"
          className="block rounded-xl border p-4 bg-white dark:bg-zinc-900 font-medium"
        >
          My Cart →
        </Link>
        <Link
          href="/seller/login"
          className="block rounded-xl border p-4 bg-white dark:bg-zinc-900 font-medium"
        >
          Sell on SmartBazaar →
        </Link>
      </div>
    </div>
  )
}
