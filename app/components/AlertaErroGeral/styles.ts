import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(52, 152, 219, 0.4)"
  },
  corpoAlerta: {
    width: "80%",
    marginStart: "10%",
    marginEnd: "10%",
    padding: 20,
    borderRadius: 30,
    backgroundColor: config.corPrimaria,
    alignItems: "center",
    justifyContent: "center"
  },
  texto: {
    color: "#fff"
  },
  titulo: {
    fontSize: 18,
    marginTop: 10
  },
  mensagem: {
    fontSize: 15,
    marginTop: 10
  },
  btnOk: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(191, 219, 254, 0.5)",
    width: "100%"
  },
  txtBtnOk: {
    textAlign: "center",
    fontSize: 18,
    color: "#000",
    fontWeight: "bold"
  }

});

export default styles;