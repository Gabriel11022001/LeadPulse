import { Pressable, Text } from "react-native";
import styles from "./styles";

interface BotaoCancelarProps {
  
  titulo: string;
  margemTop?: number;
  margemBottom?: number;
  onCancelar: () => void;

}

// botão de cancelar opração
const BotaoCancelar = ({
  titulo,
  margemTop,
  margemBottom,
  onCancelar
}: BotaoCancelarProps) => {

  return <Pressable
    style={ [
      styles.botaoCancelar,
      margemTop != undefined && { marginTop: margemTop },
      margemBottom != undefined && { marginBottom: margemBottom }
    ] }
    onPress={ onCancelar }>
    <Text style={ styles.txtBotaoCancelar }>{ titulo }</Text>
  </Pressable>
}

export default BotaoCancelar;