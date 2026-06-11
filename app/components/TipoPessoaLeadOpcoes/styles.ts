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
    width: "48%",
    height: 190,
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    elevation: 10,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "transparent"
  },
  opcaoSelecionada: {
    backgroundColor: "#F0F4F9",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: config.corPrimaria
  },
  txtOpcao: {
    color: "#1F2937",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20
  },
  txtOpcaoSubtitulo: {
    color: "#6B7280",
    fontSize: 14,
    marginTop: 6
  },
  txtOpcaoSelecionada: {
    color: "#3B82F6"
  },
  containerIcone: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0, 0.05)"
  },
  containerIconeSelecionado: {
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#fff",
    backgroundColor: "#F0F4F9"
  },
  checkContainer: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: config.corPrimaria,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    right: 10
  }

});

export default styles;
