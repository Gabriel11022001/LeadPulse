import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  opcao: {
    backgroundColor: "#fff",
    width: "47%",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    elevation: 4
  },
  opcaoSelecionada: {
    backgroundColor: config.corPrimaria
  },
  txtOpcao: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20
  },
  txtOpcaoSelecionada: {
    color: "#fff"
  }

});

export default styles;
