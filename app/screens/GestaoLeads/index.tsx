import LeadPulseTela from "@/app/components/LeadPulseTela";
import ListaLeads from "@/app/components/ListaLeads";
import MenuTopo, { TipoTela } from "@/app/components/MenuTopo";
import filtrarLeadsPorTextoService from "@/app/service/filtrarLeadsPorTextoService";
import filtrarLeadsService from "@/app/service/filtrarLeadsService";
import { Lead } from "@/app/types/lead";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

// tela de gestão de leads
const GestaoLeads = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ carregandoAtualizarStatusLead, setCarregandoAtualizarStatusLead ] = useState<boolean>(false);
  const [ leads, setLeads ] = useState<Lead[]>([]);
  const [ filtroTextoLead, setTextoFiltroLead ] = useState<string>("");

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
        setLeads(organizarLeadsOrdemAlfabetica(leadsCadastrados));
      }

    } catch (e) {
      console.log("Erro ao tentar-se listar os leads: " + e);
    } finally {
      setCarregando(false);
    }

  }

  // organizar os leads em ordem alfabética
  const organizarLeadsOrdemAlfabetica = (leads: Array<Lead>): Array<Lead> => {

    return [...leads].sort((a, b) => {
      const nomeA = (a.nomeCompleto ?? a.razaoSocial ?? "").trim();
      const nomeB = (b.nomeCompleto ?? b.razaoSocial ?? "").trim();

      return nomeA.localeCompare(nomeB, "pt-BR", {
        sensitivity: "base",
      });
    });
  };

  // visualizar o lead
  const visualizarLead = async (id: string) => {
    console.log("Visualizar os dados do lead de id " + id);

    navigation.navigate("detalhes_lead", { idLeadVisualizar: id });
  }

  // filtrar o lead pelo texto digitado no campo de pesquisa
  const filtrarLeadsPeloTexto = async () => {

    try {
      const textoFiltro: string = filtroTextoLead;

      if (textoFiltro.trim().length === 0) {
        // filtrar todos
        await carregarLeads();
      } else {
        setCarregando(true);

        // aplicar o filtro e retornar os leads
        const retorno: { quantidade_encontrados: number, leads: Array<Lead> } = await filtrarLeadsPorTextoService(textoFiltro);

        if (retorno.quantidade_encontrados === 0) {
          await carregarLeads();

          Alert.alert("Atenção!", "Não foram encontrados leads por esse termo!", [
            {
              onPress: () => null,
              style: "default",
              text: "Ok"
            }
          ]);
        } else {
          setLeads(retorno.leads);
        }

      }

    } catch (e) {
      // apresetar alerta de erro
      console.log(`Erro ao tentar-se filtrar o lead: ${ e }`);
    } finally {
      setCarregando(false);
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
    { /** lista dos leads cadastrados */ }
    <ListaLeads
      leads={ leads }
      carregando={ carregando || carregandoAtualizarStatusLead }
      onVisualizarLead={ (idLeadVisualizar: string) => {
        visualizarLead(idLeadVisualizar);
      } }
      onClickOperacoes={ () => {
          
      } }
      textoFiltro={ filtroTextoLead }
      onDigitarTextoFiltro={ (textoFiltroDigitado: string) => {
        setTextoFiltroLead(textoFiltroDigitado);
      } }
      onClickFiltrar={ () => {
        filtrarLeadsPeloTexto();
      } } />
  </LeadPulseTela>
}

export default GestaoLeads;