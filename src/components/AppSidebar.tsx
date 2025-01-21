import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  Home,
  FolderKanban,
  Building2,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Processos",
    icon: FileText,
    url: "/processos",
  },
];

const gerenciarItems = [
  {
    title: "Advogados",
    icon: Users,
    url: "/parceiros-juridico",
  },
  {
    title: "Departamentos",
    icon: Building2,
    url: "/departments",
  },
];

export function AppSidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2 px-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">Mindful Process</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="">
        <SidebarMenu className="flex justify-between h-full">
          <div>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <Link to={item.url} className="flex items-center p-2">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Gerenciar</SidebarGroupLabel>
              <SidebarGroupContent>
                {gerenciarItems.map((item) => (
                  <SidebarMenuItem key={item.url} className="">
                    <Link to={item.url} className="flex items-center p-2">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          </div>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onLogout} className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
