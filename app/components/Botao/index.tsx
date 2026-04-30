import { ActivityIndicator, Pressable, Text } from "react-native";
import styles from "./styles";

interface BotaoProps {

  titulo: string;
  onExecutar: () => void;
  habilitado?: boolean;
  carregando?: boolean;
  botaoLogin?: boolean;

}

// componente que representa um botão
const Botao = ({
  titulo,
  habilitado,
  carregando,
  onExecutar,
  botaoLogin = false
}: BotaoProps) => {

  return <Pressable
    style={ [
      styles.botao,
      botaoLogin && { width: "100%", marginStart: 0, marginEnd: 0, marginTop: 20 }
    ] }
    disabled={ !habilitado }
    onPress={ onExecutar }>
    { !carregando ? <Text style={ styles.textoBotao }>{ titulo }</Text> : <ActivityIndicator size={ 40 } color="#fff" /> }
  </Pressable>
}

export default Botao;