import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Lead, TipoPessoaLead } from "../types/lead";

export type FiltroLeads = {

  status?: string;

}

// filtrar os leads na base de dados
const filtrarLeadsService = async (filtro?: FiltroLeads) => {

  try {
    const leads: Array<Lead> = [];

    const leadsRef = collection(db, "leads");

    let q = null;

    let statusFiltro: string = (filtro && filtro.status && filtro.status != "todos") ? filtro.status : ""; 

    if (filtro) {
      console.log("Aplicar filtro na listagem de leads...");
      console.log(filtro);
      // aplicar filtro de texto
      q = query(
        leadsRef,
        statusFiltro != "" ? where("status", "==", statusFiltro) : where("status", "!=", "")
      );
    } else {
      // buscar todos
      q = query(leadsRef);
    }

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("Nenhum lead encontrado!");
    } else {
      snapshot.docs.forEach((leadDoc) => {
        leads.push({
          id: leadDoc.id ?? "",
          email: leadDoc.data().email ?? "",
          telefone: leadDoc.data().telefone,
          dataCadastro: leadDoc.data().data_cadastro,
          origem: leadDoc.data().origem,
          status: leadDoc.data().status,
          tipoPessoa: leadDoc.data().tipo_pessoa === "pf" ? TipoPessoaLead.pf : TipoPessoaLead.pj,
          idUsuario: leadDoc.data().id_usuario,
          cpf: leadDoc.data().cpf ?? "",
          nomeCompleto: leadDoc.data().nome_completo ?? "",
          genero: leadDoc.data().genero ?? "",
          dataNascimento: leadDoc.data().data_nascimento ?? "",
          rg: leadDoc.data().rg ?? "",
          dataFundacao: leadDoc.data().data_fundacao ?? "",
          cnpj: leadDoc.data().cnpj ?? "",
          razaoSocial: leadDoc.data().razao_social ?? "",
          endereco: {
            cep: leadDoc.data().cep ?? "",
            complemento: leadDoc.data().complemento ?? "",
            logradouro: leadDoc.data().logradouro ?? "",
            cidade: leadDoc.data().cidade ?? "",
            bairro: leadDoc.data().bairro ?? "",
            estado: leadDoc.data().estado ?? "",
            numero: leadDoc.data().numero ?? "",
            leadId: leadDoc.id ?? ""
          }
        });
      });
    }

    return leads;
  } catch (e) {
    console.log("Erro ao tentar-se filtrar os leads: " + e);

    throw e;
  }

}

export default filtrarLeadsService;