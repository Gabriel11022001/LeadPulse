import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  header: {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    height: "auto",
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 40,
    paddingBottom: 40,
    marginBottom: 40
  },
  containerVoltar: {
    flexDirection: "row",
    alignItems: "center"
  },
  botaoVoltar: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "rgba(191, 219, 254, 0.15)"
  },
  txtTituloBotaoVoltar: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginStart: 10
  },
  containerBaixo: {
    width: "100%",
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tituloTela: {
    color: "#fff",
    fontSize: 24,
    fontWeight: 900,
    marginBottom: 5
  },
  subtitulo: {
    color: "#fff",
    fontSize: 15
  },
  containerIconeTela: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 5
  }

});

export default styles;