import * as SecureStore from "expo-secure-store";
import { Usuario } from "../types/usuario";

// obter o usuário logado no app
const getUsuarioLogadoApp = async () => {
  const idUsuario: string = await SecureStore.getItemAsync("id_usuario_logado") ?? "";
  const nomeUsuario: string = await SecureStore.getItemAsync("nome_completo_usuario_logado") ?? "";
  const emailUsuario: string = await SecureStore.getItemAsync("email_usuario_logado") ?? "";

  const usuario: Usuario = {
    id: idUsuario,
    ativo: true,
    dataCadastro: "",
    email: emailUsuario,
    nomeCompleto: nomeUsuario,
    telefone: "",
    dataUltimoLogin: "",
    senha: ""
  }

  return usuario;
}

export { getUsuarioLogadoApp };

