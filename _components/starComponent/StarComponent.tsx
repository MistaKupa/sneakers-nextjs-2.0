"use client";

import { cn } from "@/app/_lib/utils";
import { useState } from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";

interface StarComponentProps {
  value: number;
  onChange: (value: number) => void;
}

const STARS_DEFAULT = 5;

export default function StarComponent({ value, onChange }: StarComponentProps) {
  // const [rating, setRating] = useState(1);
  const [tempRating, setTempRating] = useState(0);

  let stars = Array.from({ length: STARS_DEFAULT });

  return (
    <div className="flex gap-1" onMouseLeave={() => setTempRating(0)}>
      {stars.map((_, i) => (
        <div
          key={i}
          onClick={() => onChange(i + 1)}
          onMouseEnter={() => setTempRating(i + 1)}
          className="text-amber-400"
        >
          {value > i || tempRating > i ? (
            <IoStarSharp size={35} />
          ) : (
            <IoStarOutline size={35} />
          )}
        </div>
      ))}
    </div>
  );
}
