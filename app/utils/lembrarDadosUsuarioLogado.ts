import * as SecureStore from "expo-secure-store";

const lembrarDadosUsuarioLogado =  async (email: string, lembrar: boolean) => {

  try {

    if (lembrar) {
      await SecureStore.setItemAsync("lembrar", "S");
      await SecureStore.setItemAsync("email", email);
    } else {
      await SecureStore.setItemAsync("lembrar", "N");
      await SecureStore.setItemAsync("email", "");
    }

  } catch (e) {
    console.log("Erro: " + e);

    throw e;
  }

}

export default lembrarDadosUsuarioLogado;