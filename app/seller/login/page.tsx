"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Store, Phone, Lock } from "lucide-react"

export default function SellerLoginPage() {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = () => {
    setError("")
    if (!phone.trim() || !password) {
      setError("Phone aur password daalo")
      return
    }
    setLoading(true)
    try {
      const saved = localStorage.getItem("seller_data")
      if (!saved) {
        setError("No account found. Pehle signup karo.")
        setLoading(false)
        return
      }
      const seller = JSON.parse(saved)
      const savedPhone = String(seller.phone || "").replace(/\s/g, "")
      const inputPhone = phone.trim().replace(/\s/g, "")

      if (savedPhone === inputPhone && seller.password === password) {
        window.location.href = "/seller/dashboard"
      } else {
        setError("Invalid phone or password")
        setLoading(false)
      }
    } catch {
      setError("Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex flex-col justify-center px-6 py-10 max-w-md mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mb-5">
        <Store className="h-7 w-7 text-white" />
      </div>
      <h1 className="text-2xl font-bold mb-1">Seller Login</h1>
      <p className="text-sm text-gray-500 mb-6">Welcome back to SmartBazaar</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-2 border rounded-xl px-3">
          <Phone className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Phone number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-0 focus:ring-0"
          />
        </div>
        <div className="flex items-center gap-2 border rounded-xl px-3">
          <Lock className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-0 focus:ring-0"
          />
        </div>
      </div>

      <Button
        onClick={handleLogin}
        disabled={loading}
        className="mt-6 w-full h-12"
      >
        {loading ? "Logging in..." : "Log in"}
      </Button>

      <p className="text-center text-xs text-gray-500 mt-4">
        New shop?{" "}
        <Link href="/seller/signup" className="text-[#FF6B00] font-medium">
          Create an account
        </Link>
      </p>
    </div>
  )
}
