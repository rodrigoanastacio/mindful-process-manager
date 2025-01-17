import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarDays, 
  FileText, 
  MoreVertical, 
  Clock,
  AlertCircle,
  CheckCircle,
  PauseCircle,
  User,
  FileDown,
  Search,
  Maximize2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProcessUpdates } from "./ProcessUpdates";
import { searchProcess } from "@/services/jusbrasilApi";
import { useToast } from "@/components/ui/use-toast";
import { ProcessDetailsModal } from "./ProcessDetailsModal";

interface ProcessCardProps {
  id: string;
  protocol: string;
  title: string;
  description: string;
  status: "pending" | "active" | "completed" | "archived" | "suspended" | "reviewing" | "waiting_docs";
  date: string;
  deadline: string;
  assignee: string;
  department: string;
  priority: "low" | "medium" | "high" | "urgent";
  onArchive?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
}

const statusConfig = {
  pending: { label: "Pendente", icon: Clock, color: "text-yellow-500" },
  active: { label: "Em Andamento", icon: AlertCircle, color: "text-blue-500" },
  completed: { label: "Concluído", icon: CheckCircle, color: "text-green-500" },
  archived: { label: "Arquivado", icon: FileText, color: "text-gray-500" },
  suspended: { label: "Suspenso", icon: PauseCircle, color: "text-purple-500" },
  reviewing: { label: "Em Análise", icon: AlertCircle, color: "text-orange-500" },
  waiting_docs: { label: "Aguardando Documentos", icon: FileText, color: "text-red-500" }
};

const priorityConfig = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800"
};

export const ProcessCard = ({
  id,
  protocol,
  title,
  description,
  status,
  date,
  deadline,
  assignee,
  department,
  priority,
  onArchive,
  onDelete,
  onExport
}: ProcessCardProps) => {
  const StatusIcon = statusConfig[status].icon;
  const [showUpdates, setShowUpdates] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  const handleSearchUpdates = async () => {
    const apiKey = localStorage.getItem('jusbrasil_api_key');
    if (!apiKey) {
      toast({
        title: "Configuração Necessária",
        description: "Por favor, configure sua chave de API do JusBrasil primeiro.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setShowUpdates(true);
    try {
      const processDetails = await searchProcess(protocol);
      if (processDetails?.updates) {
        setUpdates(processDetails.updates);
      } else {
        toast({
          title: "Erro na consulta",
          description: "Não foi possível encontrar atualizações para este processo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao consultar as atualizações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="glass-card p-6 animate-fade-up hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <div className="space-y-3 flex-1">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  Protocolo: {protocol}
                </Badge>
                <span className={`flex items-center space-x-1 ${statusConfig[status].color}`}>
                  <StatusIcon className="h-4 w-4" />
                  <span>{statusConfig[status].label}</span>
                </span>
                <Badge className={`${priorityConfig[priority]}`}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Tooltip>
                <TooltipTrigger className="flex items-center space-x-2 text-sm text-gray-500">
                  <User className="h-4 w-4" />
                  <span>{assignee}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Departamento: {department}</p>
                </TooltipContent>
              </Tooltip>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <CalendarDays className="h-4 w-4" />
                <span>Prazo: {deadline}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSearchUpdates}
                  className="flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Consultar Atualizações
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(true)}
                  className="flex items-center gap-2"
                >
                  <Maximize2 className="h-4 w-4" />
                  Ver Detalhes
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={onArchive}>
                    <FileText className="h-4 w-4 mr-2" />
                    Arquivar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onExport}>
                    <FileDown className="h-4 w-4 mr-2" />
                    Exportar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onDelete} className="text-red-600">
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Card>

      {showUpdates && (
        <ProcessUpdates updates={updates} isLoading={isLoading} />
      )}

      <ProcessDetailsModal
        open={showDetails}
        onOpenChange={setShowDetails}
        process={{
          id,
          protocol,
          title,
          description,
          status,
          date,
          deadline,
          assignee,
          department,
          priority
        }}
      />
    </div>
  );
};
