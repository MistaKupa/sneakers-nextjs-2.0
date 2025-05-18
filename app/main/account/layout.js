import AccountMenu from "@/app/_components/_account/accountMenu/AccountMenu";
import AccountSideBar from "@/app/_components/_account/accountSideBar/AccountSideBar";
import OrdersLegend from "@/app/_components/_account/accountSideBar/ordersLegend/OrdersLegend";
import UserDetails from "@/app/_components/_account/accountSideBar/userDetails/UserDetails";
import Image from "next/image";

export default function AccountLayout({ children }) {
  return (
    <main className="w-full">
      <div className="w-full h-28">
        <div className="relative w-full h-full">
          <Image
            src="/images/bg-main-desktop-horizontal.png"
            alt="bg-image"
            fill
            className=""
          />
        </div>
      </div>
      <section className="relative mx-auto px-4 py-14 max-w-[1440px]">
        <AccountMenu />
        <div className="w-full lg:grid lg:grid-cols-[1fr_2.5fr]">
          <div className="hidden lg:block">
            <AccountSideBar />
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
