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
  botaoDeletar: {
    backgroundColor: "#FF1A1A"
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  botaoDesabilitado: {
    opacity: 0.5
  },
  fundoContainerIconeBotao: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(191, 219, 254, 0.15)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginEnd: 10
  },
  fundoContainerIconeBotaoDeletar: {
    backgroundColor: "rgba(254, 202, 202, 0.30)"
  },
  containerTextoIcone: {
    flexDirection: "row",
    alignItems: "center"
  },
  botaoConfirmar: {
    backgroundColor: "#fff"
  },
  txtBotaoConfirmar: {
    color: "#000"
  },
  fundoContainerBotaoConfirmar: {
    backgroundColor: config.corPrimaria
  }

});

export default styles;