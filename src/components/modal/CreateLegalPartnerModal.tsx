import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import InputMask from "react-input-mask";

interface CreateLegalPartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateLegalPartnerModal = ({
  open,
  onOpenChange,
}: CreateLegalPartnerModalProps) => {
  const queryClient = useQueryClient();
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberPhone, setNewMemberPhone] = useState("");
  const [newMemberEspecializacao, setNewMemberEspecializacao] = useState("");

  // Buscar departamentos
  const { data: departamentos = [], isLoading: isDepartamentosLoading } = useQuery({
    queryKey: ["departamentos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("departamentos")
        .select("nome")
        .order("nome");

      if (error) {
        console.error("Erro ao buscar departamentos:", error);
        throw error;
      }

      return data.map((dept) => dept.nome);
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: {
      nome_completo: string;
      email: string;
      telefone: string;
      especializacao: string;
    }) => {
      // First check if we're authenticated
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.access_token) {
        throw new Error("Você precisa estar autenticado para criar advogados");
      }

      // Create the lawyer
      const { data: newLawyer, error } = await supabase
        .from("advogados_parceiros")
        .insert([data])
        .select("*")
        .single();

      if (error) {
        if (error.code === "42501") {
          throw new Error("Você não tem permissão para criar advogados");
        }
        throw error;
      }

      return newLawyer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lawyers"] });
      toast.success("Advogado cadastrado com sucesso!");
      onOpenChange(false);
      resetForm();
    },
    onError: (error: Error) => {
      console.error("Error creating lawyer:", error);
      toast.error(error.message || "Erro ao cadastrar advogado");
    },
  });

  const resetForm = () => {
    setNewMemberName("");
    setNewMemberEmail("");
    setNewMemberPhone("");
    setNewMemberEspecializacao("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim() || !newMemberEspecializacao) {
      toast.error("Nome, email e especialização são obrigatórios");
      return;
    }

    createMutation.mutate({
      nome_completo: newMemberName,
      email: newMemberEmail,
      telefone: newMemberPhone,
      especializacao: newMemberEspecializacao,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-screen flex flex-col p-0 gap-0 bg-gray-50">
        <DialogTitle className="sr-only">Adicionar novo advogado</DialogTitle>
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-semibold">Adicionar novo advogado</h2>
          <p className="text-sm text-gray-500 mt-1">
            Informe os dados para cadastrar um novo advogado parceiro
          </p>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit}>
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newMemberName">Nome Completo*</Label>
                    <Input
                      id="newMemberName"
                      placeholder="Nome completo"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newMemberEmail">Email*</Label>
                    <Input
                      id="newMemberEmail"
                      type="email"
                      placeholder="Email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newMemberPhone">Telefone</Label>
                    <InputMask
                      mask="(99) 99999-9999"
                      value={newMemberPhone}
                      onChange={(e) => setNewMemberPhone(e.target.value)}
                    >
                      {(inputProps: any) => (
                        <Input
                          {...inputProps}
                          id="newMemberPhone"
                          placeholder="(00) 00000-0000"
                          type="tel"
                        />
                      )}
                    </InputMask>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newMemberEspecializacao">Especialização*</Label>
                    <Select 
                      value={newMemberEspecializacao}
                      onValueChange={setNewMemberEspecializacao}
                      disabled={isDepartamentosLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={
                          isDepartamentosLoading 
                            ? "Carregando departamentos..." 
                            : "Selecione a especialização"
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        {departamentos.map((departamento) => (
                          <SelectItem key={departamento} value={departamento}>
                            {departamento}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending
                      ? "Cadastrando..."
                      : "Cadastrar Advogado"}
                  </Button>
                </div>
              </Card>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
