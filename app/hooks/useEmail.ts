import { useState } from "react";

export const useEmail = () => {

  const [ email, setEmail ] = useState<string>("");
  const [ erroEmail, setErroEmail ] = useState<string>("");

  const onDigitarEmail = (emailDigitado: string): void => {
    setEmail(emailDigitado.trim());
    setErroEmail("");

    if (emailDigitado.trim().length === 0) {
      setErroEmail("Informe o e-mail.");
    }

  }

  return {
    email,
    erroEmail,
    onDigitarEmail
  }
}
