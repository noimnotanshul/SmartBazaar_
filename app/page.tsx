import Link from "next/link"

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="rounded-2xl bg-gradient-to-br from-[#FF9933] to-[#FF6B00] text-white p-8 md:p-12 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          SmartBazaar
        </h1>
        <p className="text-lg opacity-95 mb-2">The Art of Smart Shopping</p>
        <p className="text-sm opacity-90 mb-6">
          Bargain with Bhaiya Ji. Shop from local sellers. Save more.
        </p>
        <Link
          href="/products"
          className="inline-block bg-white text-[#FF6B00] font-semibold px-6 py-3 rounded-full"
        >
          Start Shopping
        </Link>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { name: "Fashion", href: "/products?cat=Fashion" },
          { name: "Electronics", href: "/products?cat=Electronics" },
          { name: "Home", href: "/products?cat=Home" },
          { name: "Grocery", href: "/products?cat=Grocery" },
        ].map((c) => (
          <Link
            key={c.name}
            href={c.href}
            className="rounded-xl border bg-white dark:bg-zinc-900 p-6 text-center font-semibold hover:border-[#FF6B00] transition"
          >
            {c.name}
          </Link>
        ))}
      </section>

      <section className="text-center py-8">
        <h2 className="text-xl font-bold mb-2">Why SmartBazaar?</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
          AI bargaining, local sellers, group buys aur smart deals — ek jagah.
        </p>
      </section>
    </div>
  )
}
