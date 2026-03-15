"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSadOutline } from "react-icons/io5";

export default function NotFound() {
  const pathname = usePathname();
  const productId = pathname.split("/")[3];

  return (
    <div className="place-self-center mt-40 flex flex-col items-center gap-5">
      <div className="flex flex-col items-center gap-2">
        <IoSadOutline size={30} className="text-newPrimary" />
        <h2 className="text-4xl font-semibold">Not Found</h2>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xl">
          Could not find requested sneaker with ID{" "}
          <span className="font-semibold">{productId}</span>.
        </p>
        <Link href="/" className="text-xl font-semibold text-newPrimary">
          Return Home
        </Link>
      </div>
    </div>
  );
}
