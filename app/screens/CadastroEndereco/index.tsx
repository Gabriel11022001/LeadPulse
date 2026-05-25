import Botao from "@/app/components/Botao";
import BotaoCancelar from "@/app/components/BotaoCancelar";
import Cabecalho from "@/app/components/Cabecalho";
import Campo, { TipoCampo } from "@/app/components/Campo";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import Select, { SelectOpcao } from "@/app/components/Select";
import useLeadPulse from "@/app/hooks/useLeadPulse";
import cadastrarLeadService from "@/app/service/cadastrarLeadService";
import consultarCidadesPeloEstadoService, { Cidade } from "@/app/service/consultarCidadesPeloEstadoService";
import consultarEnderecoPeloCepService from "@/app/service/consultarEnderecoPeloCepService";
import { Endereco, Lead, TipoPessoaLead } from "@/app/types/lead";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView, Text } from "react-native";
import styles from "./styles";

interface EstadoBrasil {

  sigla: string;
  nome: string;

}

// tela de cadastro de endereço do lead
const CadastroEndereco = ({ navigation }: any) => {

  const [ erroGeral, setErroGeral ] = useState<string>("");
  const { lead, atualizarDadosLead, limparDadosLead } = useLeadPulse();
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ carregandoConsultarEndereco, setCarregandoConsultarEndereco ] = useState<boolean>(false);
  const [ cep, setCep ] = useState<string>("");
  const [ logradouro, setLogradouro ] = useState<string>("");
  const [ complemento, setComplemento ] = useState<string>("");
  const [ cidade, setCidade ] = useState<string>("");
  const [ bairro, setBairro ] = useState<string>("");
  const [ uf, setUf ] = useState<string>("São Paulo");
  const [ numero, setNumero ] = useState<string>("");
  const [ erroCep, setErroCep ] = useState<string>("");
  const [ erroLogradouro, setErroLogradouro ] = useState<string>("");
  const [ erroComplemento, setErroComplemento ] = useState<string>("");
  const [ erroCidade, setErroCidade ] = useState<string>("");
  const [ erroBairro, setErroBairro ] = useState<string>("");
  const [ erroNumero, setErroNumero ] = useState<string>("");
  const [ campoLogradouroHabilitado, setCampoLogradouroHabilitado ] = useState<boolean>(true);
  const [ campoBairroHabilitado, setCampoBairroHabilitado ] = useState<boolean>(true);
  const [ campoCidadeHabilitado, setCampoCidadeHabilitado ] = useState<boolean>(true);
  const [ campoUfHabilitado, setCampoUfHabilitado ] = useState<boolean>(false);

  const estadosBrasil: EstadoBrasil[] = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  const estadosBrasilOpcoes: SelectOpcao[] = estadosBrasil.map((estado: EstadoBrasil) => {

    return {
      key: estado.sigla,
      label: estado.nome,
      valor: estado.nome
    };
  });

  // cidades do estado selecionado
  const [ cidades, setCidades ] = useState<SelectOpcao[]>([]);

  // cadastrar o lead
  const cadastrar = async () => {
    console.log("Cadastrar o lead:");
    console.log(lead);

    await cadastrarLeadService(lead);
  }

  // editar o lead
  const editar = async () => {

  }

  // finalizar cadastro/edição do lead
  const finalizar = async () => {
    setCarregando(true);
    setErroGeral("");

    try {
      const leadDadosAtualizados: Lead = {
        id: lead?.id ?? "",
        tipoPessoa: lead?.tipoPessoa ?? TipoPessoaLead.pf,
        dataCadastro: lead?.dataCadastro ?? "",
        email: lead?.email ?? "",
        telefone: lead?.telefone ?? "",
        origem: lead?.origem ?? "",
        status: lead?.status ?? "",
        anotacoes: lead?.anotacoes ?? [],
        nomeCompleto: lead?.nomeCompleto ?? "",
        cpf: lead?.cpf ?? "",
        dataNascimento: lead?.dataNascimento ?? "",
        genero: lead?.genero ?? "",
        rg: lead?.rg ?? "",
        cnpj: lead?.cnpj ?? "",
        dataFundacao: lead?.dataFundacao ?? "",
        razaoSocial: lead?.razaoSocial ?? "",
        endereco: {
          cep: cep.trim(),
          complemento: complemento.trim(),
          logradouro: logradouro.trim(),
          cidade: cidade.trim(),
          bairro: bairro.trim(),
          estado: uf.trim(),
          numero: numero.trim(),
          leadId: lead?.id ?? ""
        },
        idUsuario: lead?.idUsuario ?? ""
      }

      atualizarDadosLead(leadDadosAtualizados);

      if (lead?.id === "") {
        // cadastrar
        await cadastrar();
      } else {
        // editar
        await editar();
      }

      // redirecionar o usuário para a tela de detalhes do lead
    } catch (e) {
      setErroGeral(`Erro ao tentar-se salvar o lead: ` + e);
    } finally {
      setCarregando(false);
    }

  }

  // retornar para a tela anterior
  const voltar = (): void => {

    if (lead) {
      const leadAtualizado: Lead = { ...lead };

      leadAtualizado.endereco = {
        cep: cep.trim(),
        complemento: complemento.trim(),
        logradouro: logradouro.trim(),
        cidade: cidade.trim(),
        bairro: bairro.trim(),
        estado: uf.trim(),
        leadId: lead.id ?? "",
        numero: numero.trim()
      }

      atualizarDadosLead(leadAtualizado);

      navigation.goBack();
    }

  }

  // cancelar o cadastro/edição do lead
  const cancelar = (): void => {
    limparDadosLead();

    navigation.replace("home");
  }

  const onDigitarCep = async (cepDigitado: string) => {
    setCep(cepDigitado);
    setErroCep("");

    if (cepDigitado.trim().length === 0) {
      setErroCep("Informe o cep.");
    } else if (cepDigitado.trim().length === 9) {
      // consultar o endereço pelo cep
      await consultarEnderecoPeloCep(cepDigitado.trim());
    }

  }

  const onDigitarLogradouro = (logradouroDigitado: string): void => {
    setLogradouro(logradouroDigitado);
    setErroLogradouro("");

    if (logradouroDigitado.trim().length === 0) {
      setErroLogradouro("Informe o logradouro.");
    }

  }

  const onDigitarBairro = (bairroDigitado: string): void => {
    setBairro(bairroDigitado);
    setErroBairro("");

    if (bairroDigitado.trim().length === 0) {
      setErroBairro("Informe o bairro.");
    }

  }

  const onDigitarComplemento = (complementoDigitado: string): void => {
    setComplemento(complementoDigitado);
    setErroComplemento("");

    if (complementoDigitado.trim().length > 0 && complementoDigitado.trim().length < 3) {
      setErroComplemento("Campo inválido.");
    }

  }

  // consultar endereço do lead pelo cep
  const consultarEnderecoPeloCep = async (cepConsultar: string) => {
    setCarregandoConsultarEndereco(true);
    setCampoLogradouroHabilitado(false);
    setCampoBairroHabilitado(false);
    setCampoUfHabilitado(false);
    setCampoCidadeHabilitado(false);
    setNumero("");
    setLogradouro("");
    setComplemento("");
    setCidade("");
    setUf("São Paulo");
    setBairro("");

    try {
      console.log("Consultar endereço pelo cep: " + cepConsultar);

      const enderecoConsulta: Endereco | null = await consultarEnderecoPeloCepService(cepConsultar);

      console.log("Endereço: " + JSON.stringify(enderecoConsulta ?? {}));

      if (enderecoConsulta != null) {
        setLogradouro(enderecoConsulta.logradouro);
        setComplemento(enderecoConsulta.complemento);
        setBairro(enderecoConsulta.bairro);
        setUf(enderecoConsulta.estado);
        setCidade(enderecoConsulta.cidade);
      } else {
        setCampoLogradouroHabilitado(true);
        setCampoBairroHabilitado(true);
        setCampoCidadeHabilitado(true);
        setCampoUfHabilitado(true);

        // apresentar um toast informando que o cep não foi encontrado
      }

    } catch (e) {
      // apresentar um alerta de erro para o usuário
    } finally {
      setCarregandoConsultarEndereco(false);
    }

  }

  // consultar cidades do estado selecionado
  const consultarCidadesEstado = async (ufSelecionada: string) => {
    console.log("Consultando as cidades pelo estado...");
    setCarregando(true);
    setCidades([]);
    setUf(ufSelecionada);
    setCep("");
    setComplemento("");
    setLogradouro("");
    setNumero("");
    setBairro("");
    setCidade("");

    try {
      let cidadesLista: Array<Cidade> = await consultarCidadesPeloEstadoService(
        estadosBrasil.find(e => e.nome === ufSelecionada.trim())?.sigla ?? ""
      );
      
      if (cidadesLista.length > 0) {
        console.log("Cidades para a uf " + ufSelecionada + " " + cidadesLista.length);
      } else {
        console.log("Nenhuma cidade listada para a uf " + ufSelecionada);
      }

      setCidades(cidadesLista.map((cidade: Cidade) => {

        return {
          key: cidade.id.toString(),
          label: cidade.nome,
          valor: cidade.nome
        }
      }));
    } catch (e) {
      // apresentar alerta de erro para o usuário
    } finally {
      setCarregando(false);
    }

  }

  useFocusEffect(useCallback(() => {

    if (lead) {
      setCep(lead.endereco?.cep ?? "");
      setComplemento(lead.endereco?.complemento ?? "");
      setLogradouro(lead.endereco?.logradouro ?? "");
      setCidade(lead.endereco?.cidade ?? "");
      setUf(lead.endereco?.estado ?? "São Paulo");
      setNumero(lead.endereco?.numero ?? "s/n");
      setBairro(lead.endereco?.bairro ?? "");

      consultarCidadesEstado(lead.endereco?.estado ?? "São Paulo");
    }

  }, [ lead ]));

  return <LeadPulseTela>
    { /** cabeçalho da tela de cadastro de endereço */ }
    <Cabecalho
      titulo="Endereço"
      habilitarBotaoVoltar={ true }
      onVoltar={ () => {
        voltar();
      } } />
    <ScrollView showsVerticalScrollIndicator={ false }>
      <Text style={ styles.titulo }>Endereço</Text>
      <Text style={ styles.subtitulo }>Preencha abaixo os campos do endereço</Text>
      { /** campo para informar o cep do lead */ }
      <Campo
        valor={ cep }
        titulo="CEP"
        placeholder="00000-000"
        habilitado={ !carregando && !carregandoConsultarEndereco }
        erro={ erroCep }
        tipoCampo={ TipoCampo.cep }
        consultando={ carregandoConsultarEndereco }
        onAlterarValor={ (cepDigitado: string) => {
          onDigitarCep(cepDigitado);
        } } />
      { /** campo para informar o logradouro */ }
      <Campo
        valor={ logradouro }
        titulo="Logradouro"
        placeholder="Digite o logradouro..."
        habilitado={ true }
        erro={ erroLogradouro }
        tipoCampo={ TipoCampo.default }
        onAlterarValor={ (logradouroDigitado: string) => {
          onDigitarLogradouro(logradouroDigitado);
        } } />
      { /** campo para o usuário informar o complemento */ }
      <Campo
        valor={ complemento }
        erro={ erroComplemento }
        habilitado={ true }
        placeholder="Digite o complemento..."
        tipoCampo={ TipoCampo.default }
        titulo="Complemento(opcional)"
        onAlterarValor={ (complementoDigitado: string) => {
          onDigitarComplemento(complementoDigitado);
        } } />
      { /** select para o usuário selecionar o estado */ }
      <Select
        titulo="Estado"
        opcoes={ estadosBrasilOpcoes }
        opcaoSelecionada={ estadosBrasilOpcoes.find(e => e.valor === uf) ?? estadosBrasilOpcoes[ 0 ] }
        onSelecionarOpcao={ (estadoSelecionado: SelectOpcao) => {
          consultarCidadesEstado(estadoSelecionado.valor);
        } } />
      { /** select para o usuário selecionar a cidade */ }
      <Select
        opcoes={ cidades ?? [] }
        titulo="Cidade"
        opcaoSelecionada={ cidades.length > 0 ? (cidades.find(c => c.valor === cidade) ?? cidades[ 0 ]) : null }
        onSelecionarOpcao={ (cidadeSelecionada: SelectOpcao) => {
          setCidade(cidadeSelecionada.valor);
        } } />
      { /** campo para o usuário informar o bairro */ }
      <Campo
        valor={ bairro }
        erro={ erroBairro }
        habilitado={ true }
        placeholder="Digite o bairro..."
        tipoCampo={ TipoCampo.default }
        titulo="Bairro"
        onAlterarValor={ (bairroDigitado: string) => {
          onDigitarBairro(bairroDigitado);
        } } />
      <Botao
        titulo="Finalizar"
        carregando={ carregando }
        onExecutar={ finalizar }
        habilitado={
          cep != ""
          && logradouro != ""
          && cidade != ""
          && bairro != ""
          && uf != ""
          && erroCep === ""
          && erroComplemento ===  ""
          && erroLogradouro === ""
          && erroCidade === ""
          && erroBairro === ""
          && erroNumero === ""
        } />
      <BotaoCancelar
        titulo="Cancelar"
        margemBottom={ 50 }
        onCancelar={ cancelar } />
    </ScrollView>
  </LeadPulseTela>
}

export default CadastroEndereco;