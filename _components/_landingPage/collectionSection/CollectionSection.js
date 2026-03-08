"use client";

import useSectionColorChange from "@/hooks/useSectionColorChange";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function CollectionSection({ collections }) {
  const collectionSectionRef = useRef(null);

  return (
    <section
      ref={collectionSectionRef}
      id="collections"
      className="white-section relative w-full min-h-screen xl:h-screen bg-white z-20 py-24 px-5 md:px-16 xl:px-16 xl:py-0"
    >
      <div className="max-w-[1440px] h-full flex flex-col justify-center gap-16  mx-auto">
        <div className="flex justify-between">
          <h2 className="uppercase text-2xl font-semibold ">
            Shop By Collection
          </h2>
          <div className="">
            <Link
              className="uppercase font-semibold text-sm border border-dark-500 rounded-full px-2 py-2"
              href=""
            >
              View All
            </Link>
          </div>
        </div>

        <div className="w-full grid xl:grid-cols-3 gap-24 lg:gap-32 xl:gap-5 items-center">
          {collections.map((collection) => (
            <div key={collection.id} className="flex flex-col gap-5">
              <Link
                className="block w-full h-full"
                href={`/main/site/collections/${collection.id}/${collection.name}`}
              >
                <div className="group relative aspect-[6/7] overflow-hidden">
                  <Image
                    src={collection.image_url}
                    alt="sneakers"
                    fill
                    className="rounded-md group-hover:scale-110 transition-all duration-700 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-dark-100 text-3xl font-bold bg-dark-500 bg-opacity-40 lg:bg-opacity-0 lg:text-opacity-0 lg:group-hover:bg-opacity-20 lg:group-hover:text-opacity-100 transition-all duration-500">
                    <h5>{collection.name}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
