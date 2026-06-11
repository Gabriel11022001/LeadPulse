import { useState } from "react";
import { TipoPessoaLead } from "../types/lead";

// validar cpf informado
export const validarCpf = (cpf: string): boolean => {

  return true;
}

// validar o cnpj informado
export const validarCnpj = (cnpj: string): boolean => {

  return true;
}

const useDocumentoLead = (tipoPessoaLead: TipoPessoaLead) => {

  const [ documento, setDocumento ] = useState<string>("");
  const [ erroDocumento, setErroDocumento ] = useState<string>("");

  const onDigitarDocumento = (documentoDigitado: string): void => {
    setDocumento(documentoDigitado);
    setErroDocumento("");

    if (documentoDigitado.trim().length === 0) {
      setErroDocumento("Informe o " + (tipoPessoaLead === TipoPessoaLead.pf ? "cpf" : "cnpj") + ".");
    } else {

      if (tipoPessoaLead === TipoPessoaLead.pf && !validarCpf(documentoDigitado)) {
        setErroDocumento("Informe um cpf válido.");
      } else if (!validarCnpj(documentoDigitado)) {
        setErroDocumento("Informe um cnpj válido.");
      }

    }

  }

  return {
    documento,
    erroDocumento,
    onDigitarDocumento,
    setDocumento,
    setErroDocumento
  };
}

export default useDocumentoLead;