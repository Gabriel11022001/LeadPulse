import Botao, { TipoBotao } from "@/app/components/Botao";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import Loader from "@/app/components/Loader";
import MenuTopo, { TipoTela } from "@/app/components/MenuTopo";
import config from "@/app/config";
import useAuth from "@/app/hooks/useAuth";
import filtrarLeadsService from "@/app/service/filtrarLeadsService";
import listarUsuariosAtivosService from "@/app/service/listarUsuariosService";
import redistribuirLeadsService from "@/app/service/redistribuirLeadsService";
import { Lead, TipoPessoaLead } from "@/app/types/lead";
import { Usuario } from "@/app/types/usuario";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

// tela de redistribuição de leads
const RedistribuirLeads = ({ navigation }: any) => {

  const { getUsuarioLogado } = useAuth();
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ leads, setLeads ] = useState<Array<Lead>>([]);
  const [ usuarios, setUsuarios ] = useState<Array<Usuario>>([]);
  const [ leadsRedistribuir, setLeadsRedistribuir ] = useState<Array<Lead | null>>([]);
  const [ apresentarDialogUsuarios, setApresentarDialogUsuarios ] = useState<boolean>(false);
  const [ idUsuarioSelecionado, setIdUsuarioSelecionado ] = useState<string>("");
  const [ apresentarAlertaSelecioneUsuario, setApresentarAlertaSelecioneUsuario ] = useState<boolean>(false);

  // listar os usuários e os leads
  const listarUsuariosLeads = async () => {
    setCarregando(true);

    try {
      const leadsLista: Lead[] = await filtrarLeadsService();

      if (leadsLista.length === 0) {
        Alert.alert("Atenção!", "Não existem leads para redistribuição!", [
          {
            style: "default",
            onPress: () => {
              navigation.goBack();
            },
            text: "Ok"
          }
        ]);
      } else {
        setLeads(leadsLista);

        // listar os usuários
        const usuariosLista: Array<Usuario> = await listarUsuariosAtivosService();

        if (usuariosLista.length === 0) {
          Alert.alert("Atenção!", "Não existem usuários ativos para redistribuição!", [
            {
              style: "default",
              onPress: () => {
                navigation.goBack();
              },
              text: "Ok"
            }
          ]);
        } else {
          setUsuarios(usuariosLista);
        }

      }

    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  const selecionarLeadSeraRedistribuido = (idLead: string): void => {
    
    if (leadsRedistribuir.length === 0) {
      setLeadsRedistribuir(leads.filter(l => l.id === idLead));
    } else {
      /**
       * validar se o lead está marcado para redistribuir, se estiver,
       * remover da lista, se não estiver, adicionar
       */
      const leadMarcadoRedistribuir: Lead | null = leadsRedistribuir.find(l => l?.id === idLead) ?? null;

      if (leadMarcadoRedistribuir === null) {
        // adicionar
        const leadsRedistribuirCopia: Array<Lead | null> = [ ...leadsRedistribuir ];
        leadsRedistribuirCopia.push(leads.find(l => l.id === idLead) ?? null);

        setLeadsRedistribuir(leadsRedistribuirCopia);
      } else {
        // remover
        const leadsRedistribuirCopia: Array<Lead | null> = leadsRedistribuir.filter(l => l?.id != idLead);
        setLeadsRedistribuir(leadsRedistribuirCopia);
      }

    }

  }

  const abrirDialogUsuariosRedistribuir = (): void => {

    if (leadsRedistribuir.length === 0) {
      Alert.alert("Atenção!", "Nenhum lead foi selecionado para redistribuição", [
        {
          onPress: () => null,
          style: "default",
          text: "Ok"
        }
      ]);

      return;
    }

    setApresentarDialogUsuarios(true);
  }

  // redistribuir leads
  const redistribuirLeads = async () => {

    try {
      setApresentarAlertaSelecioneUsuario(false);

      if (idUsuarioSelecionado === "") {
        setApresentarAlertaSelecioneUsuario(true);
      } else {
        console.log(`Redistribuir ${ leadsRedistribuir.length } para o usuário com id_usuario = ${ idUsuarioSelecionado }`);

        setCarregando(true);
        setApresentarDialogUsuarios(false);

        await redistribuirLeadsService(idUsuarioSelecionado, leadsRedistribuir);

        setIdUsuarioSelecionado("");
        setLeadsRedistribuir([]);
        setUsuarios([]);

        await listarUsuariosLeads();
      }

    } catch (e) {
      console.log(`Erro ao tentar-se redistribuir os leads: ${ e }`);

      // apresentar alerta de erro para o usuário
    } finally {
      setCarregando(false);
    }

  }

  useFocusEffect(useCallback(() => {
    // listar os leads e os usuários
    listarUsuariosLeads();
  }, []));

  return <LeadPulseTela>
    { apresentarDialogUsuarios && <View style={ styles.dialogSelecionarUsuario }>
      <View style={ styles.corpoSelecionarUsuario }>
        <View style={ styles.containerBotaoFechar }>
          <Pressable style={ styles.botaoFechar } onPress={ () => {
            setApresentarDialogUsuarios(false);
          } }>
            <AntDesign name="close" size={ 24 } color="black" />
          </Pressable>
        </View>
        <Text style={ styles.dialogSelecionarUsuarioTitulo }>Redistribuir</Text>
        <Text style={ styles.dialogSelecionarUsuarioSubtitulo }>Selecione o usuário para receber os leads marcados na lista.</Text>
        { apresentarAlertaSelecioneUsuario && <View style={ styles.alertaSelecioneUsuario }>
          <Feather name="alert-triangle" size={ 30 } color="#fff" />
          <Text style={ styles.alertaSelecioneUsuarioTexto }>Atenção! Selecione um usuário para receber os leads.</Text>
        </View> }
        <Botao
          titulo="Concluir"
          habilitado={ true }
          tipo={ TipoBotao.avancar }
          margemBaixo={ 20 }
          onExecutar={ () => {
            redistribuirLeads();
          } } />
        <FlatList
          data={ usuarios }
          keyExtractor={ usuario => usuario.id ?? "" }
          renderItem={ ({ item }) => (
            <View style={ styles.itemUsuario }>
              <View style={ styles.containerRadioItemUsuario }>
                <Pressable
                  style={ [
                    {
                      backgroundColor: idUsuarioSelecionado === item.id ? config.corPrimaria : "#fff"
                    },
                    styles.radio
                  ] }
                  onPress={ () => {
                    setIdUsuarioSelecionado(item.id ?? "");
                  } }>
                    { idUsuarioSelecionado === item.id ? <AntDesign name="check" size={ 20 } color="#fff" /> : null }
                </Pressable>
              </View>
              <View style={ styles.containerDadosUsuario }>
                <Text>{ item.nomeCompleto }</Text>
                <Text>{ item.email }</Text>
                <Text>{ item.telefone }</Text>
              </View>
            </View>
          ) } />
      </View>
    </View> }
    <MenuTopo
      titulo="Redistribuir Leads"
      subtitulo="Realize a redistribuição dos seus leads para outros vendedores."
      tela={ TipoTela.perfil }
      onVoltar={ () => {
        navigation.goBack();
      } } />
    <Loader carregando={ carregando } />
    { /** botão para efetuar a redistribuição */ }
    <Pressable style={ styles.botaoDialogRedistribuir } onPress={ abrirDialogUsuariosRedistribuir }>
      <AntDesign name="check" size={ 40 } color={ config.corPrimaria } />
    </Pressable>
    <FlatList
      data={ leads }
      keyExtractor={ l => l.id ?? "" }
      renderItem={ ({ item }) => {

        return <View style={ styles.item }>
          <View style={ styles.containerRadioSelecionar }>
            { /** radio para selecionar se o lead vai ser redistribuido ou não */ }
            <TouchableOpacity onPress={ () => {
              selecionarLeadSeraRedistribuido(item.id ?? "");
            } }
            style={ [
              {
                backgroundColor: (leadsRedistribuir.find(l => l?.id === item.id) ?? null) != null ? config.corPrimaria
                : "#fff"
              },
              styles.radio
            ] }>
              { leadsRedistribuir.find(l => l?.id === item.id) && <AntDesign name="check" size={ 20 } color="#fff" /> }
            </TouchableOpacity>
          </View>
          <View style={ styles.containerDadosLead }>
            <Text style={ styles.nome }>{ item.tipoPessoa === TipoPessoaLead.pf ? item.nomeCompleto : item.razaoSocial }</Text>
            <Text style={ styles.dado }>{ item.tipoPessoa === TipoPessoaLead.pf ? item.cpf : item.cnpj }</Text>
            <Text style={ styles.dado }>{ item.email }</Text>
            <Text style={ styles.dado }>{ item.telefone }</Text>
          </View>
        </View>
      } } />
  </LeadPulseTela>
}

export default RedistribuirLeads;