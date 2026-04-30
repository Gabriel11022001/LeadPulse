import { SafeAreaView } from "react-native-safe-area-context";

interface Props {

  children: any;

}

const LeadPulseTela = ({ children }: Props) => {

  return <SafeAreaView>
    { children }
  </SafeAreaView>
}

export default LeadPulseTela;