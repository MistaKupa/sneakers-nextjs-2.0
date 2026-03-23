import { cn } from "@/app/_lib/utils";
import { Review } from "@/types/review.types";
import { IoStarSharp } from "react-icons/io5";

export default function ReviewCard({ review }: { review: Review }) {
  const userInitials =
    review.user_name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase() ?? "?";

  const stars = Array.from({ length: review.stars });

  return (
    <div className={cn("flex flex-col gap-5 p-5 border rounded-xl")}>
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 flex justify-center items-center bg-newPrimary text-dark-200 text-xs rounded-full">
          {userInitials}
        </span>
        <span className="font-semibold">{review.user_name}</span>
      </div>

      <div className="flex gap-1">
        {stars.map((_, i) => (
          <IoStarSharp key={i} size={19} className="text-amber-400" />
        ))}
      </div>

      <p className="text-dark-400 break-words">{review.review}</p>
    </div>
  );
}
