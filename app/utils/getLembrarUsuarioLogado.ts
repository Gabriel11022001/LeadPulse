import * as SecureStore from "expo-secure-store";

const getLembrarUsuarioLogado = async () => {

  try {
    let lembrar: boolean = false;
    let email: string = "";

    await SecureStore.getItemAsync("lembrar")
      .then((res) => {

        if (res === "S") {
          lembrar = true;
        } else {
          lembrar = false;
        }

      })
      .catch((erro: string) => {
        console.log(erro);
      });

    await SecureStore.getItemAsync("email")
      .then((res) => {
        email = res?.toString() ?? "";
      });

    return {
      lembrar: lembrar,
      email: email
    };
  } catch (e) {

    throw e;
  }

}

export default getLembrarUsuarioLogado;