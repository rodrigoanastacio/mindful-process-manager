import { Badge } from "@/components/ui/badge";
import { ProcessPriority as ProcessPriorityType } from "@/types/database";

const priorityConfig = {
  baixa: "bg-gray-100 text-gray-800",
  media: "bg-blue-100 text-blue-800",
  alta: "bg-red-100 text-red-800"
};

interface ProcessPriorityProps {
  priority: ProcessPriorityType;
}

export const ProcessPriority = ({ priority }: ProcessPriorityProps) => (
  <Badge className={`${priorityConfig[priority]}`}>
    {priority.charAt(0).toUpperCase() + priority.slice(1)}
  </Badge>
);