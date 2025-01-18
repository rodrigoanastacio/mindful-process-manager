import { Clock, AlertCircle, CheckCircle, PauseCircle, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const statusConfig = {
  pending: { label: "Pendente", icon: Clock, color: "text-yellow-500" },
  active: { label: "Em Andamento", icon: AlertCircle, color: "text-blue-500" },
  completed: { label: "Concluído", icon: CheckCircle, color: "text-green-500" },
  archived: { label: "Arquivado", icon: FileText, color: "text-gray-500" },
  suspended: { label: "Suspenso", icon: PauseCircle, color: "text-purple-500" },
  reviewing: { label: "Em Análise", icon: AlertCircle, color: "text-orange-500" },
  waiting_docs: { label: "Aguardando Documentos", icon: FileText, color: "text-red-500" }
};

interface ProcessStatusProps {
  status: keyof typeof statusConfig;
}

export const ProcessStatus = ({ status }: ProcessStatusProps) => {
  const StatusIcon = statusConfig[status].icon;
  
  return (
    <span className={`flex items-center space-x-1 ${statusConfig[status].color}`}>
      <StatusIcon className="h-4 w-4" />
      <span>{statusConfig[status].label}</span>
    </span>
  );
};