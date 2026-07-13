import LeadPulseTela from "@/app/components/LeadPulseTela";
import ListaLeads from "@/app/components/ListaLeads";
import MenuTopo, { TipoTela } from "@/app/components/MenuTopo";
import buscarLeadPeloIdService from "@/app/service/buscarLeadPeloIdService";
import filtrarLeadsService from "@/app/service/filtrarLeadsService";
import { Lead } from "@/app/types/lead";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";

// tela de gestão de leads
const GestaoLeads = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ carregandoAtualizarStatusLead, setCarregandoAtualizarStatusLead ] = useState<boolean>(false);
  const [ leads, setLeads ] = useState<Lead[]>([]);
  const [ expandirVerMaisDetalhes, setExpandirVerMaisDetalhes ] = useState<boolean>(false);
  const [ leadVisualizarAtual, setLeadVisualizarAtual ] = useState<Lead | null>(null);
  const [ carregandoVisualizarLead, setCarregandoVisualizarLead ] = useState<boolean>(false);

  // listar os leads
  const carregarLeads = async () => {

    try {
      setCarregando(true);

      const leadsCadastrados: Array<Lead> = await filtrarLeadsService({
        status: "todos"
      });

      if (leadsCadastrados.length === 0) {
        setLeads([]);
      } else {
        setLeads(leadsCadastrados);
      }

    } catch (e) {
      console.log("Erro ao tentar-se listar os leads: " + e);
    } finally {
      setCarregando(false);
    }

  }

  // alterar o status do lead
  const alterarStatusLead = async (id: string, raiaMover: string, raiaAtual: string) => {

  }

  // visualizar o lead
  const visualizarLead = async (id: string) => {
    console.log("Visualizar os dados do lead de id " + id);

    try {
      setCarregandoVisualizarLead(true);
      setLeadVisualizarAtual(null);

      const lead: Lead | null = await buscarLeadPeloIdService(id);
      setLeadVisualizarAtual(lead);
    } catch (e) {
      
    } finally {
      setCarregandoVisualizarLead(false);
    }

  }

  useFocusEffect(useCallback(() => {
    carregarLeads();
  }, []));
  
  return <LeadPulseTela>
    { /** menu do topo */ }
    <MenuTopo
      titulo="Leads"
      subtitulo="Gerenciar os leads"
      onVoltar={ () => {
        navigation.goBack();
      } }
      tela={ TipoTela.perfil } />
    <ScrollView showsVerticalScrollIndicator={ false }>
      { /** lista dos leads cadastrados */ }
      <ListaLeads
        leads={ leads }
        leadVisualizarAtual={ leadVisualizarAtual }
        carregando={ carregando || carregandoAtualizarStatusLead }
        onVisualizarLead={ (idLeadVisualizar: string) => {
          const expandir: boolean = !expandirVerMaisDetalhes;
          setExpandirVerMaisDetalhes(expandir);

          if (expandir) {
            visualizarLead(idLeadVisualizar);
          }

        } }
        expandirVerMaisDetalhes={ expandirVerMaisDetalhes }
        carregandoVisualizarLead={ carregandoVisualizarLead } />
    </ScrollView>
  </LeadPulseTela>
}

export default GestaoLeads;