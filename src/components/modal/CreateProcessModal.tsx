import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { ProcessBasicInfo } from "../process/form/ProcessBasicInfo";
import { ProcessDetailsInfo } from "../process/form/ProcessDetailsInfo";
import { ProcessPriority, ProcessType } from "@/types/database";
import { processService } from "@/services/supabaseService";

interface CreateProcessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateProcessModal = ({
  open,
  onOpenChange,
}: CreateProcessModalProps) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ProcessType>("administrativo");
  const [deadline, setDeadline] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [priority, setPriority] = useState<ProcessPriority>("media");
  const [assignee, setAssignee] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const numeroProcesso = `${new Date().getFullYear()}/${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      await processService.create({
        numero_processo: numeroProcesso,
        titulo: title,
        descricao: description,
        tipo: type,
        prioridade: priority,
        status: "em_andamento",
        data_criacao: new Date().toISOString(),
      });

      toast.success("Processo criado com sucesso!");
      onOpenChange(false);
      setStep(1);
      resetForm();
    } catch (error) {
      toast.error("Erro ao criar processo");
      console.error(error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("administrativo");
    setDeadline("");
    setDeadlineTime("");
    setPriority("media");
    setAssignee("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-screen flex flex-col p-0 gap-0 bg-gray-50">
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-semibold">Criar Novo Processo</h2>
          <p className="text-sm text-gray-500 mt-1">
            Preencha os detalhes do processo abaixo
          </p>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {step === 1 ? (
                <ProcessBasicInfo
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                  type={type}
                  setType={setType}
                />
              ) : (
                <ProcessDetailsInfo
                  deadline={deadline}
                  setDeadline={setDeadline}
                  deadlineTime={deadlineTime}
                  setDeadlineTime={setDeadlineTime}
                  priority={priority}
                  setPriority={setPriority}
                  assignee={assignee}
                  setAssignee={setAssignee}
                />
              )}
            </form>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
          {step === 2 ? (
            <>
              <Button variant="outline" onClick={() => setStep(1)}>
                Anterior
              </Button>
              <Button onClick={handleSubmit}>Criar Processo</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setStep(2)}>Próximo</Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};