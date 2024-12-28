// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChartLine, File } from "lucide-react";
import { NavLink } from "react-router-dom";
import { NavUser } from "./nav-user";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export function AppSidebar() {
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/",
      },
      {
        title: "Incomes",
        url: "/",
      },
      {
        title: "Expenses",
        url: "/",
      },
    ],
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <ChartLine className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Finance Tracker</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navMain.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url || ""}
                        className={({ isActive }) =>
                          `flex items-center gap-2 ${
                            isActive ? "text-blue-500" : ""
                          }`
                        }
                      >
                        <File />
                        {item.title}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
