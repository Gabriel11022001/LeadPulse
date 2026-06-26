import LeadPulseProvider from "@/provider";
import config from "./app/config";
import gerarNotificacoesFake from "./app/dados_fake/gerarNotificacoesFake";
import Navigation from "./app/navigation";

const App = () => {

  if (config.ambiente === "teste" && config.habilitarDadosFake) {
    // gerar dados fake
    gerarNotificacoesFake();
  }

  return <LeadPulseProvider>
    <Navigation />
  </LeadPulseProvider>
}

export default App;