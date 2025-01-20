import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FileText, Users, Building2, Calendar } from "lucide-react";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("administrative");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignee, setAssignee] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (processId) {
      // Mock data loading
      const mockProcess = {
        id: "PRO001",
        protocol: "2024/001.123-4",
        title: "Processo de Licenciamento Ambiental",
        description:
          "Solicitação de licença ambiental para novo projeto de construção na área central.",
        status: "active" as const,
        date: "15/03/2024",
        deadline: "15/04/2024",
        assignee: "Maria Silva",
        department: "Meio Ambiente",
        priority: "high" as const,
        type: "administrative",
      };

      if (processId === mockProcess.id) {
        setTitle(mockProcess.title);
        setDescription(mockProcess.description);
        setType(mockProcess.type);
        setDeadline(mockProcess.deadline);
        setPriority(mockProcess.priority);
        setAssignee(mockProcess.assignee);
      }
    }
  }, [processId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Processo atualizado!");
    onOpenChange(false);
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-screen flex flex-col p-0 gap-0  bg-gray-50">
        <div className="p-6 bg-primary/5 border-b">
          <h2 className="text-2xl font-semibold">Editar Processo</h2>
          <p className="text-sm text-gray-500 mt-1">
            Preencha os detalhes do processo abaixo
          </p>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-4">
                    <Label htmlFor="title">Título do Processo</Label>
                    <Input
                      id="title"
                      placeholder="Insira o título do processo"
                      className="text-lg"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      placeholder="Forneça uma descrição detalhada do processo"
                      className="min-h-[120px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Tipo de Processo</Label>
                    <RadioGroup
                      defaultValue={type}
                      onValueChange={setType}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem
                          value="administrative"
                          id="administrative"
                        />
                        <Label
                          htmlFor="administrative"
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Administrativo
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="legal" id="legal" />
                        <Label
                          htmlFor="legal"
                          className="flex items-center gap-2"
                        >
                          <Building2 className="h-4 w-4" />
                          Jurídico
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="hr" id="hr" />
                        <Label htmlFor="hr" className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Recursos Humanos
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-4">
                    <Label>Prazo</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="date"
                        className="flex-1"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                      />
                      <Input type="time" className="flex-1" required />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Nível de Prioridade</Label>
                    <RadioGroup
                      defaultValue={priority}
                      onValueChange={setPriority}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Baixa</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Média</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">Alta</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="assignee">Responsável</Label>
                    <Input
                      id="assignee"
                      placeholder="Insira o nome ou email do responsável"
                      value={assignee}
                      onChange={(e) => setAssignee(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="attachments">Anexos</Label>
                    <Input
                      id="attachments"
                      type="file"
                      multiple
                      className="cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files) {
                          setAttachments(Array.from(e.target.files));
                        }
                      }}
                    />
                  </div>
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
              <Button onClick={handleSubmit}>Atualizar Processo</Button>
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
