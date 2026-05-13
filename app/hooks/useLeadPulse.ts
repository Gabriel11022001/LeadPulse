import { LeadPulseContextApp } from "@/context";
import { useContext } from "react";

// contexto do app
const useLeadPulse = () => {

  const context = useContext(LeadPulseContextApp);

  if (!context) {

    throw Error("Erro no contexto LeadPulseContextApp!");
  }

  return context;
}

export default useLeadPulse;