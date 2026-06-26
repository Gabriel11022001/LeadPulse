import { Usuario } from "./usuario";

export interface Notificacao {

  id?: string;
  dataCadastro: string;
  notificacao: string;
  idUsuarioCadastrou: string;
  usuarioCadastrou?: Usuario;

}