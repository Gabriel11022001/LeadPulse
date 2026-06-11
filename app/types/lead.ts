export type Endereco = {

  cep: string;
  logradouro: string;
  complemento: string;
  cidade: string;
  bairro: string;
  numero: string;
  estado: string;
  leadId: string;

}

export type Anotacao = {

  id?: string;
  leadId?: string;
  anotacao: string;
  dataCadastro?: string;

}

export enum TipoPessoaLead {

  pf,
  pj

}

export interface Lead {

  id: string;
  idUsuario?: string;
  email: string;
  telefone: string;
  endereco?: Endereco;
  tipoPessoa: TipoPessoaLead;
  status: string;
  origem: string;
  dataCadastro: string;
  anotacoes?: Array<Anotacao>;

  // pf
  nomeCompleto?: string;
  cpf?: string;
  dataNascimento?: string;
  genero?: string;
  rg?: string;

  // pj
  razaoSocial?: string;
  cnpj?: string;
  dataFundacao?: string;

  onApresentarDadosLead?: () => void;

}