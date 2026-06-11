import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  containerTopo: {
    width: "95%",
    marginStart: "2.5%",
    marginEnd: "2.5%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: config.corBordas
  },
  titulo: {
    color: "#000",
    fontWeight: 900,
    fontSize: 18
  },
  txtMeusLeads: {
    color: config.corPrimaria,
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 15
  },
  containerCampoFiltro: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: config.corBordas,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 15
  },
  campoFiltro: {
    flex: 1,
    color: "#000",
    fontSize: 13,
    height: "100%"
  },
  statusLead: {
    padding: 10,
    backgroundColor: config.corBordas,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 20,
    marginEnd: 10
  },
  txtStatusNome: {
    color: "#000",
    fontWeight: "bold",
    marginEnd: 5
  },
  statusLeadSelecionado: {
    backgroundColor: config.corPrimaria
  },
  txtStatusNomeSelecionado: {
    color: "#fff"
  }

});

export default styles;