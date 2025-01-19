import { useState } from "react";
import { ProcessStats } from "@/components/ProcessStats";
import { ProcessFilter } from "@/components/ProcessFilter";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CreateProcessModal } from "@/components/CreateProcessModal";
import { Link } from "react-router-dom";

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <Link to="/table">
              <Button variant="outline">
                Visualizar em Tabela
              </Button>
            </Link>
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

        <div className="space-y-6">
          <ProcessFilter
            onSearch={setSearchTerm}
            onStatusFilter={setStatusFilter}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredProcesses.map((process) => (
              <Link 
                key={process.id} 
                to={`/table?id=${process.id}`}
                className="block hover:no-underline"
              >
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{process.title}</h3>
                      <p className="text-sm text-gray-500">#{process.protocol}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      process.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      process.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {process.status === 'active' ? 'Em Andamento' :
                       process.status === 'completed' ? 'Concluído' :
                       'Pendente'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {process.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Responsável: {process.assignee}</span>
                    <span>Prazo: {process.deadline}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProcesses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum processo encontrado</p>
            </div>
          )}
        </div>
      </div>

      <CreateProcessModal 
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
};

export default Index;
