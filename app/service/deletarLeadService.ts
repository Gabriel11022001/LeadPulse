import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Anotacao } from "../types/lead";
import { listarAnotacoesService } from "./listarAnotacoesService";

// deletar o lead na base de dados
const deletarLeadService = async (id: string) => {

  try {
    // deletar as anotações do lead
    const anotacoes: Array<Anotacao> = await listarAnotacoesService(id);

    if (anotacoes.length > 0) {
      console.log("Deletando as anotações do lead na base de dados...");

      for (const anotacao of anotacoes) {
        await deleteDoc(doc(db, "anotacoes", anotacao.id ?? ""));
      }

    }

    await deleteDoc(doc(db, "leads", id ?? ""));

    console.log("Lead deletado com sucesso!");
  } catch (e) {
    console.log(`Erro ao tentar-se deletar o lead na base de dados: ` + e);

    throw e;
  }

}

export default deletarLeadService;