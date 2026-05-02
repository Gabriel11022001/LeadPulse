import { useState } from "react";

const useTelefone = () => {

  const [ telefone, setTelefone ] = useState<string>("");
  const [ erroTelefone, setErroTelefone ] = useState<string>("");

  const onDigitarTelefone = (telefoneDigitado: string): void => {
    setTelefone(telefoneDigitado.trim());
    setErroTelefone("");
  
    if (telefoneDigitado.trim().length === 0) {
      setErroTelefone("Informe o telefone.");
    }
  
  }

  return {
    telefone,
    erroTelefone,
    onDigitarTelefone
  }
}

export default useTelefone;