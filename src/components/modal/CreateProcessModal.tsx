import { useState } from "react";
import { processService } from "@/services/supabaseService";
import { useQueryClient } from "@tanstack/react-query";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import InputMask from "react-input-mask";
import { toast } from "sonner";

import { ProcessBasicInfo } from "../process/form/ProcessBasicInfo";
import { ProcessDetailsInfo } from "../process/form/ProcessDetailsInfo";
import { ProcessPriority, ProcessType, ProcessStatus } from "@/types/database";

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
  const [status, setStatus] = useState<ProcessStatus>("em_andamento");
  const [departmentId, setDepartmentId] = useState("");
  const [lawyerId, setLawyerId] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await processService.create({
        numero_processo: protocol,
        titulo: title,
        descricao: description,
        tipo: type,
        prioridade: priority,
        status: status,
        departamento_id: departmentId || null,
        advogado_responsavel_id: lawyerId || null,
        arquivos_relacionados: null,
        data_criacao: new Date().toISOString(),
        cliente_telefone: clientPhone,
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
    setStatus("em_andamento");
    setDepartmentId("");
    setLawyerId("");
    setClientPhone("");
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
                  status={status}
                  setStatus={setStatus}
                  clientPhone={clientPhone}
                  setClientPhone={setClientPhone}
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
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => setStep(2)}>Próximo</Button>
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
