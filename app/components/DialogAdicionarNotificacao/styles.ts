import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "78%",
    backgroundColor: "#fff",
    padding: 10,
    elevation: 10,
    zIndex: 999999999
  },
  containerTopo: {
    width: "100%",
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  titulo: {
    fontWeight: 900,
    color: "#000",
    fontSize: 22,
    marginBottom: 10,
    marginTop: 40,
    textAlign: "center"
  },
  subtitulo: {
    color: "#666",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
    marginStart: 20,
    marginEnd: 20
  }

});

export default styles;