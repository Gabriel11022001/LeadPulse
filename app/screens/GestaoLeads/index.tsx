import FiltroLeads from "@/app/components/FiltroLeads";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import ListaLeads from "@/app/components/ListaLeads";
import MenuTopo, { TipoTela } from "@/app/components/MenuTopo";
import deletarLeadService from "@/app/service/deletarLeadService";
import filtrarLeadsParametrosService from "@/app/service/filtrarLeadsParametrosService";
import filtrarLeadsPorTextoService from "@/app/service/filtrarLeadsPorTextoService";
import filtrarLeadsService from "@/app/service/filtrarLeadsService";
import FiltroLeadsType from "@/app/types/filtroLeads";
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
  const [ abrirFiltroLeads, setAbrirFiltroLeads ] = useState<boolean>(false);
  
  // states do filtro de leads
  const [ nome, setNome ] = useState<string>("");
  const [ documento, setDocumento ] = useState<string>("");
  const [ telefone, setTelefone ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ erroNome, setErroNome ] = useState<string>("");
  const [ erroDocumento, setErroDocumento ] = useState<string>("");
  const [ erroTelefone, setErroTelefone ] = useState<string>("");
  const [ erroEmail, setErroEmail ] = useState<string>("");

  const [ apresentarOperacoes, setApresentarOperacoes ] = useState<boolean>(false);
  const [ idLeadOperacoes, setIdLeadOperacoes ] = useState<string>("");
  
  const confirmarDeletarLead = async () => {

    try {
      setCarregando(true);

      await deletarLeadService(idLeadOperacoes ?? "");

      Alert.alert("Sucesso!", "Lead deletado com sucesso!", [
        {
          style: "default",
          text: "Ok",
          onPress: () => {
            setTextoFiltroLead("");
            resetarFiltro();
            setIdLeadOperacoes("");
            setApresentarOperacoes(false);
            carregarLeads();
          }
        }
      ]);
    } catch (e) {
      
      throw e;
    } finally {
      setCarregando(false);
    }

  }

  const deletarLead = async () => {

    try {
      Alert.alert("Atenção!", "Deseja mesmo deletar o lead?", [
        {
          style: "default",
          text: "Sim",
          onPress: () => {
            confirmarDeletarLead();
          }
        },
        {
          style: "cancel",
          text: "Cancelar",
          onPress: () => {
            setApresentarOperacoes(false);
            setIdLeadOperacoes("");
          }
        }
      ]);
    } catch (e) {
      console.log(`Erro ao tentar-se deletar o lead: ${ e }`);
    }

  }

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

  // resetar o filtro dos leads
  const resetarFiltro = (): void => {
    setNome("");
    setTelefone("");
    setEmail("");
    setDocumento("");
    setErroNome("");
    setErroDocumento("");
    setErroEmail("");
    setErroTelefone("");
    setAbrirFiltroLeads(false);
  }

  // filtrar os leads
  const filtrarLeads = async () => {

    try {
      setAbrirFiltroLeads(false);
      setCarregando(true);

      if (nome.trim().length == 0
      && telefone.trim().length == 0
      && email.trim().length == 0
      && documento.trim().length == 0) {
        await carregarLeads();

        return;
      }

      const filtro: FiltroLeadsType = {
        documento: documento.trim(),
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim()
      }

      const leadsFiltrados: Array<Lead> = await filtrarLeadsParametrosService(filtro);

      console.log("leads filtrados: " + leadsFiltrados.length);

      if (leadsFiltrados.length === 0) {
        Alert.alert("Atenção!", "Não foram encontrados leads com os termos informados.", [
          {
            onPress: () => null,
            style: "default",
            text: "Ok"
          }
        ]);
        await carregarLeads();
      } else {
        setLeads(leadsFiltrados);
      }

    } catch (e) {
      // apresentar alerta de erro
      console.log(`Erro ao tentar-se filtrar os leads: ${ e }`);
    } finally {
      setCarregando(false);
    }

  }

  useFocusEffect(useCallback(() => {
    setTextoFiltroLead("");
    resetarFiltro();
    setIdLeadOperacoes("");
    setApresentarOperacoes(false);
    carregarLeads();
  }, []));
  
  return <LeadPulseTela>
    { /** filtro de leads */ }
    <FiltroLeads
      nome={ nome }
      documento={ documento }
      email={ email }
      telefone={ telefone }
      erroNome={ erroNome }
      erroDocumento={ erroDocumento }
      erroEmail={ erroEmail }
      erroTelefone={ erroTelefone }
      apresentar={ abrirFiltroLeads }
      onLimparFiltro={ () => {
        resetarFiltro();
        carregarLeads();
      } }
      onFechar={ () => {
        setAbrirFiltroLeads(false);
      } }
      onDigitar={ (campo: string, valor: string) => {

        if (campo === "nome") {
          setNome(valor);
          setErroNome("");

          if (valor.trim().length > 0 && valor.trim().length < 3) {
            setErroNome("O nome/razão social deve possuir no mínimo 3 caracteres.");
          }

        }

        if (campo === "documento") {
          setDocumento(valor);
          setErroDocumento("");

          if (valor.trim().length > 0) {

          }

        }

        if (campo === "telefone") {
          setTelefone(valor);
          setErroTelefone("");

          if (valor.trim().length > 0) {

          }

        }

        if (campo === "email") {
          setEmail(valor);
          setErroEmail("");

          if (valor.trim().length > 0) {

          }

        }

      } }
      onFiltrar={ filtrarLeads } />
    { /** menu do topo */ }
    <MenuTopo
      titulo="Leads"
      subtitulo="Gerenciar os leads"
      onVoltar={ () => {
        navigation.goBack();
      } }
      tela={ TipoTela.gestaoLeads }
      onAbrirFiltro={ () => {
        // abrir o dialog do filtro de leads
        setAbrirFiltroLeads(true);
      } }
      onClickRedistribuirLeads={ () => {
        // redirecionar o usuário para a tela de redistribuir leads
        navigation.navigate("redistribuir_leads");
      } } />
    { /** lista dos leads cadastrados */ }
    <ListaLeads
      leads={ leads }
      carregando={ carregando || carregandoAtualizarStatusLead }
      onVisualizarLead={ (idLeadVisualizar: string) => {
        visualizarLead(idLeadVisualizar);
      } }
      onClickOperacoes={ (idLead: string) => {
        console.log("Apresentar operações para o lead de id: " + idLead);

        setIdLeadOperacoes(idLead);

        if (idLead === idLeadOperacoes) {
          setApresentarOperacoes(!apresentarOperacoes);
        } else {
          setApresentarOperacoes(true);
        }

      } }
      textoFiltro={ filtroTextoLead }
      onDigitarTextoFiltro={ (textoFiltroDigitado: string) => {
        setTextoFiltroLead(textoFiltroDigitado);
      } }
      onClickFiltrar={ () => {
        filtrarLeadsPeloTexto();
      } }
      idLeadOperacoes={ idLeadOperacoes }
      apresentarOperacoes={ apresentarOperacoes }
      onClickEditar={ () => {
        visualizarLead(idLeadOperacoes);
      } }
      onClickDeletar={ () => {
        deletarLead();
      } }
      onClickRedistribuir={ () => {

      } } />
  </LeadPulseTela>
}

export default GestaoLeads;