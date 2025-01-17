import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, AlertCircle, FileText } from "lucide-react";

interface HistoryEntry {
  id: string;
  type: "comment" | "status" | "document";
  user: string;
  date: string;
  description: string;
}

interface ProcessHistoryProps {
  entries: HistoryEntry[];
}

export const ProcessHistory = ({ entries }: ProcessHistoryProps) => {
  const getIcon = (type: HistoryEntry["type"]) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="h-4 w-4" />;
      case "status":
        return <AlertCircle className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <ScrollArea className="h-[600px] rounded-md border p-4">
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex gap-4 p-4 rounded-lg bg-gray-50"
          >
            <div className="mt-1">{getIcon(entry.type)}</div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium">{entry.user}</span>
                <span className="text-sm text-gray-500">{entry.date}</span>
              </div>
              <div 
                className="text-sm text-gray-600 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: entry.description }}
              />
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};