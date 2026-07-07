import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// alterar o status do lead
const alterarStatusLeadService = async (id: string, novoStatus: string) => {

  try {
    console.log("Alterando o status do lead para:", novoStatus);

    const leadRef = doc(db, "leads", id);

    await updateDoc(leadRef, {
      status: novoStatus,
    });

    console.log("Status alterado com sucesso!");
  } catch (e) {
    console.log("Erro ao alterar status do lead:", e);

    throw e;
  }

};

export default alterarStatusLeadService;