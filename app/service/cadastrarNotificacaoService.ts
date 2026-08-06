import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Notificacao } from "../types/notificacao";

// cadastrar notificação na base de dados
const cadastrarNotificacaoService = async (notificacao: Notificacao) => {

  try {
    const notificacoesRefCadastro = collection(db, "notificacoes");
    const notificacaoDoc = doc(notificacoesRefCadastro);
    
    await setDoc(notificacaoDoc, {
      notificacao: notificacao.notificacao,
      data_cadastro: notificacao.dataCadastro,
      id_usuario_cadastrou: notificacao.idUsuarioCadastrou
    });

    notificacao.id = notificacaoDoc.id ?? "";

    console.log("Notificação cadastrada com sucesso!");
    console.log(notificacao);
  } catch (e) {

    throw e;
  }

}

export default cadastrarNotificacaoService;