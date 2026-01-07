import { useCart } from "@/app/_context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { IoAdd, IoRemove } from "react-icons/io5";

export default function CartProductCardMobile() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col gap-5">
      {cart.map((product, i) => {
        const discountedPrice = product.price * (product.discount / 100);

        const productTotal = product.discount
          ? discountedPrice * product.quantity
          : product.price * product.quantity;

        return (
          <div className="w-full flex items-center gap-5 border-b pb-5" key={i}>
            <div className="w-20">
              <Image
                src={product.images[0]}
                alt="Product image"
                width={80}
                height={80}
                quality={80}
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>

            <div className="flex flex-col justify-center gap-5">
              <div>
                <span className="text-xs text-dark-300">SNEAKERS COMPANY</span>

                <Link href={`/product/${product.id}`}>
                  <h5 className="text-dark-500 font-semibold hover:text-newPrimary duration-300">
                    {product.title}
                  </h5>
                </Link>

                <span className="text-dark-400 text-sm">
                  Size: {product.selectedSize}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  className="bg-dark-300 px-1 py-1 rounded-md"
                  onClick={() =>
                    updateQuantity(
                      product.id,
                      product.quantity - 1,
                      product.selectedSize
                    )
                  }
                >
                  <IoRemove />
                </button>
                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  className="w-6 text-center bg-dark-200 border rounded-md focus:outline-newPrimary"
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value, 10);
                    if (!isNaN(newQuantity) && newQuantity >= 1) {
                      updateQuantity(
                        product.id,
                        newQuantity,
                        product.selectedSize
                      );
                    }
                  }}
                />
                <button
                  className="bg-dark-300 px-1 py-1 rounded-md"
                  onClick={() =>
                    updateQuantity(
                      product.id,
                      product.quantity + 1,
                      product.selectedSize
                    )
                  }
                >
                  <IoAdd />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
