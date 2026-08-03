import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import FiltroLeadsType from "../types/filtroLeads";
import { Lead, TipoPessoaLead } from "../types/lead";
import { Usuario } from "../types/usuario";
import { getUsuarioLogadoApp } from "../utils/getUsuarioLogado";

const filtrarLeadsParametrosService = async (filtro: FiltroLeadsType) => {

  try {
    const leads: Array<Lead> = [];
    const usuarioLogadoApp: Usuario = await getUsuarioLogadoApp();

    const snapshot = await getDocs(collection(db, "leads"));

    if (!snapshot.empty) {
      snapshot.forEach((lead) => {
        const nome: string = lead.data().tipo_pessoa === "pf" ? lead.data().nome_completo : lead.data().razao_social;
        const email: string = lead.data().email;
        const telefone: string = lead.data().telefone;
        const documento: string = lead.data().tipo_pessoa === "pf" ? lead.data().cpf : lead.data().cnpj;
        const idUsuarioLead: string = lead.data().id_usuario;

        let filtrado: boolean = false;

        if (filtro.nome.trim().length > 0
        && nome.trim().toLowerCase().includes(filtro.nome.trim().toLowerCase())) {
          filtrado = true;
        }

        if (filtro.documento.trim().length > 0 
        && documento.trim().toLowerCase().includes(filtro.documento.trim().toLowerCase())) {
          filtrado = true;
        }

        if (filtro.email.trim().length > 0
        && email.trim().toLowerCase().includes(filtro.email.trim().toLowerCase())) {
          filtrado = true;
        }

        if (filtro.telefone.trim().length > 0 
        && telefone.trim().toLowerCase().includes(filtro.telefone.trim().toLowerCase())) {
          filtrado = true;
        }

        // só filtrar os leads do usuário logado
        if (filtrado && usuarioLogadoApp.id === idUsuarioLead) {
          console.log("Lead filtrado: " + nome);
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

    return leads;
  } catch (e) {
    console.log(`Erro ao tentar-se filtrar os leads por texto: ${ e }`);

    throw e;
  }

}

export default filtrarLeadsParametrosService;