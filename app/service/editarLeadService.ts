import { Lead } from "../types/lead";

// editar o lead na base de dados
const editarLeadService = async (lead: Lead) => {

  try {
    
  } catch (e) {
    console.log(`Erro ao tentar-se editar o lead: ${ e }`);

    throw e;
  }

}

export default editarLeadService;