import config from "@/app/config";
import { Notificacao } from "@/app/types/notificacao";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View } from "react-native";
import styles from "./styles";

interface NotificacaoItemProps {

  notificacao: Notificacao;

}

// item que representa a notificação na listagem
const NotificacaoItem = (props: NotificacaoItemProps) => {

  return <View style={ styles.notificacao }>
    <View style={ styles.topo }>
      <AntDesign name="notification" size={ 25 } color={ config.corPrimaria } />
      <Text style={ styles.txtDataCadastro }>{ props.notificacao.dataCadastro }</Text>
    </View>
    <View>
      <Text style={ styles.mensagem }>{ props.notificacao.notificacao }</Text>
      { props.notificacao.usuarioCadastrou && <Text style={ styles.usuarioRegistrou }>Registrada pelo usuário: { props.notificacao.usuarioCadastrou.nomeCompleto }</Text> }
    </View>
  </View>
}

export default NotificacaoItem;