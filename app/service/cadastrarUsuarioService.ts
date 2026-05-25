import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Usuario } from "../types/usuario";

// cadastrar usuário no firestore
const cadastrarUsuarioService = async (usuarioCadastrar: Usuario) => {

  try {
    const usuariosRef = collection(db, "usuarios");

    const usuarioDoc = doc(usuariosRef);

    await setDoc(usuarioDoc, {
      nome_completo: usuarioCadastrar.nomeCompleto,
      email: usuarioCadastrar.email.toLowerCase().trim(),
      telefone: usuarioCadastrar.telefone,
      ativo: usuarioCadastrar.ativo,
      data_cadastro: usuarioCadastrar.dataCadastro,
      data_ultimo_login: usuarioCadastrar.dataUltimoLogin,
      senha: usuarioCadastrar.senha
    });

    usuarioCadastrar.id = usuarioDoc.id ?? "";

    console.log("Usuário cadastrado com sucesso");
  } catch (e) {
    console.log("Erro ao tentar-se cadastrar o usuário: " + e);

    throw e;
  }

}

export default cadastrarUsuarioService;