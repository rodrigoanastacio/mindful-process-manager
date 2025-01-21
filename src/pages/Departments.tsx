import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash, Edit, Plus } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Department {
  id: string;
  nome: string;
  descricao: string | null;
  data_criacao: string;
}

const Departments = () => {
  const queryClient = useQueryClient();
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [editDepartmentId, setEditDepartmentId] = useState<string | null>(null);
  const [editDepartmentName, setEditDepartmentName] = useState("");

  const { data: departments = [], isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('departamentos')
        .select('*')
        .order('nome');
      
      if (error) throw error;
      return data;
    }
  });

  const createDepartment = useMutation({
    mutationFn: async (nome: string) => {
      const { data, error } = await supabase
        .from('departamentos')
        .insert([{ nome }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast.success("Departamento adicionado com sucesso!");
      setNewDepartmentName("");
    },
    onError: (error) => {
      console.error('Erro ao criar departamento:', error);
      toast.error("Erro ao criar departamento");
    }
  });

  const updateDepartment = useMutation({
    mutationFn: async ({ id, nome }: { id: string; nome: string }) => {
      const { data, error } = await supabase
        .from('departamentos')
        .update({ nome })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast.success("Departamento atualizado com sucesso!");
      setEditDepartmentId(null);
      setEditDepartmentName("");
    },
    onError: (error) => {
      console.error('Erro ao atualizar departamento:', error);
      toast.error("Erro ao atualizar departamento");
    }
  });

  const deleteDepartment = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('departamentos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast.success("Departamento excluído com sucesso!");
    },
    onError: (error) => {
      console.error('Erro ao excluir departamento:', error);
      toast.error("Erro ao excluir departamento");
    }
  });

  const handleAddDepartment = () => {
    if (!newDepartmentName.trim()) {
      toast.error("Por favor, preencha o nome do departamento.");
      return;
    }
    createDepartment.mutate(newDepartmentName);
  };

  const handleEditDepartment = (department: Department) => {
    setEditDepartmentId(department.id);
    setEditDepartmentName(department.nome);
  };

  const handleUpdateDepartment = () => {
    if (!editDepartmentName.trim()) {
      toast.error("Por favor, preencha o nome do departamento.");
      return;
    }
    if (editDepartmentId) {
      updateDepartment.mutate({
        id: editDepartmentId,
        nome: editDepartmentName
      });
    }
  };

  const handleDeleteDepartment = (id: string) => {
    deleteDepartment.mutate(id);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <p>Carregando departamentos...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 animate-fade-in animate-fade-out">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Gerenciar Departamentos</h1>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Adicionar Novo Departamento
          </h2>
          <div className="space-y-2">
            <Label htmlFor="newDepartmentName">Nome</Label>
            <Input
              id="newDepartmentName"
              placeholder="Nome do departamento"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
            />
          </div>
          <Button
            onClick={handleAddDepartment}
            className="mt-4 bg-primary hover:bg-primary/90"
            disabled={createDepartment.isPending}
          >
            <Plus className="h-4 w-4 mr-2" />
            {createDepartment.isPending ? "Adicionando..." : "Adicionar Departamento"}
          </Button>
        </Card>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Lista de Departamentos</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Nome</th>
                  <th className="text-right p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department: Department) => (
                  <tr key={department.id} className="border-b">
                    <td className="p-2">{department.nome}</td>
                    <td className="p-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditDepartment(department)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteDepartment(department.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {editDepartmentId && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Editar Departamento</h2>
            <div className="space-y-4">
              <Label htmlFor="editDepartmentName">Nome</Label>
              <Input
                id="editDepartmentName"
                placeholder="Nome do departamento"
                value={editDepartmentName}
                onChange={(e) => setEditDepartmentName(e.target.value)}
              />
              <Button
                onClick={handleUpdateDepartment}
                className="mt-4 bg-primary hover:bg-primary/90"
                disabled={updateDepartment.isPending}
              >
                {updateDepartment.isPending ? "Atualizando..." : "Atualizar Departamento"}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Departments;