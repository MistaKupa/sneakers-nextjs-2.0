"use client";

import { cn } from "@/app/_lib/utils";
import { Product, ProductId } from "@/types/product.types";
import Image from "next/image";

import Link from "next/link";
import {
  IoCopyOutline,
  IoEyeOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";

export default function ProductCard({
  product,
  onEdit,
}: {
  product: Product;
  onEdit: (id: ProductId) => void;
}) {
  return (
    <div
      className={cn(
        "h-28 px-10 py-2",
        "grid grid-cols-[repeat(6,1fr)_6rem] gap-10 items-center",
        "border-b-2 last:border-0",
      )}
    >
      <div className="relative w-1/2 h-full">
        <Image
          src={product.images[0]}
          alt="Sneaker thumbnail"
          fill
          className="object-cover"
        />
      </div>
      <div>{product.id}</div>
      <div className="min-w-0 flex" title={product.title}>
        <span className="truncate">{product.title}</span>
      </div>

      <div>
        <span className="truncate">€{product.price.toFixed(2)}</span>
      </div>

      <div>
        <span>{product.discount ? `${product.discount} %` : "—"}</span>
      </div>
      <div>
        <span
          className={cn(
            "text-green-500",
            product.stock <= 2 && "text-red-500",
            product.stock > 2 && product.stock <= 5 && "text-amber-500",
          )}
        >
          {product.stock}
        </span>
      </div>
      <div className="flex justify-between">
        <Link
          href={`/admin/products`}
          className="bg-slate-100 p-1 drop-shadow-sm border hover:scale-105 transition-all duration-300"
        >
          <IoEyeOutline />
        </Link>
        <button
          className="bg-slate-100 p-1 drop-shadow-sm border hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => onEdit(product.id)}
        >
          <IoPencilOutline />
        </button>
        <button className="bg-slate-100 p-1 drop-shadow-sm border hover:scale-105 transition-all duration-300">
          <IoTrashOutline />
        </button>
      </div>
    </div>
  );
}
