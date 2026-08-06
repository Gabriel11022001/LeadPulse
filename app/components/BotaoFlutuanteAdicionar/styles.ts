import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  botao: {
    width: 70,
    height: 70,
    backgroundColor: config.corPrimaria,
    borderRadius: 35,
    elevation: 5,
    position: "absolute",
    right: 10,
    bottom: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    zIndex: 999999
  }

});

export default styles;