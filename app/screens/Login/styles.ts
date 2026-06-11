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
  },
  containerLembrarEsqueciSenha: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10
  },
  txtEsqueceuSenha: {
    color: config.corPrimaria,
    fontWeight: "bold",
    fontSize: 15
  },
  checkBoxLembrar: {
    width: 22,
    height: 22,
    borderRadius: 5,
    backgroundColor: config.corBordas,
    marginEnd: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  containerLembrar: {
    flexDirection: "row",
    alignItems: "center"
  },
  checkBoxLembrarHabilitado: {
    backgroundColor: config.corPrimaria
  },
  containerNaoTemConta: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
    marginBottom: 30
  },
  txtCadastrese: {
    color: config.corPrimaria,
    fontWeight: "bold",
    marginStart: 6,
    fontSize: 15
  }

});

export default styles;