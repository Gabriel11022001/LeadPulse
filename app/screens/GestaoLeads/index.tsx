import LeadPulseTela from "@/app/components/LeadPulseTela";
import Loader from "@/app/components/Loader";
import MenuTopo, { TipoTela } from "@/app/components/MenuTopo";
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

  // leads por status
  const [ clientes, setClientes ] = useState<Array<Lead>>([]);
  const [ qualificados, setQualificados ] = useState<Array<Lead>>([]);
  const [ desqualificados, setDesqualificados ] = useState<Array<Lead>>([]);
  const [ emQualificacao, setEmQualificacao ] = useState<Array<Lead>>([]);

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

        separarLeadsPorStatus(leadsCadastrados);
      }

    } catch (e) {
      console.log("Erro ao tentar-se listar os leads: " + e);
    } finally {
      setCarregando(false);
    }

  }

  // alterar o status do lead
  const alterarStatusLead = async (id: string, raiaMover: string, raiaAtual: string) => {
    console.log(`Mover o lead de id ${ id } da raia ${ raiaAtual } para ${ raiaMover }`);
  }

  // separar os leads pelo status
  const separarLeadsPorStatus = (leads: Array<Lead>) => {
    const emQualificacao: Array<Lead> = leads.filter(l => l.status === "aguardando_qualificacao");
    const clientes: Array<Lead> = leads.filter(l => l.status === "cliente");
    const qualificados: Array<Lead> = leads.filter(l => l.status === "qualificado");
    const cancelados: Array<Lead> = leads.filter(l => l.status === "desqualificado");

    setEmQualificacao(emQualificacao);
    setClientes(clientes);
    setQualificados(qualificados);
    setDesqualificados(cancelados);
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
    { /** loader de carregamento da tela */ }
    <Loader carregando={ carregando || carregandoAtualizarStatusLead } />
    <ScrollView showsVerticalScrollIndicator={ false }>
      
    </ScrollView>
  </LeadPulseTela>
}

export default GestaoLeads;