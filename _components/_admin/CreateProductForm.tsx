"use client";

import { cn } from "@/app/_lib/utils";
import { ProductInsertFormValues } from "@/types/product.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ErrorSpan from "./ErrorSpan";
import { createNewProductClient } from "@/app/_lib/admin-service-client";

export default function CreateProductForm() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: createNewProductClient,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("New product successfully created!");
      reset();
    },
    onError: () => {
      toast.error("New product could not be created!");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<ProductInsertFormValues>({
    mode: "onChange",
  });

  const handleProductUpdate: SubmitHandler<ProductInsertFormValues> = (
    formData,
  ) => {
    const { imageInput, ...newProductData } = formData;

    const files = imageInput ? Array.from(imageInput) : [];

    if (files.length === 0) {
      return toast.error("At least one image required!");
    }

    mutate({
      newProductForm: newProductData,
      imageFiles: files,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleProductUpdate)}
      className={cn(
        "flex flex-col gap-8 items-center",
        isPending && "opacity-70 cursor-wait",
      )}
    >
      <div className="relative w-full flex flex-col">
        <label htmlFor="title" className="font-semibold">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title", {
            required: true,
            minLength: {
              value: 3,
              message: "Title needs to have at least 3 symbols",
            },
          })}
          className={cn(
            "py-1 px-2",
            "border border-slate-300 rounded",
            "focus:outline-newPrimary",
          )}
        />
        {errors.title && <ErrorSpan error={errors.title.message} />}
      </div>

      <div className="relative w-full flex flex-col">
        <label htmlFor="description" className="font-semibold">
          Description
        </label>
        <textarea
          id="description"
          rows={6}
          {...register("description", {
            required: true,
            minLength: {
              value: 10,
              message: "Description must be at least 10 symbols long",
            },
          })}
          className={cn(
            "py-1 px-2",
            "border border-slate-300 rounded",
            "focus:outline-newPrimary",
          )}
        />
        {errors.description && <ErrorSpan error={errors.description.message} />}
      </div>

      <div className="relative w-full flex flex-col">
        <label htmlFor="details" className="font-semibold">
          Details
        </label>
        <textarea
          id="details"
          rows={6}
          {...register("details", {
            required: true,
            minLength: {
              value: 10,
              message: "Details must be at least 10 symbols long",
            },
          })}
          className={cn(
            "py-1 px-2",
            "border border-slate-300 rounded",
            "focus:outline-newPrimary",
          )}
        />
        {errors.details && <ErrorSpan error={errors.details.message} />}
      </div>

      <div className="relative w-full flex flex-col">
        <label htmlFor="category" className="font-semibold">
          Category
        </label>
        <input
          id="category"
          {...register("category", {
            required: true,
            minLength: {
              value: 1,
              message: "Category must be at least 1 symbols long",
            },
          })}
          className={cn(
            "py-1 px-2",
            "border border-slate-300 rounded",
            "focus:outline-newPrimary",
          )}
        />
      </div>

      <div className="relative w-full flex flex-col">
        <label htmlFor="price" className="font-semibold">
          Price
        </label>
        <input
          id="category"
          type="number"
          step="0.01"
          {...register("price", {
            required: true,
            valueAsNumber: true,
            min: { value: 10, message: "Price needs to be at least 10." },
          })}
          className={cn(
            "py-1 px-2",
            "border border-slate-300 rounded",
            "focus:outline-newPrimary",
          )}
        />
        {errors.price && <ErrorSpan error={errors.price.message} />}
      </div>

      <div className="relative w-full flex flex-col">
        <label htmlFor="discount" className="font-semibold">
          Discount
        </label>
        <input
          id="discount"
          type="number"
          {...register("discount", {
            required: true,
            valueAsNumber: true,
            min: { value: 0, message: "Discount cant be less than 0." },
            max: { value: 100, message: "Discount cant be more than 100." },
          })}
          className={cn(
            "py-1 px-2",
            "border border-slate-300 rounded",
            "focus:outline-newPrimary",
          )}
        />
        {errors.discount && <ErrorSpan error={errors.discount.message} />}
      </div>

      <div className="relative w-full flex flex-col">
        <label htmlFor="stock" className="font-semibold">
          Stock
        </label>
        <input
          id="stock"
          type="number"
          {...register("stock", {
            required: true,
            valueAsNumber: true,
            min: { value: 0, message: "Quantity cant be less than 0" },
            max: { value: 30, message: "Quantity cant be more than 30" },
          })}
          className={cn(
            "py-1 px-2",
            "border border-slate-300 rounded",
            "focus:outline-newPrimary",
          )}
        />
        {errors.stock && <ErrorSpan error={errors.stock.message} />}
      </div>

      <div>
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("imageInput", { required: true })}
          className="block w-full text-sm text-dark-400"
        />
        {errors.imageInput && <ErrorSpan error="At least one image required" />}
      </div>

      <button
        className="bg-gradient-to-r from-newPrimary to-newPrimaryGradient px-10 py-1.5 rounded-full font-semibold text-slate-50 disabled:cursor-not-allowed"
        disabled={!isDirty}
      >
        {isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
