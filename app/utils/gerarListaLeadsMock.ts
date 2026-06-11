import { Lead, TipoPessoaLead } from "../types/lead";

const statusList = [
  "aguardando_qualificacao",
  "qualificado",
  "desqualificado",
  "cliente"
];

const gerarListaLeadsMock = (qtd: number): Lead[] => {
  const leads: Lead[] = [];

  for (let i = 1; i <= qtd; i++) {
    const isPf = i % 2 === 0;

    const base: Lead = {
      id: String(i),
      email: `lead${i}@email.com`,
      telefone: `1199${String(1000000 + i)}`,
      tipoPessoa: isPf ? TipoPessoaLead.pf : TipoPessoaLead.pj,
      status: statusList[i % statusList.length],
      origem: "aplicativo",
      dataCadastro: "11/02/2020"
    };

    if (isPf) {
      leads.push({
        ...base,
        nomeCompleto: `Pessoa ${i}`,
        cpf: `000.000.000-${String(i).padStart(2, "0")}`,
        dataNascimento: `199${i % 10}-0${(i % 9) + 1}-15`,
        genero: i % 2 === 0 ? "masculino" : "feminino",
        endereco: {
          leadId: base.id,
          cep: "01001-000",
          logradouro: "Rua Exemplo",
          complemento: "",
          cidade: "São Paulo",
          bairro: "Centro",
          numero: String(i),
          estado: "SP"
        }
      });
    } else {
      leads.push({
        ...base,
        razaoSocial: `Empresa ${i} Ltda`,
        cnpj: `00.000.000/000${i % 10}-00`,
        dataFundacao: `200${i % 10}-05-20`,
        endereco: {
          leadId: base.id,
          cep: "20040-020",
          logradouro: "Avenida Empresarial",
          complemento: "Sala " + i,
          cidade: "Rio de Janeiro",
          bairro: "Centro",
          numero: String(100 + i),
          estado: "RJ"
        }
      });
    }

  }

  return leads;
}

export default gerarListaLeadsMock;