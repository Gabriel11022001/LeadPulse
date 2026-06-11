import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  campo: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center"
  },
  titulo: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16
  },
  containerConteudoIcone: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "solid",
    padding: 7,
    borderColor: config.corBordas,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 7,
    backgroundColor: "#fff"
  },
  campoConteudo: {
    flex: 1,
    color: "#000",
    fontSize: 15
  },
  campoComErro: {
    borderColor: "red",
    borderWidth: 2
  },
  erro: {
    color: "red",
    fontSize: 15,
    marginTop: 5
  },
  campoDesabilitado: {
    opacity: 0.5
  }

});

export default styles;