import { cn } from "@/app/_lib/utils";

export default function ErrorSpan({ error }: { error?: string }) {
  const displayMessage = error || "Invalid value";

  return (
    <span
      className={cn(
        "absolute -left-0 -bottom-6 z-10",
        "px-1",
        "text-red-500 text-xs whitespace-nowrap",
        "bg-slate-50 shadow-sm",
        "border border-red-200 rounded",
      )}
    >
      {displayMessage}
    </span>
  );
}
