import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ProcessAdvancedFilters = () => {
  return (
    <div className="flex gap-4">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="em_andamento">Em Andamento</SelectItem>
          <SelectItem value="concluido">Concluído</SelectItem>
          <SelectItem value="arquivado">Arquivado</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Prioridade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alta">Alta</SelectItem>
          <SelectItem value="media">Média</SelectItem>
          <SelectItem value="baixa">Baixa</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};