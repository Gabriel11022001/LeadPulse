import { useState } from "react";

const useSenhaConfirmarSenha = () => {

  const [ senha, setSenha ] = useState<string>("");
  const [ senhaConfirmar, setSenhaConfirmar ] = useState<string>("");
  const [ erroSenha, setErroSenha ] = useState<string>("");
  const [ erroSenhaConfirmar, setErroSenhaConfirmar ] = useState<string>("");

  const validarSenha = (senhaValidar: string): boolean => {
    let ok: boolean = true;

    return ok;
  }

  const onDigitarSenha = (senhaDigitada: string): void => {
    setSenha(senhaDigitada.trim());
    setErroSenha("");

    if (senhaDigitada.trim().length === 0) {
      setErroSenha("Informe a senha.");
    } else if (!validarSenha(senhaDigitada.trim())) {
      setErroSenha("Senha inválida.");
    } else if (senhaConfirmar.length > 0 && senhaDigitada.trim() !== senhaConfirmar.trim()) {
      setErroSenha("As senhas não coicidem.");
    }

  }

  const onDigitarConfirmarSenha = (senhaConfirmarDigitada: string): void => {
    setSenhaConfirmar(senhaConfirmarDigitada);
    setErroSenhaConfirmar("");

    if (senhaConfirmarDigitada.trim().length === 0) {
      setErroSenhaConfirmar("Informe a senha novamente.");
    } else if (!validarSenha(senhaConfirmarDigitada.trim())) {
      setErroSenhaConfirmar("Senha inválida.");
    } else if (senha.length > 0 && senhaConfirmarDigitada.trim() !== senha.trim()) {
      setErroSenhaConfirmar("As senhas não coicidem.");
    }

  }

  return {
    senha,
    senhaConfirmar,
    erroSenha,
    erroSenhaConfirmar,
    onDigitarSenha,
    onDigitarConfirmarSenha
  }
}

export default useSenhaConfirmarSenha;