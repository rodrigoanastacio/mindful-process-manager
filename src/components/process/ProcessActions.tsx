import { FileText, FileDown, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProcessActionsProps {
  onArchive?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
}

export const ProcessActions = ({ onArchive, onDelete, onExport }: ProcessActionsProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="hover:bg-gray-100 p-2 rounded-full transition-colors">
      <MoreVertical className="h-5 w-5 text-gray-500" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={onArchive}>
        <FileText className="h-4 w-4 mr-2" />
        Arquivar
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onExport}>
        <FileDown className="h-4 w-4 mr-2" />
        Exportar
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onDelete} className="text-red-600">
        Excluir
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);