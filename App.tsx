import LeadPulseProvider from "@/provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import config from "./app/config";
import gerarLeadsFake from "./app/dados_fake/gerarLeadsFake";
import gerarNotificacoesFake from "./app/dados_fake/gerarNotificacoesFake";
import Navigation from "./app/navigation";

const App = () => {

  if (config.ambiente === "teste" && config.habilitarDadosFake) {
    // gerar dados fake
    gerarNotificacoesFake();
    // gerar leads fake
    gerarLeadsFake();
  }

  return <GestureHandlerRootView>
    <LeadPulseProvider>
      <Navigation />
    </LeadPulseProvider>
  </GestureHandlerRootView>
}

export default App;