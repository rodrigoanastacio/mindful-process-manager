import { Badge } from "@/components/ui/badge";

const priorityConfig = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800"
};

interface ProcessPriorityProps {
  priority: keyof typeof priorityConfig;
}

export const ProcessPriority = ({ priority }: ProcessPriorityProps) => (
  <Badge className={`${priorityConfig[priority]}`}>
    {priority.charAt(0).toUpperCase() + priority.slice(1)}
  </Badge>
);