import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Key } from "lucide-react";

export const ApiKeyForm = () => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma chave de API válida",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem("jusbrasil_api_key", apiKey);
    toast({
      title: "Sucesso",
      description: "Chave de API salva com sucesso",
    });
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2 text-lg font-semibold">
          <Key className="h-5 w-5" />
          <h2>Configurar API JusBrasil</h2>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Insira sua chave de API do JusBrasil para consultar processos.
          </p>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Insira sua chave de API"
            className="w-full"
          />
        </div>

        <Button type="submit" className="w-full">
          Salvar Chave
        </Button>
      </form>
    </Card>
  );
};