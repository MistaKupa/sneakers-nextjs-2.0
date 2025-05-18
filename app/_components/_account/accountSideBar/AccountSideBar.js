"use client";

import { usePathname } from "next/navigation";
import OrdersLegend from "./ordersLegend/OrdersLegend";
import SettingsLegend from "./settingsLegend/SettingsLegend";
import UserDetails from "./userDetails/UserDetails";

export default function AccountSideBar({}) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex flex-col gap-10 sticky top-10 left-0 h-screen">
      <UserDetails />
      {pathname.includes("myOrders") && <OrdersLegend />}
      {pathname.includes("accountSettings") && <SettingsLegend />}
    </div>
  );
}
