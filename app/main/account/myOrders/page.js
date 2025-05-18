import AccountOrders from "@/app/_components/_account/accountOrders/AccountOrders";
import OrdersLegend from "@/app/_components/_account/accountSideBar/ordersLegend/OrdersLegend";

export default function MyOrders({ searchParams }) {
  return (
    <div className="w-full mt-5">
      <AccountOrders searchParams={searchParams} />
    </div>
  );
}
