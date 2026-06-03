import AntDesign from "@expo/vector-icons/AntDesign";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import styles from "./styles";

interface BotaoProps {

  titulo: string;
  onExecutar: () => void;
  habilitado?: boolean;
  carregando?: boolean;
  botaoLogin?: boolean;
  margemTopo?: number;
  margemBaixo?: number;

}

// componente que representa um botão
const Botao = ({
  titulo,
  habilitado,
  carregando,
  onExecutar,
  botaoLogin = false,
  margemTopo,
  margemBaixo
}: BotaoProps) => {

  return <Pressable
    style={ [
      styles.botao,
      botaoLogin && { width: "100%", marginStart: 0, marginEnd: 0, marginTop: 20 },
      (!habilitado && !carregando) && styles.botaoDesabilitado,
      margemTopo != undefined && { marginTop: margemTopo },
      margemBaixo != undefined && { marginBottom: margemBaixo }
    ] }
    disabled={ !habilitado }
    onPress={ onExecutar }>
    { !carregando ? <View style={ styles.containerTextoIcone }>
      <View style={ styles.fundoContainerIconeBotao }>
        <AntDesign name="arrow-right" size={ 25 } color="#fff" />
      </View>
      <Text style={ styles.textoBotao }>{ titulo }</Text>
    </View> : <ActivityIndicator size={ 40 } color="#fff" /> }
  </Pressable>
}

export default Botao;