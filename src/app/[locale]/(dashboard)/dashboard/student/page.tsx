export default function Dashboard() {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-t-2xl border flex flex-col gap-2 flex-1 w-full h-screen scrollbar-hide overflow-y-auto">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <div className="flex flex-col gap-4 mt-4">
          {/* Student dashboard content goes here */}
          <div className="p-4 border rounded-lg">Student Panel 1</div>
          <div className="p-4 border rounded-lg">Student Panel 2</div>
          <div className="p-4 border rounded-lg">Student Panel 3</div>
        </div>
      </div>
    </div>
  );
}
