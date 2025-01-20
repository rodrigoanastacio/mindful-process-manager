import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProcessFilterProps {
  onSearch: (value: string) => void;
  onStatusFilter: (value: string) => void;
}

export const ProcessFilter = ({
  onSearch,
  onStatusFilter,
}: ProcessFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por título ou protocolo..."
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Select onValueChange={onStatusFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg rounded-lg">
          <SelectItem className="cursor-pointer" value="all">
            Todos os Status
          </SelectItem>
          <SelectItem className="cursor-pointer" value="pending">
            Pendente
          </SelectItem>
          <SelectItem className="cursor-pointer" value="active">
            Em Andamento
          </SelectItem>
          <SelectItem className="cursor-pointer" value="completed">
            Concluído
          </SelectItem>
          <SelectItem className="cursor-pointer" value="archived">
            Arquivado
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
