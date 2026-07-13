import config from "@/app/config";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  
  leaderCarregando: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  leadItem: {
    width: "95%",
    marginStart: "2.5%",
    marginEnd: "2.5%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 20,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: config.corBordas,
    borderStyle: "solid"
  },
  nome: {
    color: "#000",
    fontWeight: "900",
    fontSize: 18,
    marginBottom: 10
  },
  documento: {
    color: config.corPrimaria,
    fontWeight: "bold",
    fontSize: 15
  },
  dado: {
    color: "#000",
    fontSize: 15
  },
  statusContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10
  },
  status: {
    width: "65%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    borderRadius: 12
  },
  botaoVisulizarMaisDetalhes: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },
  txtVisualizarMaisDetalhes: {
    color: config.corPrimaria,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationColor: config.corPrimaria,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    fontSize: 16
  }
  
});