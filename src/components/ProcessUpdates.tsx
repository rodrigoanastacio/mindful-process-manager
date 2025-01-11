import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProcessUpdate } from "@/services/jusbrasilApi";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ProcessUpdatesProps {
  updates: ProcessUpdate[];
  isLoading?: boolean;
}

export const ProcessUpdates = ({ updates, isLoading }: ProcessUpdatesProps) => {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Atualizações do Processo</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          {updates.map((update, index) => (
            <div key={index} className="border-l-2 border-gray-200 pl-4 relative">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-0"></div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {format(new Date(update.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                  <Badge variant="outline">{update.type}</Badge>
                </div>
                <p className="text-sm text-gray-700">{update.content}</p>
                <p className="text-xs text-gray-500">{update.court}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};