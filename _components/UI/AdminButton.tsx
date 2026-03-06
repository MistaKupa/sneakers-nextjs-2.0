import { cn } from "@/app/_lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface AdminButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  purpose?: "link" | "button";
  href?: string;
  variant?: "edit" | "delete" | "checkMark";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  title?: string;
}

export default function AdminButton({
  children,
  type,
  purpose,
  href,
  onClick,
  disabled,
  title,
  variant,
  className,
}: AdminButtonProps) {
  const baseStyles =
    "p-1 bg-white border rounded shadow-sm hover:bg-slate-50 transition-all cursor-pointer";

  const variants = {
    edit: "text-blue-600",
    delete: "text-red-500",
    checkMark:
      "bg-green-500 text-white hover:bg-green-600 disabled:bg-slate-300 disabled:cursor-not-allowed",
  };

  const finalClass = cn(
    baseStyles,
    variants[variant],
    disabled && "cursor-not-allowed",
    className,
  );

  return (
    <>
      {purpose === "link" && (
        <Link className={finalClass} href={href}>
          {children}
        </Link>
      )}
      {purpose === "button" && (
        <button
          className={finalClass}
          onClick={onClick}
          disabled={disabled}
          title={title}
          type={type}
        >
          {children}
        </button>
      )}
    </>
  );
}
