import BarChart from "@/components/dashboard/teacher/blocks/BarChart";
import AreaChart from "@/components/dashboard/teacher/blocks/AreaChart";
import DonutChart from "@/components/dashboard/teacher/blocks/DonutChart";
import Alert from "@/components/dashboard/teacher/blocks/Alert";
import CommunitySupportBlock from "@/components/dashboard/teacher/blocks/RecentActivityBlock";
import StatsSection from "@/components/dashboard/teacher/blocks/StatesWithInfo";
import { CirclePlus } from "lucide-react";

export function Overview() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between my-8">
        <Alert />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <BarChart />
        <AreaChart />
        <DonutChart />
      </div>
      <div className="flex items-start gap-x-4 justify-between my-8">
        <div className="w-full flex-1 flex flex-col items-center justify-center gap-y-4">
          <StatsSection />
          <div className="w-full h-41 flex items-center justify-center py-full border rounded-lg">
            <CirclePlus size={40} className="text-foreground" />
          </div>
        </div>
        <div className="flex-1">
          <CommunitySupportBlock />
        </div>
      </div>
    </div>
  );
}
