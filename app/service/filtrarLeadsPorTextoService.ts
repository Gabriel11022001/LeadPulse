import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Lead, TipoPessoaLead } from "../types/lead";

// filtrar os leads por texto
const filtrarLeadsPorTextoService = async (texto: string) => {

  try {
    const leads: Array<Lead> = [];

    const snapshot = await getDocs(collection(db, "leads"));

    if (!snapshot.empty) {
      snapshot.forEach((lead) => {
        const nome: string = lead.data().tipo_pessoa === "pf" ? lead.data().nome_completo : lead.data().razao_social;
        const email: string = lead.data().email;
        const telefone: string = lead.data().telefone;

        if (
          nome.trim().toLocaleLowerCase().includes(texto.toLocaleLowerCase()) 
          || email.trim().toLocaleLowerCase().includes(texto.toLocaleLowerCase()) 
          || telefone.trim().toLocaleLowerCase().includes(texto.toLocaleLowerCase())) {
          console.log("Adicionar o lead " + nome);
          leads.push({
            id: lead.id ?? "",
            tipoPessoa: lead.data().tipo_pessoa === "pf" ? TipoPessoaLead.pf : TipoPessoaLead.pj,
            dataCadastro: lead.data().data_cadastro,
            email: lead.data().email,
            telefone: lead.data().telefone,
            origem: lead.data().origem,
            status: lead.data().status,
            idUsuario: lead.data().id_usuario,
            anotacoes: [],
            endereco: {
              cep: lead.data().cep,
              complemento: lead.data().complemento,
              logradouro: lead.data().logradouro,
              bairro: lead.data().bairro,
              cidade: lead.data().cidade,
              estado: lead.data().estado,
              leadId: lead.id ?? "",
              numero: lead.data().numero
            },
            cpf: lead.data().cpf ?? "",
            nomeCompleto: lead.data().nome_completo ?? "",
            genero: lead.data().genero ?? "",
            dataNascimento: lead.data().data_nascimento ?? "",
            rg: lead.data().rg ?? "",
            cnpj: lead.data().cnpj ?? "",
            razaoSocial: lead.data().razao_social ?? "",
            dataFundacao: lead.data().dataFundacao ?? ""
          });
        }

      });
    }

    return {
      quantidade_encontrados: leads.length,
      leads: leads
    };
  } catch (e) {
    console.log(`Erro ao tentar-se filtrar os leads por texto: ${ e }`);

    throw e;
  }

}

export default filtrarLeadsPorTextoService;