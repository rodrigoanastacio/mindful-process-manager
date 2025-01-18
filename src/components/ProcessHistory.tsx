import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, AlertCircle, FileText, Send } from "lucide-react";
import { Button } from "./ui/button";

interface HistoryEntry {
  id: string;
  type: "comment" | "status" | "document";
  user: string;
  date: string;
  description: string;
}

interface ProcessHistoryProps {
  entries: HistoryEntry[];
  contactNumber?: string;
}

export const ProcessHistory = ({
  entries,
  contactNumber,
}: ProcessHistoryProps) => {
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

  const formatWhatsAppMessage = (entry: HistoryEntry) => {
    const message = `
*Atualização no Status do Processo*

Olá ${entry.user}!

Uma nova atualização foi registrada no processo.

*Detalhes da Atualização:*
*Tipo*: ${
      entry.type === "comment"
        ? "Comentário"
        : entry.type === "status"
        ? "Mudança de Status"
        : "Documento"
    }
*Responsável*: ${entry.user}
*Data*: ${entry.date}
*Descrição*: ${entry.description}

Caso tenha dúvidas ou precise de mais informações, entre em contato com o responsável pelo processo.

Atenciosamente,
Equipe de Gerenciamento de Processos
    `.trim();

    return message;
  };

  const handleWhatsAppShare = (entry: HistoryEntry) => {
    if (!contactNumber) {
      return;
    }
    const formattedNumber = contactNumber.replace(/\D/g, "");
    const text = encodeURIComponent(formatWhatsAppMessage(entry));
    window.open(`https://wa.me/${formattedNumber}?text=${text}`, "_blank");
  };

  return (
    <ScrollArea className="h-[600px] rounded-md border p-4">
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="flex gap-4 p-4 rounded-lg bg-gray-50">
            <div className="mt-1">{getIcon(entry.type)}</div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium">{entry.user}</span>
                <div className="flex items-center gap-2">
                  {contactNumber && entry.type === "comment" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleWhatsAppShare(entry)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Enviar WhatsApp
                    </Button>
                  )}
                  <span className="text-sm text-gray-500">{entry.date}</span>
                </div>
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
