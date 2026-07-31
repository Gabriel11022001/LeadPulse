import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Usuario } from "../types/usuario";

// listar os usuários ativos
const listarUsuariosAtivosService = async () => {

  try {
    const usuariosRef = collection(db, "usuarios");
    const snapshot = await getDocs(usuariosRef);
    
    if (snapshot.empty) {
    
      return [];
    }

    const usuarios: Array<Usuario> = [];

    snapshot.forEach((usuario) => {
      
      if (usuario.data().ativo) {
        usuarios.push({
          id: usuario.id ?? "",
          ativo: usuario.data().ativo,
          dataCadastro: usuario.data().data_cadastro,
          email: usuario.data().email,
          nomeCompleto: usuario.data().nome_completo,
          telefone: usuario.data().telefone
        });
      }

    });

    return usuarios;
  } catch (e) {
    console.log(`Erro ao tentar-se listar os usuários ativos: ${ e }`);

    throw e;
  }

}

export default listarUsuariosAtivosService;