import React, { createContext, useContext, useState } from "react";
import { BaseProcess } from "@/types/process";

interface Process extends BaseProcess {}

interface ProcessContextProps {
  process: Process | null;
  setProcess: (process: Process | null) => void;
}

const ProcessContext = createContext<ProcessContextProps | null>(null);

export const ProcessProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [process, setProcess] = useState<Process | null>(null);

  return (
    <ProcessContext.Provider value={{ process, setProcess }}>
      {children}
    </ProcessContext.Provider>
  );
};

export const useProcess = () => {
  const context = useContext(ProcessContext);
  if (!context) {
    throw new Error("useProcess must be used within a ProcessProvider");
  }
  return context;
};
