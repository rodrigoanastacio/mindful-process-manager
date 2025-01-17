import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { ProcessHistory } from "./ProcessHistory";
import { Badge } from "./ui/badge";
import { 
  CalendarDays, 
  User, 
  MessageSquare,
  Plus
} from "lucide-react";

interface ProcessDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  process: {
    id: string;
    protocol: string;
    title: string;
    description: string;
    status: string;
    date: string;
    deadline: string;
    assignee: string;
    department: string;
    priority: string;
  };
}

export const ProcessDetailsModal = ({ open, onOpenChange, process }: ProcessDetailsModalProps) => {
  const [newComment, setNewComment] = useState("");
  const [history, setHistory] = useState([
    {
      id: "1",
      type: "comment" as const,
      user: "Sistema",
      date: new Date().toLocaleDateString(),
      description: "Processo criado"
    }
  ]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newEntry = {
      id: Date.now().toString(),
      type: "comment" as const,
      user: process.assignee,
      date: new Date().toLocaleDateString(),
      description: newComment
    };

    setHistory([newEntry, ...history]);
    setNewComment("");
    toast.success("Comentário adicionado com sucesso!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-screen flex flex-col p-0 gap-0">
        <div className="p-6 bg-primary/5 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{process.title}</h2>
              <p className="text-sm text-gray-500 mt-1">Protocolo: {process.protocol}</p>
            </div>
            <Badge variant="outline">{process.status}</Badge>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Detalhes do Processo</h3>
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

              <div>
                <h3 className="text-lg font-semibold mb-4">Adicionar Comentário</h3>
                <form onSubmit={handleAddComment} className="space-y-4">
                  <div>
                    <Label htmlFor="comment">Comentário</Label>
                    <Textarea
                      id="comment"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Digite seu comentário..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Comentário
                  </Button>
                </form>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Histórico do Processo</h3>
              <ProcessHistory entries={history} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};