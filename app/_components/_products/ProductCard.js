import Image from "next/image";
import Link from "next/link";
import PriceDetails from "./PriceDetails";
import { motion } from "framer-motion";

function ProductCard({ product }) {
  const discountedPrice = product.price * (product.discount / 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      key={product.id}
      className="flex flex-col justify-between gap-4 rounded-xl w-full h-full bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image Wrapper */}
      <motion.div
        layoutId={`product-${product.id}`}
        className="w-full aspect-[4/5] border-2 rounded-xl border-transparent hover:border-newPrimary transition-all duration-300 overflow-hidden"
      >
        <Link href={`/main/product/${product.id}`}>
          <Image
            src={product.images[0]}
            alt={`Photo of ${product.title}`}
            width={500}
            height={500}
            className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
          />
        </Link>
      </motion.div>

      {/* Product Info */}
      <div className="flex flex-col gap-2 px-3 pb-4">
        <h4 className="text-lg font-semibold text-gray-800 ">
          {product.title}
        </h4>

        <PriceDetails
          price={product.price}
          discountedPrice={discountedPrice}
          discount={product.discount}
        />
      </div>
    </motion.div>
  );
}

export default ProductCard;
