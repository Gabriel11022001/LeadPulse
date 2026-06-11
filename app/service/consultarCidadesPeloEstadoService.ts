import axios from "axios";

export type Cidade = {

  id: number;
  nome: string;

}

// consultar cidades pelo estado
const consultarCidadesPeloEstadoService = async (uf: string) => {
  const resp = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ uf }/municipios?orderBy=nome`);

  let cidades: Array<Cidade> = [];

  if (resp.data) {
    cidades = resp.data.map((cid: object) => {

      return {
        id: cid.id,
        nome: cid.nome
      }
    });
  }

  return cidades;
}

export default consultarCidadesPeloEstadoService;