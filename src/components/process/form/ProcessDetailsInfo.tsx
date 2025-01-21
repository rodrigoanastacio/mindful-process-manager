import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProcessPriority } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import { departmentService, legalPartnerService } from "@/services/supabaseService";

interface ProcessDetailsInfoProps {
  priority: ProcessPriority;
  setPriority: (value: ProcessPriority) => void;
  departmentId: string;
  setDepartmentId: (value: string) => void;
  lawyerId: string;
  setLawyerId: (value: string) => void;
}

export const ProcessDetailsInfo = ({
  priority,
  setPriority,
  departmentId,
  setDepartmentId,
  lawyerId,
  setLawyerId,
}: ProcessDetailsInfoProps) => {
  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: departmentService.getAll
  });

  const { data: lawyers } = useQuery({
    queryKey: ['lawyers'],
    queryFn: legalPartnerService.getAll
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <Label>Prioridade</Label>
        <RadioGroup
          value={priority}
          onValueChange={(value: ProcessPriority) => setPriority(value)}
          className="grid grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded p-4">
            <RadioGroupItem value="baixa" id="baixa" />
            <Label htmlFor="baixa">Baixa</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded p-4">
            <RadioGroupItem value="media" id="media" />
            <Label htmlFor="media">Média</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded p-4">
            <RadioGroupItem value="alta" id="alta" />
            <Label htmlFor="alta">Alta</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Departamento Responsável</Label>
        <Select value={departmentId} onValueChange={setDepartmentId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o departamento" />
          </SelectTrigger>
          <SelectContent>
            {departments?.map((department) => (
              <SelectItem key={department.id} value={department.id}>
                {department.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Advogado Responsável</Label>
        <Select value={lawyerId} onValueChange={setLawyerId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o advogado" />
          </SelectTrigger>
          <SelectContent>
            {lawyers?.map((lawyer) => (
              <SelectItem key={lawyer.id} value={lawyer.id}>
                {lawyer.nome_completo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};