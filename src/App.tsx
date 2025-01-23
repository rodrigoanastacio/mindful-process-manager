import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "@/pages/Index";
import { Process } from "@/pages/Process";
import { LegalPartner } from "@/pages/LegalPartner";
import Departments from "@/pages/Departments";
import Login from "@/pages/Login";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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
  const [loading, setLoading] = useState(true);

  const checkUserSession = useCallback(async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    } catch (error) {
      console.error("Error checking user session:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUserSession();

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
    });

    return () => {
      authListener.data?.subscription.unsubscribe();
    };
  }, [checkUserSession]);

  useEffect(() => {
    const publicRoutes = ["/login"];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!loading && !user && !isPublicRoute) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate, location, loading]);

  const handleLogout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logout realizado com sucesso!",
      });
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Erro no logout:", error);
      toast({
        title: "Erro no logout",
        description: "Não foi possível realizar o logout",
        variant: "destructive",
      });
    }
  }, [navigate]);

  if (loading) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              user ? (
                <>
                  <AppSidebar onLogout={handleLogout} />
                  <main className="flex-1 overflow-x-hidden">
                    <div className="container p-4 md:p-6">
                      <div className="mb-6 flex items-center justify-between">
                        <SidebarTrigger className="md:hidden" />
                      </div>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/processos" element={<Process />} />
                        <Route
                          path="/parceiros-juridico"
                          element={<LegalPartner />}
                        />
                        <Route path="/departments" element={<Departments />} />
                      </Routes>
                    </div>
                  </main>
                </>
              ) : (
                <Login />
              )
            }
          />
        </Routes>
      </div>
    </SidebarProvider>
  );
};

export default App;
