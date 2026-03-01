"use client";

import { getAllProductsClient } from "@/app/_lib/admin-service-client";
import { cn } from "@/app/_lib/utils";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import ProductCardForm from "./ProductCardForm";
import { useState } from "react";
import { ProductId } from "@/types/product.types";

export default function ProductsTable() {
  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductsClient,
  });

  const [editingId, setEditingId] = useState<ProductId | null>(null);

  const handleOpenEdit = (id: ProductId) => {
    setEditingId(id);
  };

  const handleCloseEdit = () => {
    setEditingId(null);
  };

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
            "grid grid-cols-[repeat(6,1fr)_6rem] gap-5",
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
          {data.map((product) =>
            editingId === product.id ? (
              <ProductCardForm
                key={product.id}
                product={product}
                onClose={handleCloseEdit}
              />
            ) : (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleOpenEdit}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
