import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(`Erro de login: ${error.message}`);
        return;
      }

      toast.success("Login realizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Não foi possível realizar o login");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Mindful Process Manager
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Gerencie seus processos de forma inteligente e eficiente
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Senha
                  </Label>
                  <button
                    type="button"
                    className="text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <Button type="submit" className="w-full py-6 text-base">
              Entrar
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-500">
                Não tem uma conta?{" "}
                <button
                  type="button"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Registre-se
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Image with Overlay */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-primary/20 z-10" />
        <img
          src="/lovable-uploads/19ad9c7a-5f73-4b43-bd08-7f1c1552576c.png"
          alt="Login background"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Login;