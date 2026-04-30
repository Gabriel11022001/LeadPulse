import Feather from "@expo/vector-icons/Feather";
import { View } from "react-native";
import styles from "./styles";

const LeadPulseUp = () => {

  return <View style={ styles.container }>
    <Feather name="trending-up" size={ 50 } color="black" />
  </View>
}

export default LeadPulseUp;