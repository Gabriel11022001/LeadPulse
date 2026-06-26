import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, Text, View } from "react-native";
import Botao, { TipoBotao } from "../Botao";
import Campo, { TipoCampo } from "../Campo";
import styles from "./styles";

interface DialogAdicionarNotificacaoProps {

  apresentar: boolean;
  notificacao: string;
  erro: string;
  onDigitarNotificacao: (notificacaoDigitada: string) => void;
  onCadastrar: () => void;
  onFechar: () => void;
  carregando: boolean;

}

const DialogAdicionarNotificacao = ({
  notificacao,
  carregando,
  onDigitarNotificacao,
  onCadastrar,
  onFechar,
  erro,
  apresentar
}: DialogAdicionarNotificacaoProps) => {

  if (!apresentar) {

    return null;
  }

  return <View style={ styles.container }>
    <View style={ styles.containerTopo }>
      { /** botão para fechar o dialog */ }
      <Pressable onPress={ onFechar }>
        <AntDesign name="close" size={ 30 } color="#000" />
      </Pressable>
    </View>
    <Text style={ styles.titulo }>Cadastrar Notificação</Text>
    <Text style={ styles.subtitulo }>Preencha as informações abaixo para criar uma nova notificação.</Text>
    { /** campo para o usuário digitar a notificação */ }
    <Campo
      valor={ notificacao }
      erro={ erro }
      habilitado={ true }
      placeholder="Digite a notificação..."
      titulo="Notificação"
      tipoCampo={ TipoCampo.default }
      onAlterarValor={ onDigitarNotificacao } />
    { /** botão para cadastrar */ }
    <Botao
      titulo="Salvar"
      carregando={ carregando }
      habilitado={ notificacao != "" && erro === "" && !carregando }
      tipo={ TipoBotao.avancar }
      onExecutar={ onCadastrar } />
  </View>
}

export default DialogAdicionarNotificacao;