import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Anotacao } from "../types/lead";

// listar as anotações do lead
export async function listarAnotacoesService(idLead: string) {

  try {
    const anotacoes: Anotacao[] = [];

    const anotacoesRef = collection(db, "anotacoes");

    const q = query(
      anotacoesRef,
      where("lead_id", "==", idLead)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      snapshot.forEach((anotacao) => {
        anotacoes.push({
          id: anotacao.id ?? "",
          anotacao: anotacao.data().anotacao,
          dataCadastro: anotacao.data().data_cadastro,
          leadId: anotacao.data().lead_id
        });
      });
    } else {
      console.log("Não existem anotações cadastradas na base de dados!");
    }

    return anotacoes;
  } catch (e) {
    console.log("Erro ao tentar-se listar as anotações do lead: " + e);

    throw e;
  }

}