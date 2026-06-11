import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Anotacao } from "../types/lead";

// cadastrar anotacao na base de dados
const cadastrarAnotacaoService = async ({
  anotacao,
  dataCadastro,
  leadId
}: Anotacao) => {

  try {
    const anotacaoRef = collection(db, "anotacoes");
        
    const anotacaoDoc = doc(anotacaoRef);

    await setDoc(anotacaoDoc, {
      anotacao: anotacao,
      lead_id: leadId,
      data_cadastro: dataCadastro
    });

    console.log("Anotação cadastrada com sucesso!");
  } catch (e) {
    console.log(`Erro ao tentar-se cadastrar a anotação do lead na base de dados: ${ e }`);

    throw e;
  }

}

export default cadastrarAnotacaoService;