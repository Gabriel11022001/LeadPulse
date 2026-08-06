import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import cadastrarLeadService from "../service/cadastrarLeadService";
import { Lead, TipoPessoaLead } from "../types/lead";
import { getDataAtual } from "../utils/getDataAtual";

const quantidadeLeadsFake = 100;

const nomes = [
  "João", "Maria", "Pedro", "Ana", "Lucas",
  "Julia", "Rafael", "Amanda", "Carlos", "Fernanda"
];

const sobrenomes = [
  "Silva", "Souza", "Oliveira", "Costa",
  "Santos", "Ferreira", "Almeida", "Pereira"
];

const status = [
  "aguardando_qualificacao",
  "qualificado",
  "cliente",
  "desqualificado"
];

const origens = [
  "Instagram",
  "Facebook",
  "Google",
  "Site",
  "Indicação"
];

const gerarLeadsFake = async () => {
  try {

    const leadsRef = collection(db, "leads");
    const leadsSnapshot = await getDocs(leadsRef);

    if (leadsSnapshot.size >= quantidadeLeadsFake) {
      console.log("Já existem muitos leads na base.");

      return;
    }

    const usuariosRef = collection(db, "usuarios");
    const usuariosSnapshot = await getDocs(usuariosRef);

    if (usuariosSnapshot.empty) {
      console.log("Nenhum usuário encontrado.");

      return;
    }

    const idUsuario = usuariosSnapshot.docs[0].id;

    for (let i = 0; i < quantidadeLeadsFake; i++) {

      const primeiroNome =
        nomes[Math.floor(Math.random() * nomes.length)];

      const sobrenome =
        sobrenomes[Math.floor(Math.random() * sobrenomes.length)];

      const nomeCompleto = `${primeiroNome} ${sobrenome}`;

      const lead: Lead = {
        id: "",
        tipoPessoa: TipoPessoaLead.pf,
        nomeCompleto,
        cpf: `${Math.floor(10000000000 + Math.random() * 90000000000)}`,
        rg: `${Math.floor(1000000 + Math.random() * 9000000)}`,
        dataNascimento: "01/01/1995",
        genero: Math.random() > 0.5 ? "Masculino" : "Feminino",
        telefone: `(${Math.floor(11 + Math.random() * 8)}) 9${Math.floor(10000000 + Math.random() * 90000000)}`,
        email:
          nomeCompleto
            .toLowerCase()
            .replace(/ /g, ".") +
          "@gmail.com",
        origem: origens[Math.floor(Math.random() * origens.length)],
        status: status[Math.floor(Math.random() * status.length)],
        dataCadastro: getDataAtual(),
        idUsuario,
        endereco: {
          cep: "17690-000",
          logradouro: "Rua das Flores",
          numero: `${Math.floor(Math.random() * 900) + 1}`,
          bairro: "Centro",
          cidade: "Bastos",
          estado: "SP",
          complemento: "",
          leadId: ""
        }
      };

      console.log(`Gerando lead ${i + 1}`);

      await cadastrarLeadService(lead);
    }

    console.log("Leads fake cadastrados com sucesso!");

  } catch (e) {

    console.log(e);

  }
};

export default gerarLeadsFake;