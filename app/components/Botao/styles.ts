import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  botao: {
    backgroundColor: config.corPrimaria,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    height: 65
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  botaoDesabilitado: {
    opacity: 0.5
  }

});

export default styles;