import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

// deletar anotação na base de dados
export async function deletarAnotacaoService(id: string) {

  try {
    await deleteDoc(doc(db, "anotacoes", id));
  } catch (e) {
    console.log("Erro ao tentar-se deletar a anotação: " + e);

    throw e;
  }

}