import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Lead, TipoPessoaLead } from "../types/lead";

// buscar lead pelo id
const buscarLeadPeloIdService = async (id: string) => {

  try {
    const leadRef = doc(db, "leads", id);

    const snapshot = await getDoc(leadRef);

    if (!snapshot.exists) {
      console.log("Não foi encontrado um usuário com o id: " + id);

      return null;
    }

    const data = snapshot.data();

    // consultar as anotações do lead

    const lead: Lead = {
      id: snapshot.id ?? "",
      tipoPessoa: data?.tipo_pessoa === "pf" ? TipoPessoaLead.pf : TipoPessoaLead.pj,
      email: data?.email,
      telefone: data?.telefone,
      dataCadastro: data?.data_cadastro,
      origem: data?.origem,
      status: data?.status,
      cpf: data?.cpf ?? "",
      nomeCompleto: data?.nome_completo ?? "",
      dataNascimento: data?.data_nascimento ?? "",
      genero: data?.genero ?? "",
      cnpj: data?.cnpj ?? "",
      dataFundacao: data?.data_fundacao ?? "",
      razaoSocial: data?.razao_social ?? "",
      rg: data?.rg ?? "",
      idUsuario: data?.id_usuario ?? "",
      endereco: {
        cep: data?.cep ?? "",
        complemento: data?.complemento ?? "",
        logradouro: data?.logradouro ?? "",
        bairro: data?.bairro ?? "",
        cidade: data?.cidade ?? "",
        estado: data?.estado ?? "",
        numero: data?.numero ?? "",
        leadId: snapshot.id ?? ""
      },
      onApresentarDadosLead: function () {
        // apresentar os dados do lead encontrado
        console.log("Lead:");
        console.log(this);
      }
    }

    if (lead.onApresentarDadosLead) {
      lead.onApresentarDadosLead();
    }

    return lead;
  } catch (e) {
    console.log("Erro ao tentar-se buscar o lead pelo id: " + id);

    throw e;
  }

}

export default buscarLeadPeloIdService;