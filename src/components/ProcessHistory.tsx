import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Clock, 
  FileText, 
  User, 
  Edit, 
  Trash, 
  Upload,
  MessageSquare 
} from "lucide-react";

interface HistoryEntry {
  id: string;
  type: "edit" | "comment" | "status" | "document" | "delete";
  user: string;
  date: string;
  description: string;
}

const iconMap = {
  edit: Edit,
  comment: MessageSquare,
  status: Clock,
  document: Upload,
  delete: Trash,
};

interface ProcessHistoryProps {
  entries: HistoryEntry[];
}

export const ProcessHistory = ({ entries }: ProcessHistoryProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Histórico do Processo</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {entries.map((entry) => {
            const Icon = iconMap[entry.type];
            
            return (
              <div key={entry.id} className="flex items-start space-x-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Icon className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{entry.user}</span>
                    <span className="text-sm text-gray-500">{entry.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{entry.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};