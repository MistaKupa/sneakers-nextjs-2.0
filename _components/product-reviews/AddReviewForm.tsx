"use client";

import { ReviewInsert } from "@/types/review.types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ErrorSpan from "../_admin/ErrorSpan";
import StarComponent from "../starComponent/StarComponent";
import { ProductId } from "@/types/product.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProductReview } from "@/app/_lib/data-service-client";
import toast from "react-hot-toast";
import { cn } from "@/app/_lib/utils";

export default function AddReviewForm({
  productId,
  onClose,
}: {
  productId: ProductId;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: uploadProductReview,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      toast.success("Your review was successfully added!");
      onClose();
    },

    onError: () => {
      toast.error("Your review could not be added!");
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ReviewInsert>({ mode: "onChange" });

  const onAddReview: SubmitHandler<ReviewInsert> = (data) => {
    mutate({ newReview: { ...data, sneaker_id: productId } });
  };

  return (
    <form onSubmit={handleSubmit(onAddReview)} className="flex flex-col gap-8">
      {/* NAME */}
      <div
        className={cn(
          "relative",
          "flex flex-col items-center gap-2",
          "border-b pb-8",
          "md:flex-row md:justify-between md:items-start md:gap-0",
        )}
      >
        <label htmlFor="name" className="font-medium">
          What is your name?
        </label>
        <div className="relative">
          <input
            id="name"
            type="text"
            {...register("user_name", {
              required: true,
              minLength: {
                value: 1,
                message: "Name needs to have at least 1 character.",
              },
              maxLength: {
                value: 30,
                message: "Name can have maximum 30 characters.",
              },
            })}
            className="border rounded-md"
          />
          {errors.user_name && <ErrorSpan error={errors.user_name.message} />}
        </div>
      </div>

      {/* RATING */}
      <div
        className={cn(
          "relative",
          "flex flex-col items-center gap-2",
          "border-b pb-8",
          "md:flex-row md:justify-between md:items-start md:gap-0",
        )}
      >
        <label htmlFor="stars" className="font-medium">
          What is your rating?
        </label>
        <div className="relative">
          <Controller
            name="stars"
            control={control}
            rules={{ required: "Please select a rating" }}
            render={({ field }) => (
              <StarComponent value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.stars && <ErrorSpan error={errors.stars.message} />}
        </div>
      </div>

      {/* REVIEW */}
      <div className={cn("relative", "flex flex-col gap-2")}>
        <label
          htmlFor="review"
          className="font-medium self-center md:self-start"
        >
          Your review
        </label>
        <textarea
          id="review"
          rows={6}
          maxLength={200}
          {...register("review", {
            required: true,
            minLength: {
              value: 2,
              message: "Review needs to have at least 2 characters.",
            },
            maxLength: {
              value: 200,
              message: "Review can have maximum of 200 characters.",
            },
          })}
          className="border rounded-lg"
        />
        {errors.review && <ErrorSpan error={errors.review.message} />}
      </div>

      <button
        type="submit"
        className={cn(
          "self-center px-16 py-3",
          "bg-newPrimary text-dark-200",
          "font-medium rounded-lg",

          "hover:bg-newPrimaryGradient hover:scale-105",
          "transition-all duration-300",

          "active:scale-95",

          "disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-newPrimary disabled:opacity-70",
        )}
        disabled={!isDirty || isPending}
      >
        {isPending ? "Adding review..." : "Add"}
      </button>
    </form>
  );
}
