import config from "@/app/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 15
  },
  txtTituloStatusLead: {
    color: config.corPrimaria,
    fontWeight: "900",
    fontSize: 16,
    marginStart: 10
  },
  containerTopoStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  containerCorpoStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  txtStatusLead: {
    color: "#64748B",
    fontSize: 15
  }

});

export default styles;