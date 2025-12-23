import { SideBar } from "@/components/dashboard/SideBar";
import { Header } from "@/components/dashboard/Header";
import { cn } from "@/lib/cn";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-1 flex-col items-center w-screen h-screen">
      <Header />
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row w-full flex-1 mx-auto overflow-hidden"
        )}
      >
        <SideBar />
        {children}
      </div>
    </main>
  );
}
