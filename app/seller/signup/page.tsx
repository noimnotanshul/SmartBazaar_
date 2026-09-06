"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SellerSignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    shopName: "",
    phone: "",
    city: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!form.shopName || !form.phone || !form.city || !form.password) {
      setError("Saari fields bharo")
      return
    }
    if (form.password.length < 4) {
      setError("Password kam se kam 4 characters")
      return
    }
    setLoading(true)
    try {
      const sellerData = {
        id: "seller_" + Date.now(),
        shopName: form.shopName.trim(),
        phone: form.phone.trim().replace(/\s/g, ""),
        city: form.city.trim(),
        password: form.password,
        role: "seller",
      }
      localStorage.setItem("seller_data", JSON.stringify(sellerData))
      window.location.href = "/seller/dashboard"
    } catch {
      setError("Kuch galat ho gaya")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-[#FF6B00]">Become a Seller</CardTitle>
          <p className="text-sm text-gray-500">Local shopkeepers ke liye</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1 block">Shop Name</label>
              <Input
                value={form.shopName}
                onChange={(e) => setForm({ ...form, shopName: e.target.value })}
                placeholder="Ram Kirana Store"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <Input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="98XXXXXXXX"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">City / Area</label>
              <Input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Jaipur"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full h-12" disabled={loading}>
              {loading ? "Creating..." : "Create Seller Account"}
            </Button>
          </form>
          <p className="text-center text-sm mt-4 text-gray-500">
            Already seller?{" "}
            <Link href="/seller/login" className="text-[#FF6B00] font-medium">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
