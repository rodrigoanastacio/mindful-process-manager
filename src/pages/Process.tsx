import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash, Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import { ProcessFilter } from "@/components/ProcessFilter";
import { ProcessStatus } from "@/components/process/ProcessStatus";
import { ProcessPriority } from "@/components/process/ProcessPriority";
import { CreateProcessModal } from "@/components/modal/CreateProcessModal";
import { ProcessDetailsModal } from "@/components/modal/ProcessDetailsModal";
import { EditProcessModal } from "@/components/modal/EditProcessModal";
import { processService } from "@/services/supabaseService";

export const Process = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
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

  const filteredProcesses = processes?.filter((process) => {
    const matchesSearch =
      process.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.numero_processo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || process.status === statusFilter;
    return matchesSearch && matchesStatus;
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

  console.log("PROCESSES :::", processes);

  return (
    <div className="min-h-screen bg-gray-50 p-6 animate-fade-in animate-fade-out">
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

        <ProcessFilter
          onSearch={setSearchTerm}
          onStatusFilter={setStatusFilter}
        />

        <div className="bg-white rounded border">
          <Table className="rounded">
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">N° Processo</TableHead>
                <TableHead className="font-bold">Título</TableHead>
                <TableHead className="font-bold">Responsável</TableHead>
                <TableHead className="font-bold">Departamento</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-4 w-24 bg-gray-200 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-48 bg-gray-200 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20 bg-gray-200 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16 bg-gray-200 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24 bg-gray-200 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20 bg-gray-200 rounded-full" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Skeleton className="h-8 w-8 bg-gray-200 rounded" />
                          <Skeleton className="h-8 w-8 bg-gray-200 rounded" />
                          <Skeleton className="h-8 w-8 bg-gray-200 rounded" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : filteredProcesses?.map((process) => (
                    <TableRow key={process.id}>
                      <TableCell className="font-medium">
                        {process.numero_processo}
                      </TableCell>
                      <TableCell>{process.titulo}</TableCell>
                      <TableCell>
                        {process.advogado_responsavel?.nome_completo || "-"}
                      </TableCell>
                      <TableCell>{process.departamento?.nome || "-"}</TableCell>
                      <TableCell>
                        <ProcessStatus status={process.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleView(process)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(process.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(process.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>

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
