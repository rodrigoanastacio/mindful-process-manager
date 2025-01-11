import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProcessCardProps {
  id: string;
  title: string;
  description: string;
  status: "pending" | "active" | "completed" | "archived";
  date: string;
  onArchive?: () => void;
  onDelete?: () => void;
}

export const ProcessCard = ({
  id,
  title,
  description,
  status,
  date,
  onArchive,
  onDelete,
}: ProcessCardProps) => {
  const statusClasses = {
    pending: "status-pending",
    active: "status-active",
    completed: "status-completed",
    archived: "status-archived",
  };

  return (
    <Card className="glass-card p-6 animate-fade-up">
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className={`process-status ${statusClasses[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
              <Badge variant="outline" className="text-xs">
                #{id}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onArchive}>Archive</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <CalendarDays className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FileText className="h-4 w-4" />
          <span>View Details</span>
        </div>
      </div>
    </Card>
  );
};