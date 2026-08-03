import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Lead } from "../types/lead";

// redistribuir leads para o usuário
const redistribuirLeadsService = async (idUsuario: string, leads: Array<Lead | null>) => {

  try {
    
    for (const lead of leads) {

      if (lead) {
        const leadRef = doc(db, "leads", lead.id ?? "");
        
        await updateDoc(leadRef, {
          id_usuario: idUsuario ?? "",
        });

        console.log(`Lead id ${ lead.id ?? "" } distribuido para o usuário ${ idUsuario }`);
      }

    }

  } catch (e) {

    throw e;
  }

}

export default redistribuirLeadsService;