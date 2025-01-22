import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProcessPriority, ProcessStatus } from "@/types/database";
import { Clock, CheckCircle, Archive } from "lucide-react";

interface ProcessDetailsInfoProps {
  priority: ProcessPriority;
  setPriority: (priority: ProcessPriority) => void;
  departmentId: string;
  setDepartmentId: (id: string) => void;
  lawyerId: string;
  setLawyerId: (id: string) => void;
  status: ProcessStatus;
  setStatus: (status: ProcessStatus) => void;
}

const statusConfig = {
  em_andamento: {
    label: "Em Andamento",
    icon: Clock,
    color: "text-blue-500",
    description: "Processo está em análise ou tramitação"
  },
  concluido: {
    label: "Concluído",
    icon: CheckCircle,
    color: "text-green-500",
    description: "Processo foi finalizado"
  },
  arquivado: {
    label: "Arquivado",
    icon: Archive,
    color: "text-gray-500",
    description: "Processo foi arquivado"
  }
};

export function ProcessDetailsInfo({
  priority,
  setPriority,
  departmentId,
  setDepartmentId,
  lawyerId,
  setLawyerId,
  status,
  setStatus
}: ProcessDetailsInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Status do Processo</Label>
          <Select value={status} onValueChange={(value: ProcessStatus) => setStatus(value)}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusConfig).map(([value, config]) => {
                const Icon = config.icon;
                return (
                  <SelectItem 
                    key={value} 
                    value={value}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-4 w-4 ${config.color}`} />
                      <span>{config.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500 mt-1">
            {status && statusConfig[status].description}
          </p>
        </div>

        <div>
          <Label>Prioridade</Label>
          <Select value={priority} onValueChange={(value: ProcessPriority) => setPriority(value)}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Selecione a prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="baixa">Baixa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Departamento Responsável</Label>
          <Select value={departmentId} onValueChange={setDepartmentId}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Selecione o departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Departamento 1</SelectItem>
              <SelectItem value="2">Departamento 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Advogado Responsável</Label>
          <Select value={lawyerId} onValueChange={setLawyerId}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Selecione o advogado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Advogado 1</SelectItem>
              <SelectItem value="2">Advogado 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}