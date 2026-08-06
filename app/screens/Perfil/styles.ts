import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  containerAlterarSenha: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    borderStyle: "solid",
    borderColor: config.corBordas,
    borderWidth: 0.5
  },
  containerAlterarSenhaTopo: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  containerAlterarSenhaCorpo: {
    width: "100%",
    marginTop: 10
  },
  containerAlterarSenhaTopoTitulo: {
    color: config.corPrimaria,
    fontSize: 17,
    fontWeight: 900
  }

});

export default styles;