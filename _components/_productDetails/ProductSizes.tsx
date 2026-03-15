import { ProductSizeAndQuantity } from "@/types/product.types";
import { Dispatch, SetStateAction } from "react";

interface ProductSizesProps {
  sizes: ProductSizeAndQuantity[];
  selectedSize: string;
  setSelectedSize: Dispatch<SetStateAction<string | null>>;
}

export default function ProductSizes({
  sizes,
  selectedSize,
  setSelectedSize,
}: ProductSizesProps) {
  return (
    <div className="flex gap-1">
      {sizes.map((size) => (
        <button
          key={size.size}
          type="button"
          onClick={() => setSelectedSize(size.size)}
          className={`w-12 flex items-center justify-center  rounded-md  ${
            selectedSize === size.size
              ? "border-2 border-newPrimary"
              : "border hover:border-newPrimary"
          }`}
        >
          {size.size}
        </button>
      ))}
    </div>
  );
}
