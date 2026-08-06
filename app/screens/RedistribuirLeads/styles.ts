import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  item: {
    width: "95%",
    marginStart: "2.5%",
    marginEnd: "2.5%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  containerRadioSelecionar: {
    width: "15%",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  containerDadosLead: {
    width: "80%"
  },
  radio: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: config.corBordas,
    borderRadius: 20
  },
  nome: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000",
    marginBottom: 10,
    marginEnd: 20
  },
  dado: {
    fontSize: 14,
    marginEnd: 20
  },
  botaoDialogRedistribuir: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    backgroundColor: "#fff",
    elevation: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: config.corBordas,
    position: "absolute",
    bottom: 50,
    right: 5,
    zIndex: 9999999
  },
  dialogSelecionarUsuario: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999999999999
  },
  corpoSelecionarUsuario: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    height: "90%"
  },
  dialogSelecionarUsuarioTitulo: {
    color: "#000",
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
    fontWeight: 900
  },
  dialogSelecionarUsuarioSubtitulo: {
    color: "#000",
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 30
  },
  containerBotaoFechar: {
    width: "100%",
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
    borderRadius: 20
  },
  itemUsuario: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: config.corBordas
  },
  containerRadioItemUsuario: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center"
  },
  containerDadosUsuario: {
    width: "80%",
    marginStart: "5%"
  },
  alertaSelecioneUsuario: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "red",
    padding: 20,
    borderRadius: 12
  },
  alertaSelecioneUsuarioTexto: {
    color: "#fff",
    marginStart: 10,
    marginEnd: 10,
    fontSize: 14
  }

});

export default styles;