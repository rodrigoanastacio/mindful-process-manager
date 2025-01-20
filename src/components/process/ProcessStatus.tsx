import { Clock, AlertCircle, CheckCircle, Archive } from "lucide-react";
import { ProcessStatus as ProcessStatusType } from "@/types/database";

const statusConfig = {
  em_andamento: { label: "Em Andamento", icon: Clock, color: "text-blue-500" },
  concluido: { label: "Concluído", icon: CheckCircle, color: "text-green-500" },
  arquivado: { label: "Arquivado", icon: Archive, color: "text-gray-500" }
};

interface ProcessStatusProps {
  status: ProcessStatusType;
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