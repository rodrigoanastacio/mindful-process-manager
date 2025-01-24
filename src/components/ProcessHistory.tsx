import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, AlertCircle, FileText, Send } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

import { useProcess } from "@/context/ProcessContext";

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
  const { process } = useProcess();
  console.log("Process ProcessHistory ::::", process);
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
*Atualização do Processo* ${process.numero_processo}
*Responsável*: ${process.advogado_responsavel.nome_completo}

*Título*: ${process.titulo}
*Descrição*: ${process.descricao}

Caso tenha dúvidas ou precise de mais informações, entre em contato conosco.

Atenciosamente,
Equipe de Gerenciamento de Processos`.trim();

    return message;
  };

  const handleWhatsAppShare = (entry: HistoryEntry) => {
    if (!process.cliente_telefone) {
      toast.error("Número de telefone não disponível");
      return;
    }

    try {
      const formattedNumber = process.cliente_telefone.replace(/\D/g, "");
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
                  {process.cliente_telefone && (
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
