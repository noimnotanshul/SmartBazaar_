import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl mx-auto mb-4">
        ✓
      </div>
      <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
      <p className="text-gray-500 mb-8">
        COD order confirm ho gaya. Jaldi deliver hoga.
      </p>
      <div className="flex flex-col gap-3">
        <Link href="/products">
          <Button className="w-full">Continue Shopping</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="w-full">
            Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
