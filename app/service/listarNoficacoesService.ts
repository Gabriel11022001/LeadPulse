import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Notificacao } from "../types/notificacao";
import { Usuario } from "../types/usuario";

// listar notificações
export default async function listarNotificacoesService() {

  try {
    const notificacoesRef = collection(db, "notificacoes");
    const snapshot = await getDocs(notificacoesRef);

    if (snapshot.empty) {

      return [];
    }

    const notificacoes: Array<Notificacao> = [];

    snapshot.forEach((notificacao) => {
      const doc = notificacao.data();
      
      notificacoes.push({
        id: notificacao.id ?? "",
        dataCadastro: doc.data_cadastro,
        notificacao: doc.notificacao,
        idUsuarioCadastrou: doc.id_usuario_cadastrou
      });
    });

    for (const notificacao of notificacoes) {
      const usuarioRef = doc(db, "usuarios", notificacao.idUsuarioCadastrou);
      const usuarioSnapshot = await getDoc(usuarioRef);

      if (usuarioSnapshot.exists()) {
        const usuario = usuarioSnapshot.data();
        
        const usuarioNotificacao: Usuario = {
          id: usuarioSnapshot.id ?? "",
          nomeCompleto: usuario.nome_completo,
          email: usuario.email,
          ativo: usuario.ativo,
          dataCadastro: usuario.data_cadastro,
          telefone: usuario.telefone
        }

        notificacao.usuarioCadastrou = usuarioNotificacao;

        console.log(notificacao);
      }
      
    }

    // ordenar pela data de cadastro de forma decrescente
    notificacoes.sort((a, b) => {

      return parseDataCadastro(b.dataCadastro).getTime() - parseDataCadastro(a.dataCadastro).getTime();
    });

    return notificacoes;
  } catch (e) {

    throw e;
  }

}

const parseDataCadastro = (data: string): Date => {
  const [dataPart, horaPart] = data.split(" às ");
  const [dia, mes, ano] = dataPart.split("/");

  return new Date(`${ano}-${mes}-${dia}T${horaPart}:00`);
}
