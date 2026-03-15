import Link from "next/link";
import { IoEllipseSharp, IoEllipsisHorizontalSharp } from "react-icons/io5";
import { format } from "date-fns";
import { orderStatusColorCode } from "@/data/constants";
import { Order } from "@/types/order.types";

export default function OrderCardMobile({ order }: { order: Order }) {
  const {
    id,
    order_date,
    products_total_quantity: productsQuantity,
    total_price: totalPrice,
  } = order;

  const orderDate = format(new Date(order_date), "dd/MM/yyyy");

  return (
    <div className="grid grid-cols-3 items-center gap-5 h-20 border-b">
      <div>
        <div className="flex items-center justify-start gap-2">
          <IoEllipseSharp
            className={orderStatusColorCode[order.status].color}
          />
          <Link
            href=""
            className="text-dark-500 font-bold hover:text-newPrimary"
          >
            {id}
          </Link>
        </div>
        <span>{orderDate}</span>
      </div>
      <div className="flex flex-col items-center">
        <span>€{totalPrice}</span>
        <Link
          href={`/main/account/myOrders/orderDetails/${order.id}`}
          className="text-newPrimary"
        >
          Details
        </Link>
      </div>
      <div className="flex justify-center">
        <IoEllipsisHorizontalSharp size={25} className="text-newPrimary" />
      </div>
    </div>
  );
}
