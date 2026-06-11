import axios from "axios";
import { Endereco } from "../types/lead";

// consultar o endereço pelo cep
const consultarEnderecoPeloCepService = async (cep: string) => {
  let endereco: Endereco | null = null;

  const cepConsultar: string = cep.trim().replace("-", "");

  console.log("Consultar cep: " + cepConsultar);

  try {
    const respConsultarEndereco = await axios.get(`https://viacep.com.br/ws/${ cepConsultar }/json/`);

    if (respConsultarEndereco.status == 200 && !Object.keys(respConsultarEndereco.data).includes("erro")) {
      endereco = {
        cep: respConsultarEndereco.data.cep,
        logradouro: respConsultarEndereco.data.logradouro,
        complemento: respConsultarEndereco.data.complemento,
        bairro: respConsultarEndereco.data.bairro,
        cidade: respConsultarEndereco.data.localidade,
        estado: respConsultarEndereco.data.estado,
        leadId: "",
        numero: ""
      };
    }

  } catch (e) {
    console.log("Erro ao tentar-se consultar o endereço pelo cep: " + e);
  }

  return endereco;
}

export default consultarEnderecoPeloCepService;