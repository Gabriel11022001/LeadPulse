import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { buscarUsuarioPeloEmailService } from "../service/buscarUsuarioPeloEmailService";
import { Usuario } from "../types/usuario";

const useAuth = () => {

  const [ carregandoAuth, setCarregandoAuth ] = useState<boolean>(false);

  // autenticar usuário
  const autenticar = async (email: string, senha: string) => {

    try {
      console.log("Efetuar login para o e-mail: " + email);
      setCarregandoAuth(true);

      const usuario: Usuario | null = await buscarUsuarioPeloEmailService(email);

      if (usuario === null) {

        return null;
      }

      if (usuario.senha != senha) {

        return null;
      }

      // salvra os dados do usuário logado na sessão
      await salvarUsuarioSessao(
        usuario
      );

      return usuario;
    } catch (e) {
      console.log(`Erro na autenticação: ${ e }`);

      throw e;
    } finally {
      setCarregandoAuth(false);
    }

  }

  const salvarUsuarioSessao = async ({ id, nomeCompleto, email }: Usuario) => {
    await SecureStore.setItemAsync('id_usuario_logado', id);
    await SecureStore.setItemAsync('nome_completo_usuario_logado', nomeCompleto);
    await SecureStore.setItemAsync('email_usuario_logado', email);

    console.log("Dados do usuário logado salvos com sucesso em memória!");
  }

  // obter os dados do usuário logado
  const getUsuarioLogado = async () => {
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
  
  // realizar logout do usuário
  const logout = async () => {

  }

  return {
    autenticar,
    getUsuarioLogado,
    logout,
    carregandoAuth
  }
}

export default useAuth;