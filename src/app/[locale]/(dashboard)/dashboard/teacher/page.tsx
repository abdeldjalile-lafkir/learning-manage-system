"use client";
import React from "react";
import { Overview } from "@/components/dashboard/teacher/Overview";
//import { ManageCources } from "@/components/dashboard/teacher/ManageCourses";
//import { ManageChapters } from "@/components/dashboard/teacher/ManageChapters";
import { ManageLessons } from "@/components/dashboard/teacher/ManageLessons";
import { notFound, useSearchParams } from "next/navigation";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "overview";

  const renderedTab = () => {
    switch (tab) {
      case "overview":
        return <Overview />;
      case "lessons":
        return <ManageLessons />;
      default:
        return notFound();
    }
  };

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-t-2xl border flex flex-col gap-2 flex-1 w-full h-screen scrollbar-hide overflow-y-auto">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        <div className="flex flex-col gap-4 my-4">{renderedTab()}</div>
      </div>
    </div>
  );
}
