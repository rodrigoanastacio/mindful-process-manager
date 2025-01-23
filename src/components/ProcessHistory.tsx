import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, AlertCircle, FileText, Send } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

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
  processData?: {
    numero: string;
    cliente?: {
      nome: string;
    };
    responsavel?: {
      nome: string;
    };
    status: string;
    tipo: string;
  };
}

export const ProcessHistory = ({
  entries,
  contactNumber,
  processData,
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
*Atualização no Processo*

Olá!

Nova atualização registrada no processo ${processData?.numero}.

*Dados do Processo:*
📎 *Número*: ${processData?.numero}
👥 *Cliente*: ${processData?.cliente?.nome || "Não especificado"}
👤 *Responsável*: ${processData?.responsavel?.nome || "Não especificado"}
📊 *Status Atual*: ${processData?.status}
📄 *Tipo*: ${processData?.tipo}

*Detalhes da Atualização:*
📝 *Tipo*: ${
      entry.type === "comment"
        ? "Comentário"
        : entry.type === "status"
        ? "Mudança de Status"
        : "Documento"
    }
👤 *Atualizado por*: ${entry.user || "Não especificado"}
📅 *Data*: ${entry.date}
📋 *Descrição*: ${entry.description}

Atenciosamente,
Equipe de Gerenciamento de Processos`.trim();

    return message;
  };

  const handleWhatsAppShare = (entry: HistoryEntry) => {
    if (!contactNumber) {
      toast.error("Número de telefone não disponível");
      return;
    }

    try {
      const formattedNumber = contactNumber.replace(/\D/g, "");
      const text = encodeURIComponent(formatWhatsAppMessage(entry));
      const whatsappUrl = `https://wa.me/${formattedNumber}?text=${text}`;
      window.open(whatsappUrl, "_blank");
      toast.success("Mensagem preparada para envio");
    } catch (error) {
      toast.error("Erro ao preparar mensagem para WhatsApp");
      console.error("Erro ao compartilhar via WhatsApp:", error);
    }
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
                  {contactNumber && (
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