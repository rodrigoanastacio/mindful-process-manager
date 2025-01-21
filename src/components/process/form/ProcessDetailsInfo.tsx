import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProcessPriority } from "@/types/database";

interface ProcessDetailsInfoProps {
  deadline: string;
  setDeadline: (value: string) => void;
  deadlineTime: string;
  setDeadlineTime: (value: string) => void;
  priority: ProcessPriority;
  setPriority: (value: ProcessPriority) => void;
  assignee: string;
  setAssignee: (value: string) => void;
}

export const ProcessDetailsInfo = ({
  deadline,
  setDeadline,
  deadlineTime,
  setDeadlineTime,
  priority,
  setPriority,
  assignee,
  setAssignee,
}: ProcessDetailsInfoProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <Label>Prazo</Label>
        <div className="flex items-center gap-4">
          <div className="flex-1 rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
            <Input
              type="date"
              className="rounded"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
            <Input
              type="time"
              className="rounded"
              value={deadlineTime}
              onChange={(e) => setDeadlineTime(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Nível de Prioridade</Label>
        <RadioGroup
          value={priority}
          onValueChange={(value: ProcessPriority) => setPriority(value)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded p-4 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
            <RadioGroupItem value="baixa" id="baixa" />
            <Label htmlFor="baixa">Baixa</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded p-4 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
            <RadioGroupItem value="media" id="media" />
            <Label htmlFor="media">Média</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded p-4 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
            <RadioGroupItem value="alta" id="alta" />
            <Label htmlFor="alta">Alta</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label htmlFor="assignee">Responsável</Label>
        <div className="rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
          <Input
            id="assignee"
            className="rounded"
            placeholder="Digite o nome ou email do responsável"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};