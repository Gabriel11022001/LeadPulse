export interface Usuario {

  id: string;
  nomeCompleto: string;
  email: string;
  senha?: string;
  dataCadastro: string;
  dataUltimoLogin?: string;
  ativo: boolean;
  telefone: string;

}