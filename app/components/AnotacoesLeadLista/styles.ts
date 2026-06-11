import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 40
  },
  containerExpandir: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#111827"
  },
  loader: {
    width: "100%",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  txtCarregando: {
    color: "#000",
    fontSize: 15,
    textAlign: "center",
    marginTop: 10
  },
  containerNaoExistemAnotacoes: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  txtNaoExistemAnotacoes: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  anotacaoItem: {
    backgroundColor: "#fff",
    padding: 20,
    borderStyle: "solid",
    borderColor: config.corBordas,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 7,
    marginBottom: 7,
    elevation: 5
  },
  containerDataCadastro: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%"
  },
  txtDataCadastro: {
    color: "#6B7280",
    marginStart: 7,
    fontSize: 13
  },
  containerAnotacaoOperacoes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  txtAnotacao: {
    color: "#000",
    fontSize: 15
  },
  containerTextoOperacao: {
    flex: 2
  },
  containerOperoes: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderStartColor: config.corBordas,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    marginStart: 10
  },
  operacao: {
    margin: 10,
    padding: 10,
    borderRadius: "100%"
  },
  editar: {
    backgroundColor: "rgba(59, 130, 246, 0.12)"
  },
  deletar: {
    backgroundColor: "rgba(239, 68, 68, 0.12)"
  },
  containerCampoSalvarAnotacao: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 10,
    borderStyle: "solid",
    borderWidth: 4,
    borderColor: config.corPrimaria,
    elevation: 5
  },
  iconeAnotacao: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginEnd: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(59, 130, 246, 0.12)"
  },
  campoAnotacao: {
    flex: 1,
    color: "#000",
    fontSize: 14
  },
  separadorBaixo: {
    width: "100%",
    height: 1,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: config.corBordas
  }

});

export default styles;