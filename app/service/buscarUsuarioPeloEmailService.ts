import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Usuario } from "../types/usuario";

// buscar o usuário pelo e-mail
export const buscarUsuarioPeloEmailService = async (email: string) => {

  try {
    const usuariosRef = collection(db, "usuarios");

    const q = query(
      usuariosRef,
      where("email", "==", email)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("Não foi encontrado um usuário com o e-mail: " + email);

      return null;
    }

    const doc = snapshot.docs[0];

    const usuario: Usuario = {
      id: doc.id,
      nomeCompleto: doc.data().nome_completo,
      email: doc.data().email,
      telefone: doc.data().telefone,
      ativo: doc.data().ativo,
      dataCadastro: doc.data().data_cadastro,
      dataUltimoLogin: doc.data().data_ultimo_login,
      senha: doc.data().senha
    }

    console.log("Usuário encontrado com sucesso com o e-mail: " + email);

    return usuario;
  } catch (e) {
    console.log("Erro ao tentar-se consultar o usuário pelo e-mail: " + e);

    throw e;
  }

}