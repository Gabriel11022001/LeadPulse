import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  botaoCancelar: {
    backgroundColor: "transparent",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    height: 65,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: config.corPrimaria,
    marginTop: 10,
    marginBottom: 10
  },
  txtBotaoCancelar: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  }

});

export default styles;