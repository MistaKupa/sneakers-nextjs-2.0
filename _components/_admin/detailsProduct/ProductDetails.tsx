"use client";

import { getProductDetailsClient } from "@/app/_lib/admin-service-client";
import { ProductId } from "@/types/product.types";
import { useQuery } from "@tanstack/react-query";
import ProductImage from "@/_components/_productDetails/ProductImage";
import ProductDetailsForm from "./ProductDetailsForm";

export default function ProductDetails({
  productId,
}: {
  productId: ProductId;
}) {
  const {
    data: product,
    error,
    isPending,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductDetailsClient(productId),
  });

  return (
    <div className="w-full grid gap-5 xl:grid-cols-2">
      <div className="bg-slate-50 p-10 drop-shadow rounded-md">
        <ProductImage product={product} />
      </div>
      <div className="bg-slate-50 p-10 drop-shadow rounded-md">
        <ProductDetailsForm productId={productId} product={product} />
      </div>
    </div>
  );
}
