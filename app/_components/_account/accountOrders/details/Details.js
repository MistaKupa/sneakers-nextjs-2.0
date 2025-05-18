import { format } from "date-fns";
import OrderItemsCard from "./OrderItemsCard";

export default function Details({ orderItems, orderDetails }) {
  const [details] = orderDetails;
  const {
    id: orderId,
    order_date,
    customer_name: customerName,
    customer_adress: customerAdress,
    customer_postal: customerPostal,
    customer_city: customerCity,
    total_price: totalPrice,
    customer_country: customerCountry,

    paid,
  } = details;

  const orderDate = format(new Date(order_date), "dd/MM/yyyy");

  return (
    <div className="max-w-[1040px] flex flex-col gap-20 justify-center border-2 rounded-md p-10 md:p-16">
      <p>
        Your order <span className="font-semibold"> </span>is being prepared.
      </p>

      <div className="flex flex-col gap-10 md:grid md:grid-cols-3 justify-between px-5 md:p-0">
        <div className="border-b-2 pb-5 md:border-b-0 md:pb-0">
          <h4 className="font-semibold mb-2">Delivery adress</h4>
          <div className="flex flex-col text-sm text-dark-400">
            <span>{customerName}</span>
            <span>{customerAdress}</span>
            <span>{`${customerPostal} ${customerCity}`}</span>
            <span>{customerCountry}</span>
          </div>
        </div>

        <div className="border-b-2 pb-5 md:border-b-0 md:pb-0">
          <h4 className="font-semibold mb-2">Facturation adress</h4>
          <div className="flex flex-col text-sm text-dark-400">
            <span>{customerName}</span>
            <span>{customerAdress}</span>
            <span>{`${customerPostal} ${customerCity}`}</span>
            <span>{customerCountry}</span>
          </div>
        </div>

        <div className="border-b-2 pb-5 md:border-b-0 md:pb-0">
          <h4 className="font-semibold mb-2">Order details</h4>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col text-sm">
              <span className=" text-dark-400">Order number</span>
              <span className="font-semibold">{orderId}</span>
            </div>
            <div className="flex flex-col text-sm">
              <span className=" text-dark-400">Order date</span>
              <span className="font-semibold">{orderDate}</span>
            </div>
            <div className="flex flex-col text-sm">
              <span className=" text-dark-400">Delivery option</span>
              <span className="font-semibold">Placeholder</span>
            </div>
            <div className="flex flex-col text-sm">
              <span className=" text-dark-400">Payment method</span>
              <span className="font-semibold">Card payment</span>
            </div>
            <div className="flex flex-col text-sm">
              <span className=" text-dark-400">Payment status</span>
              <span
                className={` ${
                  paid ? "text-green-500" : "text-red-500"
                } font-semibold`}
              >
                {paid ? "Paid" : "Pending"}
              </span>
            </div>
            <div className="flex flex-col text-sm">
              <span className=" text-dark-400">Order status</span>
              <span className="font-semibold">Delivered</span>
            </div>
          </div>
        </div>
      </div>

      <OrderItemsCard orderItems={orderItems} totalPrice={totalPrice} />
    </div>
  );
}
