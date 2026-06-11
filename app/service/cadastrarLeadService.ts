import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Lead, TipoPessoaLead } from "../types/lead";

// cadastrar o lead
const cadastrarLeadService = async (lead: Lead | null) => {

  if (!lead) {

    throw new Error("Objeto lead não informado!");
  }

  try {
    const leadsRef = collection(db, "leads");
    
    const leadDoc = doc(leadsRef);

    const isPf: boolean = lead.tipoPessoa === TipoPessoaLead.pf;

    await setDoc(leadDoc, {
      tipo_pessoa: isPf ? "pf" : "pj",
      email: lead.email,
      telefone: lead.telefone,
      data_cadastro: lead.dataCadastro,
      id_usuario: lead.idUsuario ?? "",
      origem: lead.origem,
      status: lead.status,
      cpf: isPf ? lead.cpf : lead.cnpj,
      rg: isPf ? lead.rg : "",
      nome_completo: isPf ? lead.nomeCompleto : "",
      data_nascimento: isPf ? lead.dataNascimento : "",
      genero: isPf ? lead.genero : "",
      cnpj: !isPf ? lead.cnpj : "",
      razao_social: !isPf ? lead.razaoSocial : "",
      data_fundacao: !isPf ? lead.dataFundacao : "",
      cep: lead.endereco?.cep ?? "",
      complemento: lead.endereco?.complemento ?? "",
      logradouro: lead.endereco?.logradouro ?? "",
      cidade: lead.endereco?.cidade ?? "",
      bairro: lead.endereco?.bairro ?? "",
      numero: lead.endereco?.numero ?? "",
      estado: lead.endereco?.estado ?? ""
    });

    console.log("Lead cadastrado com sucesso na base de dados!");

    lead.id = leadDoc.id ?? "";
  } catch (e) {
    console.log(`Erro ao tentar-se cadastrar o lead: ${ e }`);

    throw e;
  }

}

export default cadastrarLeadService;