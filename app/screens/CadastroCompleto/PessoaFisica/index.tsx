import Botao from "@/app/components/Botao";
import BotaoCancelar from "@/app/components/BotaoCancelar";
import Cabecalho from "@/app/components/Cabecalho";
import Campo, { TipoCampo } from "@/app/components/Campo";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import Select, { SelectOpcao } from "@/app/components/Select";
import useLeadPulse from "@/app/hooks/useLeadPulse";
import { Lead, TipoPessoaLead } from "@/app/types/lead";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView, Text } from "react-native";
import styles from "./styles";

// tela de cadastro dos dados completo do pf
const CadastroCompletoPessoaFisica = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const { lead, atualizarDadosLead, limparDadosLead } = useLeadPulse();
  const [ genero, setGenero ] = useState<string>("");
  const [ nomeCompleto, setNomeCompleto ] = useState<string>("");
  const [ dataNascimento, setDataNascimento ] = useState<string>("");
  const [ rg, setRg ] = useState<string>("");
  const [ erroDataNascimento, setErroDataNascimento ] = useState<string>("");
  const [ erroRg, setErroRg ] = useState<string>("");
  const [ erroNomeCompleto, setErroNomeCompleto ] = useState<string>("");
  const generos: Array<SelectOpcao> = [
    { key: "Masculino", label: "Masculino", valor: "Masculino" },
    { key: "Feminino", label: "Feminino", valor: "Feminino" }
  ];

  const onDigitarDataNascimento = (dataNascimentoDigitada: string): void => {
    setDataNascimento(dataNascimentoDigitada);
    setErroDataNascimento("");

    if (dataNascimentoDigitada.trim().length === 0) {
      setErroDataNascimento("Informe a daa de nascimento.");
    }

  }

  const onDigitarRg = (rgDigitado: string): void => {
    setRg(rgDigitado);
    setErroRg("");

    if (rgDigitado.trim().length === 0) {
      setErroRg("Informe o rg.");
    }

  }

  const onDigitarNomeCompleto = (nomeCompletoDigitado: string): void => {
    setNomeCompleto(nomeCompletoDigitado);
    setErroNomeCompleto("");

    if (nomeCompletoDigitado.trim().length === 0) {
      setErroNomeCompleto("Informe o nome completo.");
    }

  }

  // cancelar o fluxo do cadastro do lead
  const cancelarCadastroLead = (): void => {
    limparDadosLead();
    navigation.replace("home");
  }

  // prosseguir com o cadastro do lead pf
  const prosseguir = async () => {
    const leadDadosAtualizados: Lead = {
      id: lead?.id ?? "",
      tipoPessoa: lead?.tipoPessoa ?? TipoPessoaLead.pf,
      dataCadastro: lead?.dataCadastro ?? "",
      email: lead?.email ?? "",
      telefone: lead?.telefone ?? "",
      origem: lead?.origem ?? "",
      status: lead?.status ?? "",
      anotacoes: lead?.anotacoes ?? [],
      endereco: lead?.endereco ?? undefined,
      cpf: lead?.cpf ?? "",
      dataNascimento: dataNascimento.trim(),
      genero: genero.trim(),
      rg: rg.trim(),
      nomeCompleto: nomeCompleto.trim(),
      idUsuario: lead?.idUsuario ?? ""
    }

    atualizarDadosLead(leadDadosAtualizados);

    // redirecionar o usuário para a tela de endereço
    navigation.navigate("cadastro_endereco");
  }

  const voltar = (): void => {

    const leadDadosAtualizados: Lead = {
      id: lead?.id ?? "",
      tipoPessoa: lead?.tipoPessoa ?? TipoPessoaLead.pf,
      dataCadastro: lead?.dataCadastro ?? "",
      email: lead?.email ?? "",
      telefone: lead?.telefone ?? "",
      origem: lead?.origem ?? "",
      status: lead?.status ?? "",
      anotacoes: lead?.anotacoes ?? [],
      endereco: lead?.endereco ?? undefined,
      nomeCompleto: nomeCompleto.trim(),
      cpf: lead?.cpf ?? "",
      dataNascimento: dataNascimento.trim(),
      genero: genero.trim(),
      rg: rg.trim()
    }

    atualizarDadosLead(leadDadosAtualizados);

    navigation.goBack();
  }

  // selecionar gênero
  const onSelecionarGenero = (generoSelecionado: SelectOpcao): void => {
    setGenero(generoSelecionado.valor);
  }

  useFocusEffect(useCallback(() => {
    console.log("Lead no cadastro completo pf:");
    console.log(lead);

    if (lead != null) {
      setRg(lead.rg ?? "");
      setDataNascimento(lead.dataNascimento ?? "");
      setGenero(lead.genero ?? generos[ 0 ].valor);
      setNomeCompleto(lead.nomeCompleto ?? "");
      setRg(lead.rg ?? "");
    }

    if (genero === "") {
      setGenero(generos[ 0 ].valor);
    }

  }, [ lead ]));

  return <LeadPulseTela>
    <Cabecalho
      titulo="Cadastro de Lead"
      habilitarBotaoVoltar={ true }
      onVoltar={ () => {
        voltar();
      } } />
    <ScrollView showsVerticalScrollIndicator={ false }>
      <Text style={ styles.titulo }>Dados Completos</Text>
      <Text style={ styles.subtitulo }>Preencha os dados completos</Text>
      { /** campo para informar o nome completo do lead */ }
      <Campo
        valor={ nomeCompleto }
        placeholder="Digite o nome completo..."
        erro={ erroNomeCompleto }
        habilitado={ !carregando }
        titulo="Nome Completo"
        tipoCampo={ TipoCampo.default }
        onAlterarValor={ (nomeCompletoDigitado: string) => {
          onDigitarNomeCompleto(nomeCompletoDigitado);
        } } />
      { /** campo para informar o rg do lead */ }
      <Campo
        valor={ rg }
        placeholder="Digite o rg..."
        erro={ erroRg }
        habilitado={ !carregando }
        titulo="RG"
        tipoCampo={ TipoCampo.rg }
        onAlterarValor={ (rgDigitado: string) => {
          onDigitarRg(rgDigitado);
        } } />
      { /** campo para o usuário informar a data de nascimento */ }
      <Campo
        valor={ dataNascimento }
        erro={ erroDataNascimento }
        habilitado={ !carregando }
        placeholder="00/00/0000"
        tipoCampo={ TipoCampo.data }
        titulo="Data de nascimento"
        onAlterarValor={ (dataNascimentoDigitada: string) => {
          onDigitarDataNascimento(dataNascimentoDigitada);
        } } />
      { /** campo para selecionar o gênero */ }
      <Select
        opcoes={ generos }
        titulo="Gênero"
        opcaoSelecionada={ generos.find(g => g.valor === genero) ?? generos[ 0 ] }
        onSelecionarOpcao={ (generoSelecionado: SelectOpcao) => {
          onSelecionarGenero(generoSelecionado);
        } } />
      <Botao
        titulo="Prosseguir"
        carregando={ carregando }
        habilitado={
          rg != ""
          && dataNascimento != ""
          && genero != ""
          && erroRg === ""
          && erroDataNascimento === ""
          && nomeCompleto != ""
          && erroNomeCompleto === ""
        }
        onExecutar={ () => {
          prosseguir();
        } } />
      <BotaoCancelar
        titulo="Cancelar"
        onCancelar={ () => {
          cancelarCadastroLead();
        } }
        margemBottom={ 50 } />
    </ScrollView>
  </LeadPulseTela>
}

export default CadastroCompletoPessoaFisica;