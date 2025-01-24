import { createContext } from "react";
import { ProcessContextProps } from "./types";

// Apenas a criação do contexto
export const ProcessContext = createContext<ProcessContextProps | null>(null);
