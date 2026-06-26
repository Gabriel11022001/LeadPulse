import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Usuario } from "../types/usuario";

// buscar o usuário pelo id e senha
const buscarUsuarioPeloIdSenha = async (id: string, senha: string) => {

  try {
    console.log("id: " + id);
    console.log("senha: " + senha);
    const usuarioRef = doc(db, "usuarios", id);
  
    const snapshot = await getDoc(usuarioRef);

    if (!snapshot.exists) {
      console.log("Não foi encontrado o usuário com o id e senha informados.");
    
      return null;
    }
    
    const dados = snapshot.data();

    if (dados) {

      if (dados.senha === senha) {
        const usuario: Usuario = {
          id: snapshot.id ?? "",
          ativo: dados.ativo,
          dataCadastro: dados.data_cadastro,
          email: dados.email,
          telefone: dados.telefone,
          nomeCompleto: dados.nome_completo
        }

        console.log("Usuário encontrado com sucesso!");

        return usuario;
      }

    }

    return null;
  } catch (e) {
    console.log("Erro ao tentar-se buscar o usuário pelo id e senha: " + e);

    throw e;
  }

}

export default buscarUsuarioPeloIdSenha;