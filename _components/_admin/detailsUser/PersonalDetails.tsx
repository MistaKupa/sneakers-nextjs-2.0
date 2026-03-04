import { UserId, UserPersonalDetails } from "@/types/user.types";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorSpan from "../ErrorSpan";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserClient } from "@/app/_lib/admin-service-client";
import toast from "react-hot-toast";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function PersonalDetails({
  data,
  userId,
}: {
  data: UserPersonalDetails;
  userId: UserId;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserClient,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      toast.success("Personal Details were succesfully updated");
      setIsEditing(false);
    },

    onError: () => {
      toast.error("Personal Details could not be updated");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { display_name: data.display_name },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleNameChange: SubmitHandler<
    Pick<UserPersonalDetails, "display_name">
  > = (formData) => {
    mutate({
      id: userId,
      changes: formData,
    });
  };

  return (
    <div className="w-full xl:w-11/12 h-full bg-slate-50 rounded drop-shadow flex flex-col gap-8 pb-10">
      <h2 className="text-xl font-bold border-b px-8 xl:px-16 py-5">
        Personal Details
      </h2>
      <div className="px-8 xl:px-16 flex flex-col gap-12 h-full ">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Birth date</h3>
            <span className="capitalize">{data.birth_date}</span>
          </div>
          <button className="hidden bg-gradient-to-r from-newPrimary to-newPrimaryGradient px-6 py-1 text-slate-50 font-semibold rounded-full">
            Edit
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleNameChange)}
          className="flex items-center justify-between"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Full name</h3>
            <div className="relative">
              {isEditing ? (
                <>
                  <input
                    className="capitalize bg-slate-50 border"
                    type="text"
                    {...register("display_name", {
                      required: true,
                      minLength: {
                        value: 2,
                        message: "Display name must be at least 2 letters long",
                      },
                    })}
                  />
                  {errors.display_name && (
                    <ErrorSpan error={errors.display_name.message} />
                  )}
                </>
              ) : (
                <span className="capitalize">{data.display_name}</span>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="flex gap-2 items-center">
              <button className="bg-gradient-to-r from-newPrimary to-newPrimaryGradient px-6 py-1 text-slate-50 font-semibold rounded-full disabled:cursor-not-allowed">
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
                className="bg-gradient-to-r from-newPrimary to-newPrimaryGradient text-slate-50 rounded-full p-1"
              >
                <IoClose size={24} />
              </button>
              <button></button>
            </div>
          ) : (
            <button
              type="button"
              className="bg-gradient-to-r from-newPrimary to-newPrimaryGradient px-6 py-1 text-slate-50 font-semibold rounded-full disabled:cursor-not-allowed"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
