import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TouchableOpacity } from "react-native";
import styles from "./styles";

interface BotaoFlutuanteAdicionarProps {

  onAdicionar: () => void;

}

// botão flutuante para redirecionar para adicionar
const BotaoFlutuanteAdicionar = ({ onAdicionar }: BotaoFlutuanteAdicionarProps) => {

  return <TouchableOpacity
    style={ styles.botao }
    onPress={ onAdicionar }>
      <FontAwesome6 name="add" size={ 40 } color="#fff" />
  </TouchableOpacity>
}

export default BotaoFlutuanteAdicionar;