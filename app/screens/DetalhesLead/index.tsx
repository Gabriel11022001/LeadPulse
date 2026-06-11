import AlertaErroGeral from "@/app/components/AlertaErroGeral";
import AnotacoesLeadLista from "@/app/components/AnotacoesLeadLista";
import Botao, { TipoBotao } from "@/app/components/Botao";
import DadoDetalheLead, { TipoDadoDetalheLead } from "@/app/components/DadoDetalheLead";
import DialogConfirmar from "@/app/components/DialogConfirmar";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import Loader from "@/app/components/Loader";
import MenuTopo, { TipoTela } from "@/app/components/MenuTopo";
import useAuth from "@/app/hooks/useAuth";
import buscarLeadPeloIdService from "@/app/service/buscarLeadPeloIdService";
import cadastrarAnotacaoService from "@/app/service/cadastrarAnotacaoService";
import { deletarAnotacaoService } from "@/app/service/deletarAnotacaoService";
import deletarLeadService from "@/app/service/deletarLeadService";
import { listarAnotacoesService } from "@/app/service/listarAnotacoesService";
import { Anotacao, Lead, TipoPessoaLead } from "@/app/types/lead";
import { Usuario } from "@/app/types/usuario";
import { getDataAtual } from "@/app/utils/getDataAtual";
import { useFocusEffect } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { useCallback, useEffect, useState } from "react";
import { Linking, ScrollView, View } from "react-native";
import styles from "./styles";

