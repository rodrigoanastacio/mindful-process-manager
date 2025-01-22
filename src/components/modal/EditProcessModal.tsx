import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProcessBasicInfo } from "@/components/process/form/ProcessBasicInfo";
import { ProcessDetailsInfo } from "@/components/process/form/ProcessDetailsInfo";
import { ProcessType, ProcessPriority, ProcessStatus } from "@/types/database";
import { processService } from "@/services/supabaseService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputMask from "react-input-mask";

interface EditProcessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  processId: string | null;
}

export const EditProcessModal = ({
  open,
  onOpenChange,
  processId,
}: EditProcessModalProps) => {
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);

  // Basic Info State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ProcessType>("civil");
  const [protocol, setProtocol] = useState("");

  // Details Info State
  const [priority, setPriority] = useState<ProcessPriority>("media");
  const [status, setStatus] = useState<ProcessStatus>("em_andamento");
  const [departmentId, setDepartmentId] = useState("");
  const [lawyerId, setLawyerId] = useState("");
  const [clienteTelefone, setClienteTelefone] = useState("");

  // Fetch process data
  const { data: process, isLoading } = useQuery({
    queryKey: ["process", processId],
    queryFn: () => (processId ? processService.getById(processId) : null),
    enabled: !!processId,
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: any) => processService.update(processId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["processes"] });
      queryClient.invalidateQueries({ queryKey: ["process", processId] });
      toast.success("Processo atualizado com sucesso!");
      onOpenChange(false);
      setStep(1);
    },
    onError: (error) => {
      console.error("Error updating process:", error);
      toast.error("Erro ao atualizar processo");
    },
  });

  // Load process data when available
  useEffect(() => {
    if (process) {
      setTitle(process.titulo);
      setDescription(process.descricao || "");
      setType(process.tipo);
      setProtocol(process.numero_processo);
      setPriority(process.prioridade);
      setStatus(process.status);
      setDepartmentId(process.departamento_id || "");
      setLawyerId(process.advogado_responsavel_id || "");
      setClienteTelefone(process.cliente_telefone || "");
    }
  }, [process]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProcess = {
      titulo: title,
      descricao: description,
      tipo: type,
      numero_processo: protocol,
      status: status,
      prioridade: priority,
      departamento_id: departmentId || null,
      advogado_responsavel_id: lawyerId || null,
      cliente_telefone: clienteTelefone,
    };

    updateMutation.mutate(updatedProcess);
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-full h-screen flex flex-col p-0 gap-0 bg-gray-50">
          <div className="p-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-screen flex flex-col p-0 gap-0 bg-gray-50">
        <div className="p-6 bg-primary/5 border-b">
          <h2 className="text-2xl font-semibold">Editar Processo</h2>
          <p className="text-sm text-gray-500 mt-1">
            Preencha os detalhes do processo abaixo
          </p>
        </div>

        <div className="flex-1 overflow-auto p-6">
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
                  protocol={protocol}
                  setProtocol={setProtocol}
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
                />
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <Label htmlFor="clienteTelefone">
                    Número de Contato do Cliente
                  </Label>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={clienteTelefone}
                    onChange={(e) => setClienteTelefone(e.target.value)}
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        id="clienteTelefone"
                        placeholder="(00) 00000-0000"
                        type="tel"
                      />
                    )}
                  </InputMask>
                </div>
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
              <Button
                onClick={handleSubmit}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending
                  ? "Atualizando..."
                  : "Atualizar Processo"}
              </Button>
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
