import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { ProcessBasicInfo } from "../process/form/ProcessBasicInfo";
import { ProcessDetailsInfo } from "../process/form/ProcessDetailsInfo";
import { ProcessPriority, ProcessType } from "@/types/database";
import { processService } from "@/services/supabaseService";
import { useQueryClient } from "@tanstack/react-query";

interface CreateProcessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateProcessModal = ({
  open,
  onOpenChange,
}: CreateProcessModalProps) => {
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [protocol, setProtocol] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ProcessType>("civil");
  const [priority, setPriority] = useState<ProcessPriority>("media");
  const [departmentId, setDepartmentId] = useState("");
  const [lawyerId, setLawyerId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await processService.create({
        numero_processo: protocol,
        titulo: title,
        descricao: description,
        tipo: type,
        prioridade: priority,
        status: "em_andamento",
        departamento_id: departmentId || null,
        advogado_responsavel_id: lawyerId || null,
        arquivos_relacionados: null,
        data_criacao: new Date().toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["processes"] });
      toast.success("Processo criado com sucesso!");
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error("Erro ao criar processo:", error);
      toast.error("Erro ao criar processo");
    }
  };

  const resetForm = () => {
    setStep(1);
    setProtocol("");
    setTitle("");
    setDescription("");
    setType("civil");
    setPriority("media");
    setDepartmentId("");
    setLawyerId("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-screen flex flex-col p-0 gap-0 bg-gray-50">
        <div className="p-6 bg-primary/5 border-b">
          <h2 className="text-2xl font-semibold">Criar Novo Processo</h2>
          <p className="text-sm text-gray-500 mt-1">
            Preencha os detalhes do processo abaixo
          </p>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {step === 1 ? (
                <ProcessBasicInfo
                  protocol={protocol}
                  setProtocol={setProtocol}
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                  type={type}
                  setType={setType}
                />
              ) : (
                <ProcessDetailsInfo
                  priority={priority}
                  setPriority={setPriority}
                  departmentId={departmentId}
                  setDepartmentId={setDepartmentId}
                  lawyerId={lawyerId}
                  setLawyerId={setLawyerId}
                />
              )}

              <div className="p-6 flex justify-between items-center">
                {step === 2 ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Anterior
                    </Button>
                    <Button type="submit">Criar Processo</Button>
                  </>
                ) : (
                  <>
                    <div className="rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                      <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="rounded"
                      >
                        Cancelar
                      </Button>
                    </div>
                    <div className="rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                      <Button className="rounded" onClick={() => setStep(2)}>
                        Próximo
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
