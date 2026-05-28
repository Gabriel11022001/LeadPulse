// aplicar mascara de cep
export const mascaraCep = (cep: string): string => {
  const apenasNumeros = cep.replace(/\D/g, "");

  const cepLimitado = apenasNumeros.slice(0, 8);

  return cepLimitado.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");
}

// aplicar mascara de cpf
export const mascaraCpf = (cpf: string): string => {
  const apenasNumeros = cpf.replace(/\D/g, "").slice(0, 11);

  return apenasNumeros
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

// aplicar mascara de cnpj
export const mascaraCnpj = (cnpj: string): string => {
  const valor = cnpj.replace(/[^a-zA-Z0-9]/g, "").slice(0, 14);

  let resultado = valor;

  if (valor.length > 2) {
    resultado = resultado.replace(/^(.{2})(.*)/, "$1.$2");
  }

  if (valor.length > 5) {
    resultado = resultado.replace(/^(.{2})\.(.{3})(.*)/, "$1.$2.$3");
  }

  if (valor.length > 8) {
    resultado = resultado.replace(/^(.{2})\.(.{3})\.(.{3})(.*)/, "$1.$2.$3/$4");
  }

  if (valor.length > 12) {
    resultado = resultado.replace(/^(.{2})\.(.{3})\.(.{3})\/(.{4})(.*)/, "$1.$2.$3/$4-$5");
  }

  return resultado;
}

// aplicar mascara de telefone celular
export const mascaraCelular = (telefone: string): string => {
  const apenasNumeros = telefone.replace(/\D/g, "").slice(0, 11);

  return apenasNumeros
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

// aplicar mascara de rg
export const mascaraRg = (rg: string): string => {
  const valor = rg.replace(/\D/g, "");

  return valor
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2")
    .slice(0, 12);
}

// aplicar mascara de dia/mes/ano no campo
export const mascaraDataDiaMesAno = (data: string): string => data.replace(/\D/g, "")
  .replace(/^(\d{2})(\d)/, "$1/$2")
  .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
  .slice(0, 10);