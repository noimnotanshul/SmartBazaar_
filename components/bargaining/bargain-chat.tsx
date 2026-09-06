"use client"

import { useState, useRef, useEffect } from "react"
import { processUserOffer, calculateFloorPrice } from "@/lib/ai-bargaining"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

type Msg = { role: "bhaiya" | "user"; text: string }

export function BargainChat({
  productId,
  productName,
  price,
  floorPrice,
  image,
  onClose,
}: {
  productId: string
  productName: string
  price: number
  floorPrice?: number | null
  image?: string
  onClose?: () => void
}) {
  const floor = calculateFloorPrice(price, floorPrice)
  const addItem = useCartStore((s) => s.addItem)
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bhaiya",
      text: `Namaste ji! Main Bhaiya Ji. "\( {productName}" ki price ₹ \){price} hai. Aap apna budget batao — izzat se baat karte hain.`,
    },
  ])
  const [input, setInput] = useState("")
  const [round, setRound] = useState(0)
  const [dealPrice, setDealPrice] = useState<number | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const send = () => {
    const raw = input.trim().replace(/[₹,\s]/g, "")
    const offer = Number(raw)
    if (!raw || Number.isNaN(offer) || offer <= 0) {
      setMessages((m) => [
        ...m,
        {
          role: "bhaiya",
          text: "Sirf number mein price likho ji, jaise 500",
        },
      ])
      return
    }

    setMessages((m) => [...m, { role: "user", text: `₹${offer}` }])
    setInput("")

    const result = processUserOffer({
      offer,
      price,
      floor,
      round: round + 1,
    })
    setRound((r) => r + 1)

    setTimeout(() => {
      setMessages((m) => [...m, { role: "bhaiya", text: result.reply }])
      if (result.accepted) {
        setDealPrice(offer)
      }
    }, 400)
  }

  const addDealToCart = () => {
    if (dealPrice == null) return
    addItem({
      id: productId,
      name: productName + ` (Deal ₹${dealPrice})`,
      price: dealPrice,
      image,
    })
    setMessages((m) => [
      ...m,
      {
        role: "bhaiya",
        text: `Ho gaya! ₹${dealPrice} pe cart mein add kar diya. Checkout pe yahi rate lagega.`,
      },
    ])
  }

  return (
    <div className="flex flex-col h-[420px] rounded-xl border bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="px-4 py-3 border-b bg-orange-50 dark:bg-zinc-800 flex items-center justify-between">
        <div>
          <p className="font-bold text-sm text-[#FF6B00]">Bhaiya Ji</p>
          <p className="text-[11px] text-gray-500">Respectful bargaining</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-xs text-gray-500">
            Close
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-[#FF6B00] text-white rounded-br-sm"
                  : "bg-gray-100 dark:bg-zinc-800 rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {dealPrice != null ? (
        <div className="p-3 border-t">
          <Button className="w-full" onClick={addDealToCart}>
            Add to Cart at ₹{dealPrice}
          </Button>
        </div>
      ) : (
        <div className="p-3 border-t flex gap-2">
          <Input
            placeholder="Apni price likho (jaise 550)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <Button onClick={send} className="shrink-0 px-3">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
