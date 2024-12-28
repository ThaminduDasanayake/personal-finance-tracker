import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <AppBreadcrumb />
          </div>
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-auto ">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
