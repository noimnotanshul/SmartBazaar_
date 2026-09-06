"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCartStore, useAuthStore } from "@/lib/store"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
  })

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="mb-4">Cart empty hai</p>
        <Link href="/products">
          <Button>Shop Now</Button>
        </Link>
      </div>
    )
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Saari fields bharo")
      return
    }

    if (!user) {
      setError("Pehle login karo")
      router.push("/auth/login")
      return
    }

    setLoading(true)
    try {
      const { error: orderError } = await supabase.from("orders").insert({
        user_id: user.id,
        customer_name: form.name.trim(),
        customer_phone: form.phone.trim(),
        customer_address: form.address.trim(),
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        total: getTotalPrice(),
        status: "placed",
        payment_method: "cod",
      })

      if (orderError) throw orderError

      clearCart()
      router.push("/checkout/success")
    } catch (err: any) {
      setError(err.message || "Order fail ho gaya")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="space-y-4">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm font-medium mb-1 block">Full Name</label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Phone</label>
          <Input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="10 digit mobile"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Address</label>
          <Input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Full delivery address"
            required
          />
        </div>

        <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900 mt-4">
          <p className="text-sm text-gray-500 mb-2">
            {items.length} item(s) · Cash on Delivery
          </p>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-[#FF6B00]">₹{getTotalPrice()}</span>
          </div>
        </div>

        <Button type="submit" className="w-full h-12" disabled={loading}>
          {loading ? "Placing order..." : "Place Order (COD)"}
        </Button>
      </form>
    </div>
  )
}
