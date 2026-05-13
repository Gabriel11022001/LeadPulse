import Cabecalho from "@/app/components/Cabecalho";
import LeadItem from "@/app/components/LeadItem";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import Loader from "@/app/components/Loader";
import config from "@/app/config";
import { Lead } from "@/app/types/lead";
import gerarListaLeadsMock from "@/app/utils/gerarListaLeadsMock";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import styles from "./styles";

type StatusLeadFiltro = {

  status: string;
  quantidade: number;

}

// tela home do app
const Home = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ leads, setLeads ] = useState<Array<Lead>>([]);  
  const [ filtroTextoLeads, setFiltroTextoLeads ] = useState<string>("");
  const [ statusLead, setStatusLead ] = useState<StatusLeadFiltro[]>([]);
  const [ statusSelecionado, setStatusSelecionado ] = useState<StatusLeadFiltro | null>(null);
  const [ carregandoFiltroLeadsTexto, setCarregandoFiltroLeadsTexto ] = useState<boolean>(false);

  // listar os leads cadastrados
  const listarLeads = async () => {
    
    try {
      setCarregando(true);

      const leadsBase: Array<Lead> = gerarListaLeadsMock(100);

      setLeads(leadsBase);

      calcularLeadsPorStatus(leadsBase);
    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  // filtrar leads por status
  const filtrarLeadsPorStatus = (status: StatusLeadFiltro) => {
    setStatusSelecionado(status);
  }

  const calcularLeadsPorStatus = (leads: Array<Lead>): void => {
    const todos: StatusLeadFiltro = { status: "Todos", quantidade: leads.length };
    const aguardandoQualificacao: StatusLeadFiltro = { status: "Em qualificação", quantidade: leads.filter(l => l.status === "aguardando_qualificacao").length };
    const qualificado: StatusLeadFiltro = { status: "Qualificado", quantidade: leads.filter(l => l.status === "qualificado").length };
    const desqualificado: StatusLeadFiltro = { status: "Desqualificado", quantidade: leads.filter(l => l.status === "desqualificado").length };
    const cliente: StatusLeadFiltro = { status: "Cliente", quantidade: leads.filter(l => l.status === "cliente").length };

    const todosStatus: Array<StatusLeadFiltro> = [];
    todosStatus.push(todos);
    todosStatus.push(aguardandoQualificacao);
    todosStatus.push(qualificado);
    todosStatus.push(desqualificado);
    todosStatus.push(cliente);

    setStatusLead(todosStatus);
  }

  // filtrar os leads por texto
  const filtrarLeadsPorTexto = async () => {
    setCarregandoFiltroLeadsTexto(true);

    try {

      if (filtroTextoLeads.trim().length === 0) {
        // listar todos os leads
      } else {
        // listar baseado no texto passado
      }

    } catch (e) {

    } finally {
      setCarregandoFiltroLeadsTexto(false);
    }

  }

  const visualizarLead = (idLead: string): void => {

  }

  useEffect(() => {
    filtrarLeadsPorTexto();
  }, [ filtroTextoLeads ]);

  useFocusEffect(useCallback(() => {
    listarLeads();
  }, []));

  return <LeadPulseTela>
    { /** loader de carregamento */ }
    <Loader carregando={ carregando } msgLoader="Consultando os leads, aguarde..." />
    { /** cabeçalho com botão para adicionar lead novo */ }
    <Cabecalho
      habilitarBotaoVoltar={ false }
      titulo="Home">
        <View>
          { /** botão para redirecionar o usuário para a tela de cadastro de lead */ }
          <Pressable style={ {
            backgroundColor: "#DBEAFE",
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
            elevation: 5
          } }
          onPress={ () => navigation.navigate("cadastro_lead") }>
            <FontAwesome6 name="add" size={ 40 } color={
              config.corPrimaria
            } />
          </Pressable>
        </View>
    </Cabecalho>
    <FlatList
      data={ leads }
      renderItem={ ({ item, index }) => {

        return (
          <LeadItem index={ index } ultimoElemento={ index === leads.length - 1 } lead={ item } onVisualizar={ () => {
            visualizarLead(item.id);
          } } />
        );
      } }
      ListHeaderComponent={ () => {
        // topo da tela

        return <View style={ styles.containerTopo }>
          <View>
            <Text style={ styles.titulo }>Meus leads</Text>
            <Text style={ styles.txtMeusLeads }>{ leads.length } leads encontrados</Text>
            { /** campo para o usuário filtrar os leads */ }
            <View style={ styles.containerCampoFiltro }>
              <EvilIcons name="search" size={ 30 } color={ config.corBordas } />
              <TextInput
                style={ styles.campoFiltro }
                value={ filtroTextoLeads }
                placeholder="Buscar por nome, razão social, telefone, e-mail..."
                onChangeText={ (filtro: string) => {
                  setFiltroTextoLeads(filtro);
                } } />
              { carregandoFiltroLeadsTexto && <ActivityIndicator size={ 30 } color={ config.corBordas } /> }
            </View>
            <ScrollView showsHorizontalScrollIndicator={ false } horizontal={ true }>
                {
                  statusLead.map((status: StatusLeadFiltro, index) => {

                    return <Pressable
                    key={ status.status }
                    style={ [
                      styles.statusLead,
                      index === 0 && { marginStart: 0 },
                      index === statusLead.length - 1 && { marginEnd: 0 },
                      status.status === statusSelecionado?.status && styles.statusLeadSelecionado
                    ] }
                    onPress={ () => {
                      filtrarLeadsPorStatus(status);
                    } }>
                      <Text style={ [ styles.txtStatusNome, status.status === statusSelecionado?.status && styles.txtStatusNomeSelecionado ] }>{ status.status }</Text>
                      <Text style={ status.status === statusSelecionado?.status ? {
                        color: "#fff"
                      } : {} }>
                        { "(" + status.quantidade.toString() + ")" }
                      </Text>
                    </Pressable>
                  })
                }
              </ScrollView>
          </View>
        </View>
      } }
      ListFooterComponent={ () => {
        // footer da tela

        return <View>

        </View>
      } } />
  </LeadPulseTela>
}

export default Home;