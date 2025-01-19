import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ProcessFilter } from "@/components/ProcessFilter";
import { ProcessStatus } from "@/components/process/ProcessStatus";
import { ProcessPriority } from "@/components/process/ProcessPriority";
import { Eye, Edit, Trash, Plus } from "lucide-react";
import { CreateProcessModal } from "@/components/CreateProcessModal";
import { ProcessDetailsModal } from "@/components/ProcessDetailsModal";
import { toast } from "sonner";

const mockProcesses = [
  {
    id: "PRO001",
    protocol: "2024/001.123-4",
    title: "Processo de Licenciamento Ambiental",
    description: "Solicitação de licença ambiental para novo projeto de construção na área central.",
    status: "active" as const,
    date: "15/03/2024",
    deadline: "15/04/2024",
    assignee: "Maria Silva",
    department: "Meio Ambiente",
    priority: "high" as const,
    contactNumber: "11978943410",
  },
  {
    id: "PRO002",
    protocol: "2024/001.124-5",
    title: "Alvará de Construção",
    description: "Solicitação de alvará para construção de complexo residencial.",
    status: "pending" as const,
    date: "14/03/2024",
    deadline: "14/04/2024",
    assignee: "João Santos",
    department: "Obras",
    priority: "medium" as const,
    contactNumber: "11978943410",
  },
  {
    id: "PRO003",
    protocol: "2024/001.125-6",
    title: "Alteração de Zoneamento",
    description: "Solicitação de mudança de zoneamento para propriedade comercial.",
    status: "completed" as const,
    date: "10/03/2024",
    deadline: "10/04/2024",
    assignee: "Ana Oliveira",
    department: "Urbanismo",
    priority: "low" as const,
    contactNumber: "11978943410",
  },
];

const ProcessTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const filteredProcesses = mockProcesses.filter((process) => {
    const matchesSearch =
      process.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.protocol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || process.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    toast.success(`Processo ${id} excluído com sucesso!`);
  };

  const handleView = (process: any) => {
    setSelectedProcess(process);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    toast.info(`Edição do processo ${id} em desenvolvimento`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestão de Processos - Visão em Tabela</h1>
          <Button onClick={() => setIsCreateModalOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Novo Processo
          </Button>
        </div>

        <ProcessFilter onSearch={setSearchTerm} onStatusFilter={setStatusFilter} />

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Protocolo</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcesses.map((process) => (
                <TableRow key={process.id}>
                  <TableCell className="font-medium">{process.protocol}</TableCell>
                  <TableCell>{process.title}</TableCell>
                  <TableCell>
                    <ProcessStatus status={process.status} />
                  </TableCell>
                  <TableCell>
                    <ProcessPriority priority={process.priority} />
                  </TableCell>
                  <TableCell>{process.assignee}</TableCell>
                  <TableCell>{process.deadline}</TableCell>
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
      </div>
    </div>
  );
};

export default ProcessTable;