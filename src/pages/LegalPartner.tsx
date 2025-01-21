import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash, Edit, Plus } from "lucide-react";
import { toast } from "sonner";
import { CreateLegalPartnerModal } from "@/components/modal/CreateLegalPartnerModal";

const mockMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Legal",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "Financial",
  },
  {
    id: "3",
    name: "Peter Jones",
    email: "peter.jones@example.com",
    department: "HR",
  },
];

export const LegalPartner = () => {
  const [members, setMembers] = useState(mockMembers);
  const [editMemberId, setEditMemberId] = useState<string | null>(null);
  const [editMemberName, setEditMemberName] = useState("");
  const [editMemberEmail, setEditMemberEmail] = useState("");
  const [editMemberDepartment, setEditMemberDepartment] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleEditMember = (member: any) => {
    setEditMemberId(member.id);
    setEditMemberName(member.name);
    setEditMemberEmail(member.email);
    setEditMemberDepartment(member.department);
  };

  const handleUpdateMember = () => {
    if (
      !editMemberName.trim() ||
      !editMemberEmail.trim() ||
      !editMemberDepartment.trim()
    ) {
      toast.error(
        "Por favor, preencha todos os campos para atualizar o membro."
      );
      return;
    }
    setMembers(
      members.map((member) =>
        member.id === editMemberId
          ? {
              ...member,
              name: editMemberName,
              email: editMemberEmail,
              department: editMemberDepartment,
            }
          : member
      )
    );
    setEditMemberId(null);
    setEditMemberName("");
    setEditMemberEmail("");
    setEditMemberDepartment("");
    toast.success("Membro atualizado com sucesso!");
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
    toast.success("Membro excluído com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 animate-fade-in animate-fade-out">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex center justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gerenciar Advogados</h1>
            <p className="text-gray-500 mt-1">Listagem de processos</p>
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
          <h2 className="text-xl font-semibold mb-4">Lista de Membros</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Nome</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Departamento</th>
                  <th className="text-right p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b">
                    <td className="p-2">{member.name}</td>
                    <td className="p-2">{member.email}</td>
                    <td className="p-2">{member.department}</td>
                    <td className="p-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditMember(member)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteMember(member.id)}
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

        {editMemberId && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Editar Membro</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editMemberName">Nome</Label>
                <Input
                  id="editMemberName"
                  placeholder="Nome do membro"
                  value={editMemberName}
                  onChange={(e) => setEditMemberName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editMemberEmail">Email</Label>
                <Input
                  id="editMemberEmail"
                  type="email"
                  placeholder="Email do membro"
                  value={editMemberEmail}
                  onChange={(e) => setEditMemberEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editMemberDepartment">Departamento</Label>
                <Input
                  id="editMemberDepartment"
                  placeholder="Departamento do membro"
                  value={editMemberDepartment}
                  onChange={(e) => setEditMemberDepartment(e.target.value)}
                />
              </div>
              <Button
                onClick={handleUpdateMember}
                className="mt-4 bg-primary hover:bg-primary/90"
              >
                Atualizar Membro
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