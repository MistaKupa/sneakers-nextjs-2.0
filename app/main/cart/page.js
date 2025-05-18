import Image from "next/image";
import CartSteps from "./cartSteps/CartSteps";

export default function Cart() {
  return (
    <main className="mx-auto w-full">
      <div className="relative w-full h-32">
        <div className="absolute -z-10 w-full h-32">
          <Image
            src="/images/bg-main-desktop-horizontal.png"
            alt="Background Image"
            fill
          />
        </div>
      </div>
      <CartSteps />
    </main>
  );
}
