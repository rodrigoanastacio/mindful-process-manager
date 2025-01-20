import { useState } from "react";
import { Link } from "react-router-dom";

import { PlusCircle, Filter, List } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

import { ProcessStats } from "@/components/ProcessStats";
import { ProcessFilter } from "@/components/ProcessFilter";
import { CreateProcessModal } from "@/components/modal/CreateProcessModal";

const mockProcesses = [
  {
    id: "PRO001",
    protocol: "2024/001.123-4",
    title: "Processo de Licenciamento Ambiental",
    description:
      "Solicitação de licença ambiental para novo projeto de construção na área central.",
    status: "active" as const,
    date: "15/03/2024",
    deadline: "15/04/2024",
    assignee: "Maria Silva",
    department: "Meio Ambiente",
    priority: "high" as const,
    type: "administrativo",
    lastUpdate: "2024-03-15T10:30:00",
  },
  {
    id: "PRO002",
    protocol: "2024/001.124-5",
    title: "Alvará de Construção",
    description:
      "Solicitação de alvará para construção de complexo residencial.",
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
    description:
      "Solicitação de mudança de zoneamento para propriedade comercial.",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 animate-fade-in animate-fade-out">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Gerencie seus processos de forma eficiente
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Link to="/table" className="w-full md:w-auto">
              <Button variant="outline" className="w-full md:w-auto">
                <List className="mr-2 h-4 w-4" />
                Visualizar em Tabela
              </Button>
            </Link>
            <Button
              className="bg-primary hover:bg-primary/90 w-full md:w-auto"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Processo
            </Button>
          </div>
        </div>

        <ProcessStats />

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <ProcessFilter
              onSearch={setSearchTerm}
              onStatusFilter={setStatusFilter}
            />
            <Button
              variant="outline"
              onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              className="w-full md:w-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtros Avançados
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredProcesses.map((process) => (
              <Link
                key={process.id}
                to={`/table?id=${process.id}`}
                className="block hover:no-underline group"
              >
                <Card className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group-hover:translate-y-[-2px]">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {process.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        #{process.protocol}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        process.status === "active"
                          ? "bg-blue-100 text-blue-800"
                          : process.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {process.status === "active"
                        ? "Em Andamento"
                        : process.status === "completed"
                        ? "Concluído"
                        : "Pendente"}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {process.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Responsável: {process.assignee}</span>
                      <span>Prazo: {process.deadline}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Tipo: {process.type}</span>
                      <span>Departamento: {process.department}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredProcesses.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">Nenhum processo encontrado</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
              >
                Limpar Filtros
              </Button>
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
