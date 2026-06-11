import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

interface Props {

  children: any;

}

const LeadPulseTela = ({ children }: Props) => {

  return <SafeAreaView style={ styles.tela }>
    { children }
  </SafeAreaView>
}

export default LeadPulseTela;