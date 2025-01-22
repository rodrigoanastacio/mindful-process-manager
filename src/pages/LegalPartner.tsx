import { useState } from "react";
import InputMask from "react-input-mask";
import { Trash, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { CreateLegalPartnerModal } from "@/components/modal/CreateLegalPartnerModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const LegalPartner = () => {
  const queryClient = useQueryClient();
  const [editMemberId, setEditMemberId] = useState<string | null>(null);
  const [editMemberName, setEditMemberName] = useState("");
  const [editMemberEmail, setEditMemberEmail] = useState("");
  const [editMemberPhone, setEditMemberPhone] = useState("");
  const [editMemberSpecialization, setEditMemberSpecialization] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: lawyers, isLoading } = useQuery({
    queryKey: ["lawyers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("advogados_parceiros")
        .select("*")
        .order("nome_completo");

      if (error) throw error;
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: {
      id: string;
      nome_completo: string;
      email: string;
      telefone: string;
      especializacao: string;
    }) => {
      const { id, ...updateData } = data;
      const { data: result, error } = await supabase
        .from("advogados_parceiros")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lawyers"] });
      toast.success("Advogado atualizado com sucesso!");
      setEditMemberId(null);
    },
    onError: (error) => {
      console.error("Error updating lawyer:", error);
      toast.error("Erro ao atualizar advogado");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("advogados_parceiros")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lawyers"] });
      toast.success("Advogado excluído com sucesso!");
    },
    onError: (error) => {
      console.error("Error deleting lawyer:", error);
      toast.error("Erro ao excluir advogado");
    },
  });

  const handleEditMember = (member: any) => {
    setEditMemberId(member.id);
    setEditMemberName(member.nome_completo);
    setEditMemberEmail(member.email);
    setEditMemberPhone(member.telefone || "");
    setEditMemberSpecialization(member.especializacao || "");
  };

  const handleUpdateMember = () => {
    if (!editMemberId || !editMemberName.trim() || !editMemberEmail.trim()) {
      toast.error("Nome e email são obrigatórios");
      return;
    }

    updateMutation.mutate({
      id: editMemberId,
      nome_completo: editMemberName,
      email: editMemberEmail,
      telefone: editMemberPhone,
      especializacao: editMemberSpecialization,
    });
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este advogado?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 animate-fade-in animate-fade-out">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex center justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gerenciar Advogados</h1>
            <p className="text-gray-500 mt-1">
              Listagem de advogados parceiros
            </p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Advogado
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Lista de Advogados</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Nome</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Telefone</th>
                  <th className="text-left p-2">Especialização</th>
                  <th className="text-right p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center p-4">
                      Carregando...
                    </td>
                  </tr>
                ) : (
                  lawyers?.map((lawyer) => (
                    <tr key={lawyer.id} className="border-b">
                      <td className="p-2">{lawyer.nome_completo}</td>
                      <td className="p-2">{lawyer.email}</td>
                      <td className="p-2">{lawyer.telefone || "-"}</td>
                      <td className="p-2">{lawyer.especializacao || "-"}</td>
                      <td className="p-2 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEditMember(lawyer)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteMember(lawyer.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {editMemberId && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Editar Advogado</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editMemberName">Nome Completo*</Label>
                <Input
                  id="editMemberName"
                  placeholder="Nome completo"
                  value={editMemberName}
                  onChange={(e) => setEditMemberName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editMemberEmail">Email*</Label>
                <Input
                  id="editMemberEmail"
                  type="email"
                  placeholder="Email"
                  value={editMemberEmail}
                  onChange={(e) => setEditMemberEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editMemberPhone">Telefone</Label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={editMemberPhone}
                  onChange={(e) => setEditMemberPhone(e.target.value)}
                >
                  {(inputProps: any) => (
                    <Input
                      {...inputProps}
                      id="editMemberPhone"
                      placeholder="(00) 00000-0000"
                      type="tel"
                    />
                  )}
                </InputMask>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editMemberSpecialization">Especialização</Label>
                <Input
                  id="editMemberSpecialization"
                  placeholder="Área de especialização"
                  value={editMemberSpecialization}
                  onChange={(e) => setEditMemberSpecialization(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditMemberId(null)}>
                Cancelar
              </Button>
              <Button
                onClick={handleUpdateMember}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending
                  ? "Atualizando..."
                  : "Atualizar Advogado"}
              </Button>
            </div>
          </Card>
        )}
      </div>

      <CreateLegalPartnerModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
};
