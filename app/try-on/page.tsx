"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function TryOnPage() {
  const [preview, setPreview] = useState<string | null>(null)

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">Virtual Try-On</h1>
      <p className="text-sm text-gray-500 mb-6">
        Apni photo upload karo — product look preview (basic). Advanced AR jaldi aa raha hai.
      </p>

      <div className="rounded-xl border bg-white dark:bg-zinc-900 p-6 text-center">
        <div className="aspect-[3/4] rounded-lg bg-gray-100 dark:bg-zinc-800 overflow-hidden mb-4 flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-gray-400 text-sm px-4">
              Photo yahan dikhegi
            </p>
          )}
        </div>

        <label className="block">
          <input
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={onFile}
          />
          <span className="inline-flex w-full h-12 items-center justify-center rounded-lg bg-[#FF6B00] text-white font-semibold cursor-pointer">
            {preview ? "Change Photo" : "Upload / Camera"}
          </span>
        </label>

        {preview && (
          <Button
            variant="outline"
            className="w-full mt-3"
            onClick={() => setPreview(null)}
          >
            Clear
          </Button>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Tip: Fashion products ke saath try-on best lagta hai. Full AR overlay next update mein.
      </p>
    </div>
  )
}
