import { BaseProcess } from "@/types/process";

// Extensão de BaseProcess (se necessário)
export interface Process extends BaseProcess {
  id: string;
}

// Estrutura do contexto
export interface ProcessContextProps {
  process: Process | null;
  setProcess: (process: Process | null) => void;
}
