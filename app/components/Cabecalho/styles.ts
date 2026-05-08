import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  cabecalho: {
    width: "100%",
    height: 80,
    backgroundColor: "#fff",
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 20,
    paddingBottom: 20,
    elevation: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 40,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0
  },
  containerVoltar: {
    flexDirection: "row",
    alignItems: "center"
  },
  txtTitulo: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginStart: 6
  }

});

export default styles;