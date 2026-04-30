import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: config.corPrimaria
  },
  conteudo: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100
  },
  formLogin: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 5
  },
  titulo: {
    color: "#fff",
    fontSize: 30,
    fontWeight: 900,
    marginTop: 10,
    marginBottom: 10
  },
  subtitulo: {
    color: "#fff",
    fontSize: 16
  }

});

export default styles;