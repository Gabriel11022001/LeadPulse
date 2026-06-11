import config from '@/app/config';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Pressable, Text, View } from "react-native";
import styles from './styles';

interface CabecalhoProps {

  titulo: string;
  habilitarBotaoVoltar: boolean;
  onVoltar?: () => void;
  children?: any;

}

// componente que representa o cabeçalho do app
const Cabecalho = ({
  titulo,
  habilitarBotaoVoltar,
  onVoltar,
  children
}: CabecalhoProps) => {

  return <View style={ styles.cabecalho }>
    { /** botão de voltar */ } 
    { habilitarBotaoVoltar ? <View>
      <Pressable onPress={ onVoltar } style={ styles.containerVoltar }>
        <SimpleLineIcons name="arrow-left" size={ 30 } color={ config.corPrimaria } />
        <Text style={ styles.txtTitulo }>{ titulo }</Text>
      </Pressable>
    </View> : <Text style={ styles.txtTitulo }>{ titulo }</Text> }
    { /** opções que vçao ficar a direita do cabeçalho */ }
    { children ? <View>
      { children }
    </View> : <View /> }
  </View>
}

export default Cabecalho;