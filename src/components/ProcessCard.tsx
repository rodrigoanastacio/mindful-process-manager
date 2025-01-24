import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, Search, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProcessUpdates } from "./ProcessUpdates";
import { searchProcess } from "@/services/jusbrasilApi";
import { useToast } from "@/components/ui/use-toast";
import { ProcessDetailsModal } from "@/components/modal/ProcessDetailsModal";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ProcessStatus } from "./process/ProcessStatus";
import { ProcessPriority } from "./process/ProcessPriority";
import { ProcessActions } from "./process/ProcessActions";
import { ProcessStatus as ProcessStatusType, ProcessPriority as ProcessPriorityType } from "@/types/database";

interface ProcessCardProps {
  id: string;
  protocol: string;
  title: string;
  description: string;
  status: ProcessStatusType;
  date: string;
  deadline: string;
  assignee: string;
  department: string;
  priority: ProcessPriorityType;
  contactNumber?: string;
  onArchive?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
}

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
  contactNumber = "11978943410",
  onArchive,
  onDelete,
  onExport
}: ProcessCardProps) => {
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
                <ProcessStatus status={status} />
                <ProcessPriority priority={priority} />
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

              <ProcessActions
                onArchive={onArchive}
                onDelete={onDelete}
                onExport={onExport}
              />
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
          numero_processo: protocol,
          titulo: title,
          descricao: description,
          status,
          data_criacao: date,
          prazo: deadline,
          advogado_responsavel: {
            nome_completo: assignee
          },
          departamento: { 
            nome: department 
          },
          prioridade: priority,
          cliente_telefone: contactNumber,
          tipo: "civil", // Adding required field
          departamento_id: "1", // Adding required field
          advogado_responsavel_id: "1", // Adding required field
          updated_at: new Date().toISOString(),
          arquivos_relacionados: null
        }}
      />
    </div>
  );
};