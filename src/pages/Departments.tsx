import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash, Edit, Plus } from "lucide-react";
import { toast } from "sonner";

const mockDepartments = [
  { id: "1", name: "Legal" },
  { id: "2", name: "Financial" },
  { id: "3", name: "HR" },
  { id: "4", name: "Operations" },
];

const Departments = () => {
  const [departments, setDepartments] = useState(mockDepartments);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [editDepartmentId, setEditDepartmentId] = useState<string | null>(null);
  const [editDepartmentName, setEditDepartmentName] = useState("");

  const handleAddDepartment = () => {
    if (!newDepartmentName.trim()) {
      toast.error("Por favor, preencha o nome do departamento.");
      return;
    }
    const newDepartment = {
      id: Date.now().toString(),
      name: newDepartmentName,
    };
    setDepartments([...departments, newDepartment]);
    setNewDepartmentName("");
    toast.success("Departamento adicionado com sucesso!");
  };

  const handleEditDepartment = (department: any) => {
    setEditDepartmentId(department.id);
    setEditDepartmentName(department.name);
  };

  const handleUpdateDepartment = () => {
    if (!editDepartmentName.trim()) {
      toast.error("Por favor, preencha o nome do departamento.");
      return;
    }
    setDepartments(
      departments.map((department) =>
        department.id === editDepartmentId
          ? { ...department, name: editDepartmentName }
          : department
      )
    );
    setEditDepartmentId(null);
    setEditDepartmentName("");
    toast.success("Departamento atualizado com sucesso!");
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter((department) => department.id !== id));
    toast.success("Departamento excluído com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Departamento
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
                {departments.map((department) => (
                  <tr key={department.id} className="border-b">
                    <td className="p-2">{department.name}</td>
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
              >
                Atualizar Departamento
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Departments;
