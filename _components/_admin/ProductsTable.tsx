"use client";

import { getAllProductsClient } from "@/app/_lib/admin-service-client";
import { cn } from "@/app/_lib/utils";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import ProductCardForm from "./ProductCardForm";
import { useState } from "react";
import { ProductId } from "@/types/product.types";
import CreateProductForm from "./CreateProductForm";
import { IoCloseOutline } from "react-icons/io5";

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

      {isOpen && (
        <>
          <div className="absolute inset-0 bg-black/50 z-10" />

          <div
            className={cn(
              "absolute top-20 left-[50%] -translate-x-[50%] z-20",
              "w-1/2 h-5/6 py-10 px-28",
              "flex flex-col gap-10",
              "bg-slate-50",
              "rounded",
              "overflow-auto",
            )}
          >
            <div className={cn("relative", "flex justify-between")}>
              <h1 className="font-bold text-xl">Create New Product</h1>
              <button onClick={() => setIsOpen(false)}>
                <IoCloseOutline size={30} />
              </button>
            </div>
            <CreateProductForm />
          </div>
        </>
      )}
    </>
  );
}
