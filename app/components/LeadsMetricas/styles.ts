import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  metrica: {
    width: 220,
    height: 120,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: config.corBordas,
    elevation: 5,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginStart: 10,
    marginEnd: 10
  },
  tituloStatus: {
    color: "#000",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center"
  },
  quantidade: {
    color: "#000",
    fontWeight: 900,
    fontSize: 20
  },
  containerIcone: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  containerMetricas: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 1,
    marginStart: 20
  }

});

export default styles;