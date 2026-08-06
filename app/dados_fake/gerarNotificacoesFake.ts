import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Notificacao } from "../types/notificacao";
import { getDataAtual } from "../utils/getDataAtual";

const quantidadeNotificacoesFake: number = 100;

// gerar notificações fake na base de dados
const gerarNotificacoesFake = async () => {

  try {
    const notificacoesRef = collection(db, "notificacoes");
    const snapshot = await getDocs(notificacoesRef);

    if (!snapshot.empty) {

      if (snapshot.size >= quantidadeNotificacoesFake) {
        console.log("Não vai ser preciso gerar notificações fake pois já existem muitos dados na base.");

        return;
      }

    }

    const usuariosRef = collection(db, "usuarios");
    const usuariosSnapshot = await getDocs(usuariosRef);

    if (usuariosSnapshot.empty) {
      console.log("Não existem usuários na base de dados.");

      return;
    }

    const idUsuarioUtilizar: string = usuariosSnapshot.docs[ 0 ].id;

    console.log("Atribuir ao usuário: " + idUsuarioUtilizar);

    console.log("Gerando na base de dados " + quantidadeNotificacoesFake + " notificações fake...");

    for (let i: number = 0; i < quantidadeNotificacoesFake; i++) {
      const notificacaoFake: Notificacao = {
        idUsuarioCadastrou: idUsuarioUtilizar,
        dataCadastro: getDataAtual(),
        notificacao: "Lorem Ipsum is a standard dummy text used in graphic design, printing, and web development to fill spaces where actual content will eventually appear. It allows designers and developers to focus on visual elements such as layout, typography, spacing, and formatting without being distracted by meaningful text"
      }

      console.log("Cadastrando a notificação:");
      console.log(notificacaoFake);

      const notificacoesRefCadastro = collection(db, "notificacoes");
      const notificacaoDoc = doc(notificacoesRefCadastro);

      await setDoc(notificacaoDoc, {
        notificacao: notificacaoFake.notificacao,
        data_cadastro: notificacaoFake.dataCadastro,
        id_usuario_cadastrou: notificacaoFake.idUsuarioCadastrou
      });
    }

    console.log("Notificaçoes fake cadastradas com sucesso!");
  } catch (e) {
    console.log(`Erro ao tentar-se gerar notificações fake: ${ e }`);
  }

}

export default gerarNotificacoesFake;