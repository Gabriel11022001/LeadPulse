import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 9999999999999
  },
  corpo: {
    width: "95%",
    marginStart: "2.5%",
    marginEnd: "2.5%",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#fff"
  },
  titulo: {
    textAlign: "center",
    marginTop: 10,
    color: "#000",
    fontSize: 23,
    fontWeight: 900
  },
  subtitulo: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20
  },
  containerBotoes: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 20
  },
  botaoAplicarFiltro: {
    width: "45%",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: config.corPrimaria,
    borderRadius: 12
  },
  txtBotaoAplicarFiltro: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginEnd: 10
  },
  botaoLimparFiltro: {
    width: "45%",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: config.corPrimaria,
    borderStyle: "solid"
  },
  txtBotaoLimparFiltro: {
    color: config.corPrimaria,
    fontSize: 16,
    fontWeight: "bold",
    marginEnd: 10
  },
  separadorTopo: {
    width: 50,
    height: 6,
    backgroundColor: "rgba(178, 190, 195, 1.0)",
    borderRadius: 100
  },
  separadorTopoContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  containerBotaoFechar: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  botaoFechar: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 12
  }

});

export default styles;