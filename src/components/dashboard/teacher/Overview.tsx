import BarChart from "@/components/dashboard/teacher/blocks/BarChart";
import AreaChart from "@/components/dashboard/teacher/blocks/AreaChart";
import DonutChart from "@/components/dashboard/teacher/blocks/DonutChart";

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <BarChart />
      <AreaChart />
      <DonutChart />
    </div>
  );
}
