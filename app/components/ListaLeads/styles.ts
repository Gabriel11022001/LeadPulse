import config from "@/app/config";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  
  leadCarregando: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  item: {
    width: "95%",
    marginStart: "2.5%",
    marginEnd: "2.5%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: config.corBordas,
    elevation: 4,
    padding: 10
  },
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  containerPrimeiraLetra: {
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  primeiraLetra: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  primeiraLetraTexto: {
    fontWeight: 900,
    fontSize: 20,
    textAlign: "center"
  },
  containerDadosLead: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    height: "100%"
  },
  nome: {
    color: "#000",
    fontWeight: 900,
    fontSize: 18,
    marginEnd: 10
  },
  dado: {
    color: "#000",
    fontSize: 14,
    marginEnd: 10,
    marginTop: 5,
    marginBottom: 5
  },
  dadoBaixo: {
    padding: 6,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    marginEnd: 10
  },
  dadoBaixoTexto: {
    color: "#6B7280",
    marginStart: 7,
    fontWeight: "bold"
  },
  containerOperacoesStatus: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "100%"
  },
  status: {
    width: 100,
    padding: 5,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  botaoOperacoes: {
    width: 40,
    height: 40,
    backgroundColor: "#fafafa",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  botaoVerMaisDetalhes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  txtBotaoVerMaisDetalhes: {
    color: config.corPrimaria,
    fontWeight: "bold",
    fontSize: 14,
    marginEnd: 5
  }
  
});