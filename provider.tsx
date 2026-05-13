import { useState } from "react";
import { Lead } from "./app/types/lead";
import { LeadPulseContextApp } from "./context";

const LeadPulseProvider = ({ children }: any) => {

  const [ lead, setLead ] = useState<Lead | null>(null);

  // atualizar os dados do lead no contexto
  const atualizarDadosLead = (leadAtualizado: Lead): void => {
    setLead(leadAtualizado);

    console.log("Dados atualizados do lead:");
    console.log(leadAtualizado);
  }

  // remover os dados do lead no contexto
  const limparDadosLead = (): void => {
    setLead(null);
  }

  return <LeadPulseContextApp.Provider
    value={ {
      lead,
      atualizarDadosLead,
      limparDadosLead
    } }>
    { children }
  </LeadPulseContextApp.Provider>
}

export default LeadPulseProvider;