import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999999,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  corpo: {
    backgroundColor: "#fff",
    padding: 20,
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  },
  titulo: {
    color: "#000",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 24
  },
  subtitulo: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
    color: "#64748B"
  },
  containerStatus: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 12,
    elevation: 10,
    borderColor: config.corBordas,
    borderWidth: 1,
    borderStyle: "solid",
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginEnd: 10,
    backgroundColor: "#fafafa",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: config.corBordas
  },
  radioSelecionado: {
    backgroundColor: config.corPrimaria
  }

});

export default styles;