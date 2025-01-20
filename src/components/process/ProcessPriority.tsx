import { AlertTriangle, ArrowDown, ArrowUp } from "lucide-react";
import { ProcessPriority as ProcessPriorityType } from "@/types/database";

const priorityConfig = {
  baixa: { label: "Baixa", icon: ArrowDown, color: "text-green-500" },
  media: { label: "Média", icon: AlertTriangle, color: "text-yellow-500" },
  alta: { label: "Alta", icon: ArrowUp, color: "text-red-500" }
};

interface ProcessPriorityProps {
  priority: ProcessPriorityType;
}

export const ProcessPriority = ({ priority }: ProcessPriorityProps) => {
  const PriorityIcon = priorityConfig[priority].icon;
  
  return (
    <span className={`flex items-center space-x-1 ${priorityConfig[priority].color}`}>
      <PriorityIcon className="h-4 w-4" />
      <span>{priorityConfig[priority].label}</span>
    </span>
  );
};