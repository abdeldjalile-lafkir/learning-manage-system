import React from "react";
import { Overview } from "@/components/dashboard/teacher/Overview";

export default function Dashboard() {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-t-2xl border flex flex-col gap-2 flex-1 w-full h-screen scrollbar-hide overflow-y-auto">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        <div className="flex flex-col gap-4 mt-4">
          {/* Teacher dashboard content goes here */}
          <div className="p-4 border rounded-lg">Teacher Panel 1</div>
          <Overview />
          <div className="p-4 border rounded-lg">Teacher Panel 3</div>
        </div>
      </div>
    </div>
  );
}
