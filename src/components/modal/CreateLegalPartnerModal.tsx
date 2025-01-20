import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CreateLegalPartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateLegalPartnerModal = ({
  open,
  onOpenChange,
}: CreateLegalPartnerModalProps) => {
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberDepartment, setNewMemberDepartment] = useState("");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-screen flex flex-col p-0 gap-0 bg-gray-50">
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-semibold">Adicionar novo advogado</h2>
          <p className="text-sm text-gray-500 mt-1">
            Informe os dados para cadastrar um novo advogado parceiro
          </p>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Adicionar Novo Advogado
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newMemberName">Nome</Label>
                  <Input
                    id="newMemberName"
                    placeholder="Nome"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newMemberEmail">Email</Label>
                  <Input
                    id="newMemberEmail"
                    type="email"
                    placeholder="Email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newMemberDepartment">Departamento</Label>
                  <Input
                    id="newMemberDepartment"
                    placeholder="Departamento do membro"
                    value={newMemberDepartment}
                    onChange={(e) => setNewMemberDepartment(e.target.value)}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
