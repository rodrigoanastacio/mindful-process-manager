import { useState } from "react";
import { Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ProcessTable } from "@/components/process/ProcessTable";
import { CreateProcessModal } from "@/components/modal/CreateProcessModal";
import { ProcessDetailsModal } from "@/components/modal/ProcessDetailsModal";
import { EditProcessModal } from "@/components/modal/EditProcessModal";
import { processService } from "@/services/supabaseService";

export const Process = () => {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProcessId, setEditProcessId] = useState<string | null>(null);

  const { data: processes, isLoading } = useQuery({
    queryKey: ["processes"],
    queryFn: processService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: processService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["processes"] });
      toast.success("Processo excluído com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao excluir processo");
      console.error("Error deleting process:", error);
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleView = (process: any) => {
    setSelectedProcess(process);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setEditProcessId(id);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
              Processos
            </h1>
            <p className="text-gray-500 mt-1">Listagem de processos</p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Processo
          </Button>
        </div>

        <ProcessTable
          data={processes || []}
          isLoading={isLoading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <CreateProcessModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        />

        {selectedProcess && (
          <ProcessDetailsModal
            open={isDetailsModalOpen}
            onOpenChange={setIsDetailsModalOpen}
            process={selectedProcess}
          />
        )}

        {editProcessId && (
          <EditProcessModal
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            processId={editProcessId}
          />
        )}
      </div>
    </div>
  );
};