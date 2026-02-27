"use client";

import { getAllProductsClient } from "@/app/_lib/admin-service-client";
import { cn } from "@/app/_lib/utils";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import ProductCardForm from "./ProductCardForm";

export default function ProductsTable() {
  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductsClient,
  });

  return (
    <div className="bg-slate-50 drop-shadow rounded-sm">
      <h2
        className={cn(
          "w-full py-5 px-10",
          " border-b-4 border-b-white",
          "font-semibold text-xl",
        )}
      >
        Products
      </h2>
      <div className="w-full">
        <div
          className={cn(
            "w-full py-5 px-10",
            "grid grid-cols-[repeat(6,1fr)_4rem] gap-5",
            "border-b-4 border-b-white",
            "font-medium bg-slate-100",
          )}
        >
          <div>Thumbnail</div>
          <div>Product ID</div>
          <div>Title</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Stock</div>

          <div></div>
        </div>
        <div className="grid grid-rows-[auto]">
          {data.map((product) => (
            // <ProductCard key={product.id} product={product} />
            <ProductCardForm key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
