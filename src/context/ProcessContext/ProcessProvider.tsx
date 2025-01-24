import React, { useState } from "react";
import { ProcessContext } from "./ProcessContext";
import { Process } from "./types";

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
