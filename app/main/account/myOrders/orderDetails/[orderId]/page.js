import Details from "@/app/_components/_account/accountOrders/details/Details";
import { getOrderDetails } from "@/app/_lib/data-service";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default async function OrderDetails({ params }) {
  const routeParams = await params;
  const { orderItems, orderDetails } = await getOrderDetails(
    routeParams.orderId
  );

  if (!orderItems && !orderDetails) {
    console.error("Order not found!");
    return notFound();
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-10">
        <Link
          href="/main/account/myOrders"
          className="border border-newPrimary rounded-full p-1"
        >
          <IoArrowBack size={30} className="text-newPrimary" />
        </Link>
        <h2 className="text-3xl font-light">
          Order <span className="font-semibold">{routeParams.orderId}</span>
        </h2>
      </div>

      <Details orderItems={orderItems} orderDetails={orderDetails} />
    </div>
  );
}
