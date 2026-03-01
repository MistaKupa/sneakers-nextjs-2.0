"use client";

import { updateUserClient } from "@/app/_lib/admin-service-client";
import { cn } from "@/app/_lib/utils";
import { UserId, UserIdentityAccess } from "@/types/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoChevronDownOutline } from "react-icons/io5";

export default function IdentityAccess({
  data,
  userId,
}: {
  data: UserIdentityAccess;
  userId: UserId;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserClient,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });

      toast.success("User data updated successfully");
    },

    onError: () => {
      toast.error("User data could not be updated");
    },
  });

  const {
    register: registerGender,
    handleSubmit: handleSubmitGender,
    control: controlGender,
    reset: resetGender,
    formState: { isDirty: isDirtyGender, errors: errorsGender },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      gender: data.gender,
    },
  });

  const {
    register: registerRole,
    handleSubmit: handleSubmitRole,
    control: controlRole,
    reset: resetRole,
    formState: { isDirty: isDirtyRole, errors: errorsRole },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      role: data.role,
    },
  });

  const [isGenderOpen, setIsGenderOpen] = useState<boolean>(false);
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false);

  const submitGender: SubmitHandler<Pick<UserIdentityAccess, "gender">> = (
    formData,
  ) => {
    mutate({
      id: userId,
      changes: formData,
    });
  };

  const submitRole: SubmitHandler<Pick<UserIdentityAccess, "role">> = (
    formData,
  ) => {
    mutate({
      id: userId,
      changes: formData,
    });
  };

  useEffect(() => {
    resetGender({ gender: data.gender });
    resetRole({ role: data.role });
  }, [data, resetGender, resetRole]);

  return (
    <div className="w-11/12 h-full bg-slate-50 rounded drop-shadow flex flex-col gap-8">
      <h2 className="text-xl font-bold border-b px-16 py-5">
        Identity & Access
      </h2>
      <div className="px-16 flex flex-col gap-12 h-full">
        {/* GENDER FORM */}
        <form
          onSubmit={handleSubmitGender(submitGender)}
          className={cn("flex items-center justify-between")}
        >
          <Controller
            control={controlGender}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Gender</h3>

                <div className="relative">
                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsGenderOpen(!isGenderOpen);
                    }}
                  >
                    <span className="capitalize">{value}</span>
                    <button>
                      <IoChevronDownOutline size={12} />
                    </button>
                  </div>

                  {isGenderOpen && (
                    <div className="absolute z-10 flex flex-col bg-slate-50 drop-shadow border rounded-b">
                      <div
                        className={cn(
                          "p-1",
                          value === "male" && "bg-newPrimary text-slate-50",
                        )}
                        onClick={(e) => {
                          onChange("male");
                          setIsGenderOpen(false);
                        }}
                      >
                        Male
                      </div>
                      <div
                        className={cn(
                          "p-1",
                          value === "female" && "bg-newPrimary text-slate-50",
                        )}
                        onClick={(e) => {
                          onChange("female");
                          setIsGenderOpen(false);
                        }}
                      >
                        Female
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          />

          <button
            className="bg-gradient-to-r from-newPrimary to-newPrimaryGradient px-6 py-1 text-slate-50 font-semibold rounded-full disabled:cursor-not-allowed"
            disabled={!isDirtyGender}
          >
            Edit
          </button>
        </form>

        {/* ROLE FORM */}
        <form
          onSubmit={handleSubmitRole(submitRole)}
          className={cn("flex items-center justify-between")}
        >
          <Controller
            control={controlRole}
            name="role"
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Role</h3>
                <div className="relative">
                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRoleOpen(!isRoleOpen);
                    }}
                  >
                    <span className="capitalize">{value}</span>
                    <button>
                      <IoChevronDownOutline size={12} />
                    </button>
                  </div>

                  {isRoleOpen && (
                    <div className="absolute z-10 flex flex-col bg-slate-50 drop-shadow border rounded-b">
                      <div
                        className={cn(
                          "p-1",
                          value === "user" && "bg-newPrimary text-slate-50",
                        )}
                        onClick={(e) => {
                          onChange("user");
                          setIsRoleOpen(false);
                        }}
                      >
                        User
                      </div>

                      <div
                        className={cn(
                          "p-1",
                          value === "admin" && "bg-newPrimary text-slate-50",
                        )}
                        onClick={(e) => {
                          onChange("admin");
                          setIsRoleOpen(false);
                        }}
                      >
                        Admin
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          />

          <button
            className="bg-gradient-to-r from-newPrimary to-newPrimaryGradient px-6 py-1 text-slate-50 font-semibold rounded-full disabled:cursor-not-allowed"
            disabled={!isDirtyRole}
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}
