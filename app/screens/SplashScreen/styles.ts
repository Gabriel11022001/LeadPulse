import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: config.corPrimaria
  },
  nomeApp: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    marginTop: 10,
    fontWeight: 900
  },
  subTitulo: {
    color: "#fff",
    fontSize: 20,
    marginTop: 6,
    marginBottom: 20
  }

});

export default styles;