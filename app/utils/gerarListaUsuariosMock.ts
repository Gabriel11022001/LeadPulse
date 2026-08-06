import { Usuario } from "../types/usuario";

const qtdUsuarios: number = 100;

const nomes = [
  "Gabriel",
  "Lucas",
  "João",
  "Pedro",
  "Mateus",
  "Carlos",
  "Felipe",
  "Gustavo",
  "Rafael",
  "Bruno",
  "Marcos",
  "Ricardo",
  "Diego",
  "Vinícius",
  "André",
  "Ana",
  "Maria",
  "Juliana",
  "Fernanda",
  "Patrícia",
  "Camila",
  "Amanda",
  "Larissa",
  "Beatriz",
  "Carolina",
];

const sobrenomes = [
  "Silva",
  "Santos",
  "Oliveira",
  "Souza",
  "Costa",
  "Pereira",
  "Rodrigues",
  "Almeida",
  "Ferreira",
  "Lima",
  "Gomes",
  "Martins",
  "Rocha",
  "Barbosa",
  "Araújo",
];

const gerarDataAleatoria = (diasAtras: number): Date => {
  const data = new Date();
  data.setDate(data.getDate() - Math.floor(Math.random() * diasAtras));
  return data;
};

const formatarData = (data: Date): string => {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  const hora = String(data.getHours()).padStart(2, "0");
  const minuto = String(data.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
};

const gerarTelefone = (): string => {
  const ddd = Math.floor(Math.random() * 89) + 11;
  const numero = Math.floor(Math.random() * 900000000) + 100000000;

  return `(${ddd}) ${String(numero).replace(
    /(\d{5})(\d{4})/,
    "$1-$2"
  )}`;
};

const gerarListaUsuariosMock = (): Array<Usuario> => {
  const usuarios: Array<Usuario> = [];

  for (let i = 1; i <= qtdUsuarios; i++) {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome =
      sobrenomes[Math.floor(Math.random() * sobrenomes.length)];

    const nomeCompleto = `${nome} ${sobrenome}`;
    const email = `${nome.toLowerCase()}.${sobrenome.toLowerCase()}${i}@email.com`;

    const dataCadastro = gerarDataAleatoria(365);
    const dataUltimoLogin = gerarDataAleatoria(30);

    usuarios.push({
      id: i.toString(),
      nomeCompleto,
      email,
      ativo: Math.random() > 0.15, // 85% ativos
      telefone: gerarTelefone(),
      dataCadastro: formatarData(dataCadastro),
      dataUltimoLogin: formatarData(dataUltimoLogin),
    });
  }

  return usuarios;
};

export default gerarListaUsuariosMock;