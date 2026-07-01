import LeadItem from "@/app/components/LeadItem";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import Loader from "@/app/components/Loader";
import MenuHome from "@/app/components/MenuHome";
import config from "@/app/config";
import useAuth from "@/app/hooks/useAuth";
import filtrarLeadsService from "@/app/service/filtrarLeadsService";
import listarNotificacoesService from "@/app/service/listarNoficacoesService";
import { Lead } from "@/app/types/lead";
import { Notificacao } from "@/app/types/notificacao";
import { Usuario } from "@/app/types/usuario";
import EvilIcons from '@expo/vector-icons/EvilIcons';
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
  const [ nomeUsuarioLogado, setNomeUsuarioLogado ] = useState<string>("");
  const [ possuiNotificacoes, setPossuiNotificacoes ] = useState<boolean>(false);
  const { getUsuarioLogado } = useAuth();

  // listar os leads cadastrados
  const listarLeads = async () => {
    
    try {
      setCarregando(true);

      // const leadsBase: Array<Lead> = gerarListaLeadsMock(100);
      const leadsBase: Lead[] = await filtrarLeadsService();

      setLeads(leadsBase);

      calcularLeadsPorStatus(leadsBase);

      filtrarLeadsPorStatus({
        status: "Todos",
        quantidade: leadsBase.length
      });

      await validarPossuiNotificacoes();
    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  // filtrar leads por status
  const filtrarLeadsPorStatus = async (status: StatusLeadFiltro) => {
    setStatusSelecionado(status);
    let statusFiltrar: string = "";
    const statusFiltro: string = status.status.toLocaleLowerCase();

    if (statusFiltro === "todos") {
      statusFiltrar = "todos";
    } else if (statusFiltro === "em qualificação") {
      statusFiltrar = "aguardando_qualificacao";
    } else if (statusFiltro === "qualificado") {
      statusFiltrar = "qualificado";
    } else if (statusFiltro === "desqualificado") {
      statusFiltrar = "desqualificado";
    } else {
      statusFiltrar = "cliente";
    }

    console.log("Filtrar leads: " + statusFiltrar);

    setCarregando(true);

    const leadsFiltrados: Array<Lead> = await filtrarLeadsService({
      status: statusFiltrar
    });

    setCarregando(false);

    setLeads(leadsFiltrados);
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
      const filtroTexto: string = filtroTextoLeads.trim();

    } catch (e) {

    } finally {
      setCarregandoFiltroLeadsTexto(false);
    }

  }

  // redirecionar o usuário para a tela com os detalhes do lead
  const visualizarLead = (idLead: string): void => {
    navigation.navigate("detalhes_lead", { idLeadVisualizar: idLead });
  }

  useEffect(() => {
    filtrarLeadsPorTexto();
  }, [ filtroTextoLeads ]);

  // obter o nome do usuário logado
  const obterNomeUsuarioLogado = async () => {
    const usuarioLogadoApp: Usuario | null = await getUsuarioLogado();

    console.log(usuarioLogadoApp);

    if (usuarioLogadoApp != null) {
      setNomeUsuarioLogado(usuarioLogadoApp.nomeCompleto ?? "");
    }

  }

  const getNotificacoesUltimosCincoDias = (
    notificacoes: Array<Notificacao>
  ): Array<Notificacao> => {
    const agora = new Date();

    const dataLimite = new Date();
    dataLimite.setDate(agora.getDate() - 5);

    return notificacoes.filter((notificacao) => {
      const [data, hora] = notificacao.dataCadastro.split(" às ");

      const [dia, mes, ano] = data.split("/").map(Number);
      const [horas, minutos] = hora.split(":").map(Number);

      const dataNotificacao = new Date(
        ano,
        mes - 1,
        dia,
        horas,
        minutos
      );

      return dataNotificacao >= dataLimite && dataNotificacao <= agora;
    });
  };

  // validar se o usuário possui notificações novas
  const validarPossuiNotificacoes = async () => {
    setPossuiNotificacoes(false);

    try {
      const notificacoes: Notificacao[] = await listarNotificacoesService();

      if (notificacoes.length > 0) {
        
        if (getNotificacoesUltimosCincoDias(notificacoes).length > 0) {
          setPossuiNotificacoes(true);
        }

      }

    } catch (e) {
      // apresentar alerta de erro
    }

  }

  useFocusEffect(useCallback(() => {
    obterNomeUsuarioLogado();
    listarLeads();
  }, []));

  return <LeadPulseTela>
    { /** loader de carregamento */ }
    <Loader carregando={ carregando } />
    { /** cabeçalho com botão para adicionar lead novo */ }
    <MenuHome
      leadsEncontrados={ leads.length ?? 0 }
      nomeUsuarioLogado={ nomeUsuarioLogado }
      possuiNotificacoes={ possuiNotificacoes }
      onVoltar={ () => {
        
      } }
      onRedirecionarAdicionarLead={ () => {
        navigation.navigate("cadastro_lead");
      } }
      onRedirecionarNotificacoes={ () => {

      } } />
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

        if (leads.length === 0) {

          return <View>
            <Text>Nenhum lead encontrado.</Text>
          </View>
        }

        return null;
      } } />
  </LeadPulseTela>
}

export default Home;