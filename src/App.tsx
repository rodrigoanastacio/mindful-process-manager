import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "@/pages/Index";
import { ProcessTable } from "@/pages/ProcessTable";
import { LegalPartner } from "@/pages/LegalPartner";
import Departments from "@/pages/Departments";
import Login from "@/pages/Login";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const AppRoutes = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const publicRoutes = ['/login'];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!user && !isPublicRoute) {
      navigate('/login');
    }
  }, [user, navigate, location]);

  const handleLogout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logout realizado com sucesso!");
      navigate('/login');
    } catch (error) {
      console.error("Erro no logout:", error);
      toast.error("Não foi possível realizar o logout");
    }
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={
            user ? (
              <>
                <AppSidebar />
                <main className="flex-1 overflow-x-hidden">
                  <div className="container p-4 md:p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <SidebarTrigger className="md:hidden" />
                    </div>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/processos" element={<ProcessTable />} />
                      <Route
                        path="/parceiros-juridico"
                        element={<LegalPartner />}
                      />
                      <Route path="/departments" element={<Departments onLogout={handleLogout} />} />
                    </Routes>
                  </div>
                </main>
              </>
            ) : null
          } />
        </Routes>
      </div>
    </SidebarProvider>
  );
};

export default App;