// tela com detalhes do lead
const DetalhesLead = ({ navigation, route }: any) => {

  const { getUsuarioLogado } = useAuth();
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ lead, setLead ] = useState<Lead | null>(null);
  const [ erroGeral, setErroGeral ] = useState<string>("");
  const [ anotacoes, setAnotacoes ] = useState<Array<Anotacao>>([]);
  const [ carregandoAnotacoes, setCarregandoAnotacoes ] = useState<boolean>(false);
  const [ apresentarAnotacoes, setApresentarAnotacoes ] = useState<boolean>(false);
  const [ apresentarDialogConfirmarDeletarLead, setApresentarDialogConfirmarDeletarLead ] = useState<boolean>(false);
  const [ carregandoAdicionarAnotacao, setCarregandoAdicionarAnotacao ] = useState<boolean>(false);
  const [ idAnotacaoEditar, setIdAnotacaoEditar ] = useState<string>("");
  const [ idAnotacaoExcluir, setIdAnotacaoExcluir ] = useState<string>("");
  const [ apresentarDialogConfirmarDeletarAnotacao, setApresentarDialogConfirmarDeletarAnotacao ] = useState<boolean>(false);
  const [ anotacao, setAnotacao ] = useState<string>("");
  const [ carregandoDeletarAnotacao, setCarregandoDeletarAnotacao ] = useState<boolean>(false);
  const [ carregandoDeletarLead, setCarregandoDeletarLead ] = useState<boolean>(false);

  // buscar o lead pelo id
  const buscarLeadPeloId = async () => {

    try {
      setCarregando(true);
      setErroGeral("");

      if (route.params && route.params.idLeadVisualizar) {
        const leadVisualizar: Lead | null = await buscarLeadPeloIdService(route.params.idLeadVisualizar ?? "");

        if (leadVisualizar != null) {
          setLead(leadVisualizar);

          console.log("Lead encontrado com sucesso na base de dados.");
        } else {
          setErroGeral("Erro! Não foi encontrado um lead com o id informado!");
        }

      }

    } catch (e) {
      // apresentar alerta de erro
    } finally {
      setCarregando(false);
    }

  }

  // retornar a tela de listagem de leads
  const voltar = () => {
    navigation.goBack();
  }

  // listar as anotações do lead
  const listarAnotacoesLead = async () => {

    try {
      setCarregandoAnotacoes(true);
      setAnotacoes([]);

      const anotacoesLead: Array<Anotacao> = await listarAnotacoesService(lead?.id ?? "");

      setAnotacoes(anotacoesLead);
    } catch (e) {

    } finally {
      setCarregandoAnotacoes(false);
    }

  }

  // deletar o lead na base de dados
  const deletarLead = async () => {

    try {
      setCarregandoDeletarLead(true);

      const idLeadDeletar: string = lead?.id ?? "";

      console.log("Deletando o lead na base de dados...");
      await deletarLeadService(idLeadDeletar);

      // apresentar alerta de sucesso para o usuário

      navigation.goBack();
    } catch (e) {
      // apresentar alerta de erro
    } finally {
      setCarregandoDeletarLead(false);
    }

  }

  // adicionar anotação na base de dados
  const adicionarAnotacao = async () => {
    setCarregandoAdicionarAnotacao(true);

    try {

      if (anotacao.trim().length === 0) {
        // apresentar alerta para o usuário
        setCarregandoAdicionarAnotacao(false);

        return;
      }

      if (idAnotacaoEditar != "") {
        // editar anotação na base de dados
        const anotacaoEditar: Anotacao = {
          id: idAnotacaoEditar ?? "",
          anotacao: anotacao.trim()
        }

        console.log("Editar a anotação na base de dados...");
        console.log(anotacaoEditar);

        setIdAnotacaoEditar("");
      } else {
        // cadastrar anotação na base de dados
        const anotacaoCadastrar: Anotacao = {
          leadId: lead?.id ?? "",
          anotacao: anotacao.trim(),
          dataCadastro: getDataAtual()
        }

        console.log("Cadastrar anotação na base de dados...");
        console.log(anotacaoCadastrar);

        await cadastrarAnotacaoService(anotacaoCadastrar);
      }

      setAnotacao("");

      setApresentarAnotacoes(true);

      await listarAnotacoesLead();
    } catch (e) {
      // apresentar um alerta de erro
      console.log("Erro ao tentar-se salvar anotação: " + e);
    } finally {
      setCarregandoAdicionarAnotacao(false);
    }

  }

  // deletar anotação na base de dados
  const deletarAnotacao = async () => {

    try {
      setCarregandoDeletarAnotacao(true);

      console.log("Deletando a anotação na base de dados...");

      await deletarAnotacaoService(idAnotacaoExcluir);

      setIdAnotacaoExcluir("");
      setApresentarDialogConfirmarDeletarAnotacao(false);
      setApresentarAnotacoes(true);

      // apresentar um alerta de sucesso para o usuário

      await listarAnotacoesLead();
    } catch (e) {
      // apresentar alerta de erro
    } finally {
      setCarregandoDeletarAnotacao(false);
    }

  }

  // telefonar para o cliente
  const telefonarParaCliente = async () => {

    try {
      const telefone = (lead?.telefone ?? "").replace(/\D/g, "");
      const url: string = `tel:${ telefone }`;

      console.log("Telefonar para " + telefone);

      const suportado = await Linking.canOpenURL(url);

      if (suportado) {
        await Linking.openURL(url);
      } else {
        // apresentar alerta informando que não é possível telefonar
        console.log("Não é possível telefonar!");
      }

    } catch (e) {
      // apresentar alerta de erro para o usuário
    }

  }

  // abrir o cliente para o usuário enviar o e-mail para o lead
  const enviarEmailCliente = async () => {

    try {
      const usuarioLogado: Usuario = await getUsuarioLogado();
      const email: string = lead?.email ?? "";
      const url = `mailto:${ email }?cc=${ usuarioLogado.email ?? "" }`;

      await Linking.openURL(url);
    } catch (e) {
      // apresentar um alerta de erro para o usuário
      console.log("Erro ao tentar-se enviar e-mail: " + e);
    }

  }

  // copiar o documento do lead
  const copiarDocumentoAreaTransferencia = async () => {
    
    if (!lead) {

      return;
    }

    if (lead.tipoPessoa === TipoPessoaLead.pf) {
      await Clipboard.setStringAsync(lead.cpf ?? "");
    } else {
      await Clipboard.setStringAsync(lead.cnpj ?? "");
    }
    
  }

  useEffect(() => {

    if (idAnotacaoExcluir != "") {
      setApresentarDialogConfirmarDeletarAnotacao(true);
    }

  }, [ idAnotacaoExcluir ]);

  useEffect(() => {

    if (apresentarAnotacoes) {
      listarAnotacoesLead();
    }

  }, [ apresentarAnotacoes ]);

  useFocusEffect(useCallback(() => {
    // consultar o lead pelo id no servidor
    buscarLeadPeloId();
  }, []));

  return <LeadPulseTela>
    { /** dialog para o usuário confirmar a deleção da anotação do lead */ }
    <DialogConfirmar
      apresentar={ apresentarDialogConfirmarDeletarAnotacao }
      mensagem="Deseja deletar a anotação?"
      carregandoOperacao={ carregandoDeletarAnotacao }
      onCancelar={ () => {
        setApresentarDialogConfirmarDeletarAnotacao(false);
        setIdAnotacaoExcluir("");
      } }
      onConfirmar={ () => {
        deletarAnotacao();
      } } />  
    { /** dialog para o usuário confirmar a deleção do lead */ }
    <DialogConfirmar
      apresentar={ apresentarDialogConfirmarDeletarLead }
      mensagem="Deseja deletar o lead?"
      carregandoOperacao={ carregandoDeletarLead }
      onConfirmar={ deletarLead }
      onCancelar={ () => {
        setApresentarDialogConfirmarDeletarLead(false);
      } } />
    { /** loader de carregamento da tela */ }
    <Loader carregando={ carregando } />
    <AlertaErroGeral
      apresentar={ erroGeral != "" }
      mensagem={ erroGeral }
      onFechar={ () => {

        if (erroGeral === "Erro! Não foi encontrado um lead com o id informado!") {
          voltar();
        } else {
          setErroGeral("");
        }

      } } />
    <MenuTopo
      titulo="Detalhes do Lead"
      subtitulo="Visualize os detalhes do lead"
      tela={ TipoTela.cadastroLead }
      onVoltar={ () => {
        navigation.goBack();
      } } />
    <ScrollView showsVerticalScrollIndicator={ false }>
      { /** container com os dados do lead */ }
      <View style={ styles.container }>
        { /** nome/razão social do lead */ }
        <DadoDetalheLead
          titulo={ (lead?.tipoPessoa === TipoPessoaLead.pf ? lead.nomeCompleto : lead?.razaoSocial) ?? "" }
          valor={ lead?.status ?? "" }
          tipoDetalhe={ lead?.tipoPessoa === TipoPessoaLead.pf ? TipoDadoDetalheLead.nome : TipoDadoDetalheLead.razaoSocial }
          ehNomeRazaoSocial={ true } />
        { /** e-mail do lead */ }
        <DadoDetalheLead
          titulo="E-mail"
          valor={ lead?.email ?? "" }
          tipoDetalhe={ TipoDadoDetalheLead.email }
          onEnviarEmail={ () => {
            // enviar um e-mail para o lead
            enviarEmailCliente();
          } } />
        { /** telefone do lead */ }
        <DadoDetalheLead
          titulo="Telefone"
          valor={ lead?.telefone ?? "" }
          tipoDetalhe={ TipoDadoDetalheLead.telefone }
          onLigarTelefone={ () => {
            // telefonar para o lead
            telefonarParaCliente();
          } } />
        { /** documento do lead */ }
        <DadoDetalheLead
          titulo="Documento"
          valor={ (lead?.tipoPessoa === TipoPessoaLead.pf ? lead.cpf : lead?.cnpj) ?? "" }
          tipoDetalhe={ TipoDadoDetalheLead.documento }
          onCopiarValorDado={ () => {
            // copiar o valor do documento do lead
            copiarDocumentoAreaTransferencia();
          } } />
        { /** Endereço do lead */ }
        <DadoDetalheLead
          ehUltimoDadoApresentado={ true }
          titulo="Endereço"
          valor={ (lead?.endereco && `${ lead.endereco.logradouro }, ${ lead.endereco.bairro }, ${ lead.endereco.numero != "" ? lead.endereco.numero : "S/N" }, ${ lead.endereco.cidade } - ${ lead.endereco.estado }`) ?? "" }
          tipoDetalhe={ TipoDadoDetalheLead.endereco } />
      </View>
      { /** origem do lead */ }
      <View style={ styles.container }>
        <DadoDetalheLead
          titulo="Origem"
          valor={ lead?.origem ?? "" }
          tipoDetalhe={ TipoDadoDetalheLead.origem }
          ehUltimoDadoApresentado={ true }
          subvalor={ (lead?.dataCadastro && lead.dataCadastro != undefined && lead.dataCadastro != ""
            && lead.dataCadastro != null
          ) ? lead.dataCadastro : "00/00/0000" } />
      </View>
      { /** lista com as anotações do lead */ }
      <AnotacoesLeadLista
        carregandoSalvar={ carregandoAdicionarAnotacao }
        anotacao={ anotacao }
        carregando={ carregandoAnotacoes }
        anotacoes={ anotacoes }
        apresentar={ apresentarAnotacoes }
        onControlarApresentarAnotacoes={ () => {
          setApresentarAnotacoes(!apresentarAnotacoes);
        } }
        onAdicionarAnotacao={ () => {
          adicionarAnotacao();
        } }
        onDeletarAnotacao={ (anotacaoId: string) => {
          setIdAnotacaoExcluir(anotacaoId);
        } }
        onEditarAnotacao={ (anotacaoId: string, anotacaoAtual: string) => {
          setIdAnotacaoEditar(anotacaoId);
          setAnotacao(anotacaoAtual);
        } }
        onDigitarAnotacao={ (anotacaoDigitada: string) => {
          setAnotacao(anotacaoDigitada);
        } } />
      { /** botão para editar o lead */ }
      <Botao
        titulo="Editar"
        habilitado={ true }
        tipo={ TipoBotao.editar }
        onExecutar={ () => {
          navigation.replace("cadastro_lead", { idLeadEditar: lead?.id ?? "" });
        } } />
      { /** botão para deletar o lead */ }
      <Botao
        titulo="Deletar"
        habilitado={ true }
        tipo={ TipoBotao.deletar }
        onExecutar={ () => {
          setApresentarDialogConfirmarDeletarLead(true);
        } }
        margemBaixo={ 50 } />
    </ScrollView>
  </LeadPulseTela>
}

export default DetalhesLead;