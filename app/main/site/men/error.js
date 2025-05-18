"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";
import { IoSadOutline } from "react-icons/io5";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-24">
      <IoSadOutline size={30} className="text-newPrimary" />
      <h2>Something went wrong while running for your men senakers!</h2>
      <div className="flex gap-5">
        <button
          className="bg-newPrimary text-newWhite px-2 py-1 rounded-md hover:bg-newPrimaryHover transition-all duration-300 font-medium"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-dark-400 text-dark-100 px-2 py-1 rounded-md hover:bg-dark-500 transition-all duration-300 font-medium"
        >
          Return
        </Link>
      </div>
    </div>
  );
}
