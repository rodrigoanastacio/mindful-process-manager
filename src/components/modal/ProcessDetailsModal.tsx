import { useState, useEffect } from "react";

import {
  CalendarDays,
  User,
  Send,
  Plus,
  MessageCircle,
  AlertCircle,
} from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { ProcessHistory } from "@/components/ProcessHistory";
import { useProcess } from "@/context/ProcessContext/useProcess";

import { BaseProcess } from "@/types/process";

interface ProcessDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  process: BaseProcess;
}

export const ProcessDetailsModal = ({
  open,
  onOpenChange,
  process,
}: ProcessDetailsModalProps) => {
  const [newComment, setNewComment] = useState("");
  const [history, setHistory] = useState([
    {
      id: "1",
      type: "comment" as const,
      user: "Sistema",
      date: new Date().toLocaleDateString(),
      description: "Processo criado",
    },
  ]);
  const { setProcess } = useProcess();

  useEffect(() => {
    setProcess(process);
  }, [process, setProcess]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newEntry = {
      id: Date.now().toString(),
      type: "comment" as const,
      user: "Dayane",
      date: new Date().toLocaleDateString(),
      description: newComment,
    };

    setHistory([newEntry, ...history]);
    setNewComment("");
    toast.success("Comentário adicionado com sucesso!");
  };

  console.log("Process ProcessDetailsModal ::::", process);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-full h-screen flex flex-col p-0 gap-0">
        <DialogTitle className="sr-only">Detalhes do Processo</DialogTitle>

        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {process.titulo}
              </h2>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  Protocolo: {process.protocol}
                </span>
                <Badge
                  variant="outline"
                  className="border-blue-200 bg-blue-50 text-blue-600"
                >
                  {process.status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{process.deadline}</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Detalhes do Processo
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600">{process.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{process.assignee}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarDays className="h-4 w-4" />
                      <span>Prazo: {process.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    Novo Comentário
                  </h3>
                  <form onSubmit={handleAddComment} className="space-y-4">
                    <div className="relative">
                      <Textarea
                        id="comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={4}
                        placeholder="Escreva seu comentário..."
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl"
                      />
                      <MessageCircle className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {newComment.length}/500 caracteres
                      </span>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Comentário
                      </Button>
                    </div>

                    {newComment.length > 0 && (
                      <p className="text-sm text-green-600 animate-fade-in">
                        Pronto para enviar seu comentário!
                      </p>
                    )}
                  </form>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    Histórico de Atividades
                  </h3>
                  <ProcessHistory
                    entries={history}
                    contactNumber={process.contactNumber}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Histórico do Processo
              </h3>
              <ProcessHistory
                entries={history}
                contactNumber={process.contactNumber}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
