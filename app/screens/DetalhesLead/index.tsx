import AlertaErroGeral from "@/app/components/AlertaErroGeral";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import Loader from "@/app/components/Loader";
import buscarLeadPeloIdService from "@/app/service/buscarLeadPeloIdService";
import { Lead } from "@/app/types/lead";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";

// tela com detalhes do lead
const DetalhesLead = ({ navigation, route }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ lead, setLead ] = useState<Lead | null>(null);
  const [ erroGeral, setErroGeral ] = useState<string>("");

  // buscar o lead pelo id
  const buscarLeadPeloId = async () => {

    try {
      setCarregando(true);
      setErroGeral("");

      if (route.params && route.params.idLeadVisualizar) {
        const leadVisualizar: Lead | null = await buscarLeadPeloIdService(route.params.idLeadVisualizar ?? "");

        if (leadVisualizar != null) {
          setLead(leadVisualizar);

          console.log("Lead encontrado com sucesso na base de dados.");
        } else {
          setErroGeral("Erro! Não foi encontrado um lead com o id informado!");
        }

      }

    } catch (e) {
      // apresentar alerta de erro
    } finally {
      setCarregando(false);
    }

  }

  // retornar a tela de listagem de leads
  const voltar = () => {
    navigation.goBack();
  }

  useFocusEffect(useCallback(() => {
    // consultar o lead pelo id no servidor
    buscarLeadPeloId();
  }, []));

  return <LeadPulseTela>
    { /** loader de carregamento da tela */ }
    <Loader carregando={ carregando } />
    <AlertaErroGeral
      apresentar={ erroGeral != "" }
      mensagem={ erroGeral }
      onFechar={ () => {

        if (erroGeral === "Erro! Não foi encontrado um lead com o id informado!") {
          voltar();
        } else {
          setErroGeral("");
        }

      } } />
    <ScrollView showsVerticalScrollIndicator={ false }>
      
    </ScrollView>
  </LeadPulseTela>
}

export default DetalhesLead;