"use client";
import { cn } from "@/app/_lib/utils";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = "left",
  className = "",
  ...props
}) {
  const baseStyles =
    "w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-bold transition-all duration-200 focus:outline-none";

  const variants = {
    primary: "bg-newPrimary text-white hover:bg-opacity-80",
    secondary: "bg-gray-200 text-dark-500 hover:bg-gray-300",
    ghost: "bg-transparent text-dark-500 hover:text-newPrimary",
    quantity: "text-newPrimary",
  };

  const finalClass = cn(
    baseStyles,
    variants[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  return (
    <button
      className={finalClass}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" size={20} />}
      {!loading && Icon && iconPosition === "left" && <Icon size={20} />}
      {children}
      {!loading && Icon && iconPosition === "right" && <Icon size={20} />}
    </button>
  );
}
