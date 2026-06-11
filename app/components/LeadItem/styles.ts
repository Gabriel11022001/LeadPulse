import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  leadItem: {
    width: "95%",
    marginStart: "2.5%",
    marginEnd: "2.5%",
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderStyle: "solid",
    borderColor: config.corBordas,
    borderWidth: 1
  },
  containerNomeLeadStatus: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  nomeLead: {
    color: config.corPrimaria,
    fontWeight: 900,
    fontSize: 15,
    textTransform: "uppercase"
  },
  statusIconeContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30
  },
  containerStatusLead: {
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  },
  containerStatusLeadQualificado: {
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8"
  },
  containerStatusEmQualificacao: {
    backgroundColor: "#F3E8FF",
    color: "#7E22CE"
  },
  containerStatusDesqualificado: {
    backgroundColor: "#FFEDD5",
    color: "#C2410C"
  },
  containerStatusCliente: {
    backgroundColor: "#D1FAE5",
    color: "#15803D"
  },
  dadoLead: {
    color: "#000",
    marginTop: 5,
    fontSize: 14
  },
  containerOrigemLead: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  circuloOrigem: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: config.corPrimaria,
    marginEnd: 5
  },
  origem: {
    color: "#000",
    fontWeight: "bold",
    marginEnd: 5
  }

});

export default styles;