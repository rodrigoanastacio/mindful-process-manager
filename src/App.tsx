import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "@/pages/Index";
import { ProcessTable } from "@/pages/ProcessTable";
import Members from "@/pages/Members";
import Departments from "@/pages/Departments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gray-50">
            <AppSidebar />
            <main className="flex-1 overflow-x-hidden">
              <div className="container p-4 md:p-6">
                <div className="mb-6 flex items-center justify-between">
                  <SidebarTrigger className="md:hidden" />
                </div>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/processos" element={<ProcessTable />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="/departments" element={<Departments />} />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
