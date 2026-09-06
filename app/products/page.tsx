import { ProductListing } from "@/components/products/product-listing"

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { cat?: string }
}) {
  const category = searchParams.cat

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">
        {category ? category : "All Products"}
      </h1>
      <ProductListing category={category} />
    </div>
  )
}
