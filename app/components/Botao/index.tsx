import config from "@/app/config";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import styles from "./styles";

export enum TipoBotao {

  add,
  avancar,
  editar,
  deletar,
  confirmar

}

interface BotaoProps {

  titulo: string;
  onExecutar: () => void;
  habilitado?: boolean;
  carregando?: boolean;
  botaoLogin?: boolean;
  margemTopo?: number;
  margemBaixo?: number;
  tipo?: TipoBotao;

}

// componente que representa um botão
const Botao = ({
  titulo,
  habilitado,
  carregando,
  onExecutar,
  botaoLogin = false,
  margemTopo,
  margemBaixo,
  tipo = TipoBotao.avancar
}: BotaoProps) => {

  const getIconeBotao = () => {

    if (tipo === TipoBotao.add) {

      return <FontAwesome6 name="add" size={ 25 } color="#fff" />;
    }

    if (tipo === TipoBotao.avancar || tipo === TipoBotao.confirmar) {

      return <AntDesign name="arrow-right" size={ 25 } color="#fff" />;
    }

    if (tipo === TipoBotao.editar) {

      return <FontAwesome6 name="edit" size={ 25 } color="#fff" />;
    }

    if (tipo === TipoBotao.deletar) {

      return <MaterialCommunityIcons name="delete-outline" size={ 25 } color="#fff" />;
    }

    return null;
  }

  return <Pressable
    style={ [
      styles.botao,
      botaoLogin && { width: "100%", marginStart: 0, marginEnd: 0, marginTop: 20 },
      (!habilitado && !carregando) && styles.botaoDesabilitado,
      margemTopo != undefined && { marginTop: margemTopo },
      margemBaixo != undefined && { marginBottom: margemBaixo },
      tipo === TipoBotao.deletar && styles.botaoDeletar,
      tipo === TipoBotao.confirmar && styles.botaoConfirmar
    ] }
    disabled={ !habilitado }
    onPress={ onExecutar }>
    { !carregando ? <View style={ styles.containerTextoIcone }>
      <View style={ [
        styles.fundoContainerIconeBotao,
        tipo === TipoBotao.deletar && styles.fundoContainerIconeBotaoDeletar,
        tipo === TipoBotao.confirmar && styles.fundoContainerBotaoConfirmar
      ] }>
        { getIconeBotao() } 
      </View>
      <Text style={ [
        styles.textoBotao,
        tipo === TipoBotao.confirmar && styles.txtBotaoConfirmar
      ] }>{ titulo }</Text>
    </View> : <ActivityIndicator size={ 40 } color={
      tipo === TipoBotao.confirmar ? config.corPrimaria : "#fff"
    } /> }
  </Pressable>
}

export default Botao;