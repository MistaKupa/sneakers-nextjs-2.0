"use client";

import { cn } from "@/app/_lib/utils";
import { useState } from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";

const STARS_DEFAULT = 5;

export default function StarComponent() {
  const [rating, setRating] = useState(1);
  const [tempRating, setTempRating] = useState(0);

  console.log("rat:", rating);
  console.log("temp:", tempRating);

  let stars = Array(STARS_DEFAULT).fill("STAR");

  return (
    <div className="flex gap-1" onMouseLeave={() => setTempRating(0)}>
      {stars.map((star, i) => (
        <div
          key={i}
          onClick={() => setRating(i + 1)}
          onMouseEnter={() => setTempRating(i + 1)}
          className="text-amber-400"
        >
          {rating > i || tempRating > i ? (
            <IoStarSharp size={20} />
          ) : (
            <IoStarOutline size={20} />
          )}
        </div>
      ))}
    </div>
  );
}
