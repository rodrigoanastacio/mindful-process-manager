import { useState } from "react";
import { ProcessStats } from "@/components/ProcessStats";
import { ProcessFilter } from "@/components/ProcessFilter";
import { ProcessCard } from "@/components/ProcessCard";
import { ProcessHistory } from "@/components/ProcessHistory";
import { AdvancedFilter } from "@/components/AdvancedFilter";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CreateProcessModal } from "@/components/CreateProcessModal";

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
  },
];

const mockHistory = [
  {
    id: "1",
    type: "status" as const,
    user: "Maria Silva",
    date: "15/03/2024 14:30",
    description: "Status alterado para 'Em Andamento'",
  },
  {
    id: "2",
    type: "document" as const,
    user: "João Santos",
    date: "14/03/2024 10:15",
    description: "Documento anexado: Relatório Técnico",
  },
  {
    id: "3",
    type: "comment" as const,
    user: "Ana Oliveira",
    date: "13/03/2024 16:45",
    description: "Comentário adicionado: Necessário revisão da documentação",
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const { toast } = useToast();

  const filteredProcesses = mockProcesses.filter((process) => {
    const matchesSearch = 
      process.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.protocol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || process.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleArchive = (id: string) => {
    toast({
      title: "Processo Arquivado",
      description: `Processo ${id} foi arquivado com sucesso.`,
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Processo Excluído",
      description: `Processo ${id} foi excluído com sucesso.`,
      variant: "destructive",
    });
  };

  const handleExport = (id: string) => {
    toast({
      title: "Exportando Processo",
      description: `Processo ${id} está sendo exportado.`,
    });
  };

  const handleAdvancedFilter = (filters: any) => {
    console.log("Filtros aplicados:", filters);
    toast({
      title: "Filtros Aplicados",
      description: "Os filtros foram aplicados com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestão de Processos</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtros Avançados
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Processo
            </Button>
          </div>
        </div>

        <ProcessStats />

        {showAdvancedFilter && (
          <AdvancedFilter
            onFilter={handleAdvancedFilter}
            onClear={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
          />
        )}

        <div className="space-y-6">
          <ProcessFilter
            onSearch={setSearchTerm}
            onStatusChange={setStatusFilter}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProcesses.map((process) => (
              <ProcessCard
                key={process.id}
                {...process}
                onArchive={() => handleArchive(process.id)}
                onDelete={() => handleDelete(process.id)}
                onExport={() => handleExport(process.id)}
              />
            ))}
          </div>

          {filteredProcesses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum processo encontrado</p>
            </div>
          )}
        </div>

        <ProcessHistory entries={mockHistory} />
      </div>

      <CreateProcessModal 
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
};

export default Index;