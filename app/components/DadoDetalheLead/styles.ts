import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#D1D5DB",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "transparent",
    justifyContent: "space-between"
  },
  nomeRazaoSocial: {
    color: "#111827",
    fontWeight: 900,
    fontSize: 18
  },
  valorDado: {
    color: "#64748B",
    fontSize: 15,
    flexShrink: 1,
    marginEnd: 40
  },
  containerDado: {
    marginStart: 10
  },
  tituloDado: {
    fontWeight: "bold",
    color: "#111827",
    fontSize: 16
  },
  containerDadoIcone: {
    flexDirection: "row",
    alignItems: "flex-start",
    maxWidth: "80%"
  },
  subvalor: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold"
  }

});