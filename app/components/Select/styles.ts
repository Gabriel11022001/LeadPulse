import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  campo: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center"
  },
  titulo: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16
  },
  containerConteudo: {
    width: "100%",
    borderStyle: "solid",
    padding: 7,
    borderColor: config.corBordas,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 7,
    backgroundColor: "#fff"
  }

});

export default styles;