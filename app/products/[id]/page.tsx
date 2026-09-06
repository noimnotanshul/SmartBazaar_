import { ProductDetail } from "@/components/products/product-detail"

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  return <ProductDetail id={params.id} />
}
