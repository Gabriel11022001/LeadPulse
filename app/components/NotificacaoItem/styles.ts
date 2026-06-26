import config from "@/app/config";
import { StyleSheet } from "react-native";

export default StyleSheet.create({

  notificacao: {
    backgroundColor: "#fff",
    width: "95%",
    marginStart: "2.5%",
    marginEnd: "2.5%",
    marginTop: 7,
    marginBottom: 7,
    padding: 10,
    elevation: 10,
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: config.corBordas
  },
  topo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20
  },
  txtDataCadastro: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    marginStart: 7
  },
  mensagem: {
    color: "#000",
    width: "100%",
    fontSize: 14
  },
  usuarioRegistrou: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 14,
    color: config.corPrimaria,
    marginEnd: 10
  }

});