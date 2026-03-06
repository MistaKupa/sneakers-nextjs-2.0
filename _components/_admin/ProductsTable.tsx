"use client";

import { getAllProductsClient } from "@/app/_lib/admin-service-client";
import { cn } from "@/app/_lib/utils";
import { ProductId } from "@/types/product.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CreateProductModal from "./adminModals/CreateProductModal";
import ProductCard from "./ProductCard";
import ProductCardForm from "./ProductCardForm";

export default function ProductsTable() {
  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductsClient,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<ProductId | null>(null);

  const handleOpenEdit = (id: ProductId) => {
    setEditingId(id);
  };

  const handleCloseEdit = () => {
    setEditingId(null);
  };

  return (
    <>
      <div className="relative bg-slate-50 drop-shadow rounded-sm">
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
              "hidden",
              "w-full py-5 px-10",
              "lg:grid grid-cols-[repeat(6,1fr)_8rem] gap-5",
              "border-b-4 border-b-white",
              "font-medium bg-slate-100",
            )}
          >
            <div className="py-1.5">Thumbnail</div>
            <div className="py-1.5">Product ID</div>
            <div className="py-1.5">Title</div>
            <div className="py-1.5">Price</div>
            <div className="py-1.5">Discount</div>
            <div className="py-1.5">Stock</div>
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gradient-to-r from-newPrimary to-newPrimaryGradient py-1.5 px-3 rounded font-semibold text-slate-50 disabled:cursor-not-allowed"
              >
                Create Item
              </button>
            </div>
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

      <CreateProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
