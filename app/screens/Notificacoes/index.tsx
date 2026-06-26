import BotaoFlutuanteAdicionar from "@/app/components/BotaoFlutuanteAdicionar";
import DialogAdicionarNotificacao from "@/app/components/DialogAdicionarNotificacao";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import Loader from "@/app/components/Loader";
import MenuTopo, { TipoTela } from "@/app/components/MenuTopo";
import NotificacaoItem from "@/app/components/NotificacaoItem";
import useAuth from "@/app/hooks/useAuth";
import cadastrarNotificacaoService from "@/app/service/cadastrarNotificacaoService";
import listarNotificacoesService from "@/app/service/listarNoficacoesService";
import { Notificacao } from "@/app/types/notificacao";
import { Usuario } from "@/app/types/usuario";
import { getDataAtual } from "@/app/utils/getDataAtual";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";

// tela de notificações do app
const Notificacoes = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ carregandoCadastrarNotificacao, setCarregandoCadastrarNotificacao ] = useState<boolean>(false);
  const [ notificacoes, setNotificacoes ] = useState<Array<Notificacao>>([]);
  const [ apresentarDialogAdicionarNotificacao, setApresentarDialogAdicionarNotificacao ] = useState<boolean>(false);
  const [ notificacaoCadastrar, setNotificacaoCadastrar ] = useState<string>("");
  const [ erroNotificacao, setErroNotificacao ] = useState<string>("");
  const {
    getUsuarioLogado
  } = useAuth();

  // listar notificações
  const listarNotificacoes = async () => {

    try {
      setCarregando(true);

      const notificacoesLista: Array<Notificacao> = await listarNotificacoesService();
      
      setNotificacoes(notificacoesLista);
    } catch (e) {
      console.log(`Erro ao tentar-se listar as notificações: ${ e }`);

      // apresentar um alerta de erro para o usuário
    } finally {
      setCarregando(false);
    }
  }

  // cadastrar notificação na base de dados
  const cadastrarNotificacao = async () => {
    setCarregandoCadastrarNotificacao(true);

    try {
      const usuarioLogado: Usuario = await getUsuarioLogado();
      const notificacao: Notificacao = {
        notificacao: notificacaoCadastrar,
        dataCadastro: getDataAtual(),
        idUsuarioCadastrou: usuarioLogado.id ?? ""
      }

      await cadastrarNotificacaoService(notificacao);

      // apresentar alerta de sucesso para o usuário

      setNotificacaoCadastrar("");
      setApresentarDialogAdicionarNotificacao(false);

      await listarNotificacoes();
    } catch (e) {
      // apresentar alerta de erro para o usuário
    } finally {
      setCarregandoCadastrarNotificacao(false);
    }

  }

  useFocusEffect(useCallback(() => {
    setApresentarDialogAdicionarNotificacao(false);
    setNotificacaoCadastrar("");
    setErroNotificacao("");
    setCarregandoCadastrarNotificacao(false);
    // listar as notificações cadastradas na base de dados
    listarNotificacoes();
  }, []));

  return (
    <LeadPulseTela>
      <DialogAdicionarNotificacao
        apresentar={ apresentarDialogAdicionarNotificacao }
        notificacao={ notificacaoCadastrar }
        carregando={ carregandoCadastrarNotificacao }
        erro={ erroNotificacao }
        onDigitarNotificacao={ (notificacaoDigitada: string) => {
          setNotificacaoCadastrar(notificacaoDigitada);
          setErroNotificacao("");

          if (notificacaoDigitada.trim().length === 0) {
            setErroNotificacao("Digite a notificação.");
          }

        } }
        onFechar={ () => {
          setApresentarDialogAdicionarNotificacao(false);
        } }
        onCadastrar={ () => {
          cadastrarNotificacao();
        } } />
      { /** loader de carregamento */ }
      <Loader carregando={ carregando } />
      { /** menu do topo */ }
      <MenuTopo
        titulo="Notificações"
        tela={ TipoTela.notificacoes }
        subtitulo="Gerenciar notificações"
        onVoltar={ () => {
          navigation.goBack();
        } } />
      <BotaoFlutuanteAdicionar onAdicionar={ () => {
        setApresentarDialogAdicionarNotificacao(true);
        setNotificacaoCadastrar("");
      } } />
      { notificacoes.length === 0 ? <View>
        <Text>Não existem notificações cadastradas na base de dados.</Text>
      </View> : <FlatList
        data={ notificacoes }
        renderItem={ ({ item }) => {

          return <NotificacaoItem
            notificacao={ item } />
        } } /> }
    </LeadPulseTela>
  );
}

export default Notificacoes;