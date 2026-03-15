import AccountOrders from "@/_components/_account/accountOrders/AccountOrders";
import OrdersLegend from "@/_components/_account/accountSideBar/ordersLegend/OrdersLegend";
import { SearchParams } from "@/types/product.types";

export default function MyOrders({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="w-full mt-5">
      <AccountOrders searchParams={searchParams} />
    </div>
  );
}
