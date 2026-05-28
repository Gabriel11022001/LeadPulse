import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Lead, TipoPessoaLead } from "../types/lead";

// buscar lead pelo e-mail
const buscarLeadPeloEmailService = async (email: string, tipoPessoa: TipoPessoaLead) => {

  try {
    const leadsRef = collection(db, "leads");

    const q = query(
      leadsRef,
      where("email", "==", email)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("Não foi encontrado um usuário com o e-mail: " + email);

      return null;
    }

    const doc = snapshot.docs[0];

    // consultar as anotações do lead

    const lead: Lead = {
      id: doc.id ?? "",
      tipoPessoa: tipoPessoa,
      email: doc.data().email,
      telefone: doc.data().telefone,
      dataCadastro: doc.data().data_cadastro,
      origem: doc.data().origem,
      status: doc.data().status,
      cpf: doc.data().cpf ?? "",
      nomeCompleto: doc.data().nome_completo ?? "",
      dataNascimento: doc.data().data_nascimento ?? "",
      genero: doc.data().genero ?? "",
      cnpj: doc.data().cnpj ?? "",
      dataFundacao: doc.data().data_fundacao ?? "",
      razaoSocial: doc.data().razao_social ?? "",
      rg: doc.data().rg ?? "",
      idUsuario: doc.data().id_usuario ?? "",
      endereco: {
        cep: doc.data().cep ?? "",
        complemento: doc.data().complemento ?? "",
        logradouro: doc.data().logradouro ?? "",
        bairro: doc.data().bairro ?? "",
        cidade: doc.data().cidade ?? "",
        estado: doc.data().estado ?? "",
        numero: doc.data().numero ?? "",
        leadId: doc.id ?? ""
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
    console.log("Erro ao tentar-se buscar o lead pelo e-mail: " + email);

    throw e;
  }

}

export default buscarLeadPeloEmailService;