import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  header: {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    height: "auto",
    padding: 30,
    marginBottom: 40
  },
  titulo: {
    color: "#fff",
    fontSize: 25,
    fontWeight: 900,
    marginTop: 10
  },
  subtitulo: {
    color: "#fff",
    fontSize: 16,
    marginTop: 6,
    opacity: 0.8
  },
  containerLeadsEncontrados: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    flexDirection: "row",
    backgroundColor: "rgba(191, 219, 254, 0.15)",
    width: "auto"
  },
  txtLeadsEncontrados: {
    color: "#fff",
    fontSize: 14,
    marginStart: 6
  },
  containerLeadsEncontradosBotaoAdicionar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30
  },
  btnRedirecionarAdicionarLead: {
    backgroundColor: "#fff",
    width: 70,
    height: 70,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -45,
    right: 0,
    elevation: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: config.corBordas
  },
  containerBotaoVoltarBotaoNotificacoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30
  },
  botaoOperacaoHome: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "rgba(191, 219, 254, 0.15)"
  },
  notificacao: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center"
  }

});

export default styles;