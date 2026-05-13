import { createContext } from "react";
import { Lead } from "./app/types/lead";

export interface LeadPulseContextType {

  lead: Lead | null;
  atualizarDadosLead: (leadAtualizado: Lead) => void;
  limparDadosLead: () => void;

}

export const LeadPulseContextApp = createContext<LeadPulseContextType | undefined>(undefined);