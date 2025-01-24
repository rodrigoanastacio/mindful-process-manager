import { useContext } from "react";
import { ProcessContext } from "./ProcessContext";
import { ERROR_MESSAGES } from "./constants";

export const useProcess = () => {
  const context = useContext(ProcessContext);
  if (!context) {
    throw new Error(ERROR_MESSAGES.CONTEXT_NOT_FOUND);
  }
  return context;
};
