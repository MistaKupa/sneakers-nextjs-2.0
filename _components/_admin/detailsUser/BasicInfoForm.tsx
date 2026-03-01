import { User, UserBasicInfo, UserId } from "@/types/user.types";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorSpan from "../ErrorSpan";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserClient } from "@/app/_lib/admin-service-client";
import toast from "react-hot-toast";
import { cn } from "@/app/_lib/utils";
import { useEffect } from "react";

export default function BasicInfoForm({
  data,
  userId,
}: {
  data: User;
  userId: UserId;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserClient,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      toast.success("User data successfully updated");
    },

    onError: () => {
      toast.error("User data could not be updated");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UserBasicInfo>({
    mode: "onChange",
    defaultValues: {
      display_name: data.display_name,
      user_phone: data.user_phone,
      email: data.email,
    },
  });

  const handleBasicInfoChange: SubmitHandler<UserBasicInfo> = (formData) => {
    mutate({
      id: userId,
      changes: formData,
    });
  };

  useEffect(() => {
    reset({
      display_name: data.display_name,
      user_phone: data.user_phone,
      email: data.email,
    });
  }, [data, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleBasicInfoChange)}
      className="flex flex-col gap-8 bg-slate-50 w-3/5 rounded drop-shadow"
    >
      {/* USER PICTURE*/}
      <div className="relative w-full h-full">
        <Image
          src={
            data.avatar_url
              ? data.avatar_url
              : "/images/default-profile-detail-admin-picture.png"
          }
          alt="User profile picture"
          fill
          className="object-cover rounded-t"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* BASIC INFO FORM */}
      <div
        className={cn(
          "flex flex-col h-full justify-between px-10 pb-8",
          isPending && "opacity-70 cursor-wait",
        )}
      >
        {/* DISPLAY NAME HEADER*/}
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">{data.display_name}</h1>

          <span className="text-slate-400 font-light break-words text-right">
            {userId}
          </span>
        </div>

        {/* DISPLAY NAME / PHONE*/}
        <div className="flex flex-col gap-12">
          <div className="flex justify-between gap-16">
            <div className="relative w-full">
              <input
                type="text"
                {...register("display_name", {
                  required: true,
                  minLength: {
                    value: 2,
                    message: "Display name must have at least 2 letters",
                  },
                })}
                className="w-full border-b bg-slate-50 focus:outline-none"
              />
              {errors.display_name && (
                <ErrorSpan error={errors.display_name.message} />
              )}
            </div>

            <div className="relative w-full">
              <input
                type="text"
                {...register("user_phone", {
                  required: true,
                  minLength: 12,
                })}
                className="w-full border-b bg-slate-50 focus:outline-none"
              />
              {errors.user_phone && (
                <ErrorSpan error={errors.user_phone.message} />
              )}
            </div>
          </div>

          {/* USER EMAIL*/}
          <div className="relative w-full border-b">
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="bg-slate-50 focus:outline-none"
            />
            {errors.email && <ErrorSpan />}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-gradient-to-r from-newPrimary to-newPrimaryGradient px-10 py-1.5 rounded-full font-semibold text-slate-50 disabled:cursor-not-allowed"
            disabled={!isDirty}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
