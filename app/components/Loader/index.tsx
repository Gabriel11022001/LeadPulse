import { ActivityIndicator, Text, View } from "react-native";
import LeadPulseUp from "../LeadPulseUp";
import styles from "./styles";

interface LoaderProps {

  carregando: boolean;
  msgLoader?: string;

}

// loader de carregamento da tela
const Loader = ({ carregando, msgLoader }: LoaderProps) => {

  if (!carregando) {

    return null;
  }

  return <View style={ styles.containerLoader }>
    <LeadPulseUp />
    <ActivityIndicator color="#fff" size={ 40 } style={ { marginTop: 30 } } />
    { msgLoader ? <Text style={ styles.txtLoader }>{ msgLoader }</Text> : <Text style={ styles.txtLoader }>
      Carregando, aguarde...
    </Text> }
  </View>
}

export default Loader;