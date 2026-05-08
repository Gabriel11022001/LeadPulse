import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  containerLoader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999999,
    padding: 20
  },
  txtLoader: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10
  }

});

export default styles;