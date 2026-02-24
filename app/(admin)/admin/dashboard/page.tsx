import LastOrders from "../../../../_components/_admin/LastOrders";
import SalesGraph from "../../../../_components/_admin/SalesGraph";
import StatCards from "../../../../_components/_admin/StatCards";
import SummaryPie from "../../../../_components/_admin/SummaryPie";

export default function Dashboard() {
  return (
    <div className="w-full flex flex-col gap-10">
      <StatCards />
      <section className="grid grid-cols-4 gap-5">
        <div className="bg-slate-50 drop-shadow rounded-sm w-full col-span-3">
          <SalesGraph />
        </div>
        <div className="bg-slate-50 drop-shadow rounded-sm w-full">
          <SummaryPie />
        </div>
      </section>
      <LastOrders />
    </div>
  );
}
