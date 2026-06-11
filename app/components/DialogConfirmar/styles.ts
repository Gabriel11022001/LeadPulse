import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999999999,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  corpo: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    backgroundColor: "#f1f1f1",
    padding: 20,
    borderRadius: 20,
    elevation: 5
  },
  titulo: {
    color: "#000",
    fontWeight: 900,
    fontSize: 20,
    marginTop: 20,
    textAlign: "center"
  },
  texto: {
    marginTop: 20,
    fontSize: 16,
    color: "#000",
    textAlign: "center"
  },
  containerLoader: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  txtAguarde: {
    color: config.corPrimaria,
    fontWeight: 900,
    marginTop: 10,
    fontSize: 16,
    textAlign: "center"
  }

});

export default styles;