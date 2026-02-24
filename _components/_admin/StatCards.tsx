import { cn } from "@/app/_lib/utils";

export default function StatCards() {
  return (
    // CONTAINER
    <section
      className={cn("w-full", "flex justify-between gap-5", "text-slate-50")}
    >
      {/* ALL EARNINGS */}
      <div
        className={cn(
          "flex-1 flex flex-col",
          "bg-gradient-to-r from-newPrimary to-newPrimaryGradient",
          "rounded-sm",
          "drop-shadow",
        )}
      >
        <div
          className={cn(
            "flex justify-between items-center",
            "border-b-2 border-slate-50",
            "p-5",
          )}
        >
          <div className={cn("flex flex-col")}>
            <span className="text-lg font-semibold">€10,000</span>
            <span>All Earnings</span>
          </div>
          <div>Skusime Graf</div>
        </div>
        <div className={cn("px-5 py-2")}>
          <span>Update: 2.15 am</span>
        </div>
      </div>

      {/* TOTAL ORDERS */}
      <div
        className={cn(
          "flex-1 flex flex-col",
          "bg-gradient-to-r from-emerald-500 to-emerald-400",
          "rounded-sm",
          "drop-shadow",
        )}
      >
        <div
          className={cn(
            "flex justify-between items-center",
            "border-b-2 border-slate-50",
            "p-5",
          )}
        >
          <div className={cn("flex flex-col")}>
            <span className="text-lg font-semibold">2,000</span>
            <span>Total Orders</span>
          </div>
          <div>Skusime Graf</div>
        </div>
        <div className={cn("px-5 py-2")}>
          <span>Update: 2.15 am</span>
        </div>
      </div>

      {/* TOTAL USERS */}
      <div
        className={cn(
          "flex-1 flex flex-col",
          "bg-gradient-to-r from-red-500 to-red-400",
          "rounded-sm",
          "drop-shadow",
        )}
      >
        <div
          className={cn(
            "flex justify-between items-center",
            "border-b-2 border-slate-50",
            "p-5",
          )}
        >
          <div className={cn("flex flex-col")}>
            <span className="text-lg font-semibold">100</span>
            <span>Total Users</span>
          </div>
          <div>Skusime Graf</div>
        </div>
        <div className={cn("px-5 py-2")}>
          <span>Update: 2.15 am</span>
        </div>
      </div>

      {/* PRODUCTS SOLD */}
      <div
        className={cn(
          "flex-1 flex flex-col",
          "bg-gradient-to-r from-blue-500 to-blue-400",
          "rounded-sm",
          "drop-shadow",
        )}
      >
        <div
          className={cn(
            "flex justify-between items-center",
            "border-b-2 border-slate-50",
            "p-5",
          )}
        >
          <div className={cn("flex flex-col")}>
            <span className="text-lg font-semibold">1,500</span>
            <span>Products Sold</span>
          </div>
          <div>Skusime Graf</div>
        </div>
        <div className={cn("px-5 py-2")}>
          <span>Update: 2.15 am</span>
        </div>
      </div>
    </section>
  );
}
