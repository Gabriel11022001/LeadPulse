import Feather from "@expo/vector-icons/Feather";
import { View } from "react-native";
import styles from "./styles";

type Props = {

  margemTopo?: number;
  margemBaixo?: number;

}

const LeadPulseUp = ({ margemBaixo, margemTopo }: Props) => {

  return <View style={ [
    styles.container,
    {
      marginTop: margemTopo ?? 0,
      marginBottom: margemBaixo ?? 0
    }
  ] }>
    <Feather name="trending-up" size={ 50 } color="black" />
  </View>
}

export default LeadPulseUp;