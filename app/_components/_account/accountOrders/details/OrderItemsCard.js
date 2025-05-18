import Image from "next/image";
import Link from "next/link";

export default function OrderItemsCard({ orderItems, totalPrice }) {
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-dark-400 font-semibold text-sm border-b-4 pb-2">
          <span className="justify-self-start">Product</span>
          <span className="justify-self-center">Quantity</span>
          <span className="justify-self-center">Price</span>
        </div>
        {/*Items */}
        <div className="grid grid-rows-[auto] gap-5">
          {orderItems.map((item) => (
            <div
              key={item.product_id}
              className="grid grid-cols-2 gap-5 md:grid-cols-[2fr_1fr_1fr] border-b pb-5"
            >
              <div className="w-full h-full col-span-2 md:col-span-1 md:row-start-1 flex flex-col md:flex-row items-start md:items-center gap-5 ">
                <div className="w-full h-full">
                  <Image
                    src={item.product_image}
                    alt={`${item.product_name} image`}
                    width={100}
                    height={100}
                    quality={80}
                    className="rounded-md w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-36">
                  <h2 className="text-dark-400 text-sm">Sneakers</h2>
                  <Link href={`/main/product/${item.product_id}`}>
                    <h3 className="text-sm font-semibold">
                      {item.product_name}
                    </h3>
                  </Link>
                </div>

                <div className="w-full text-sm text-dark-400 flex items-center justify-start">
                  Size: {item.product_size}
                </div>
              </div>

              <span className="row-start-2 md:row-start-1 flex gap-2 justify-start md:items-center md:justify-center text-sm">
                <span className="md:hidden">Quantity:</span>
                {item.quantity}
              </span>
              <span className="row-start-2 md:row-start-1 flex gap-2 justify-end md:items-center md:justify-center text-sm">
                <span className="md:hidden">Price:</span>€{item.price_at_time}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[2fr_1fr_1fr] font-bold ">
          <span className="justify-self-start md:col-start-2 md:justify-self-center">
            Total Price:
          </span>
          <span className="justify-self-end col-start-3 md:justify-self-center">
            €{totalPrice}
          </span>
        </div>
      </div>
    </>
  );
}
