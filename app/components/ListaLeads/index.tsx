import config from "@/app/config";
import { Lead, TipoPessoaLead } from "@/app/types/lead";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import CampoPesquisaLead from "../CampoPesquisaLead";
import LeadsMetricas from "../LeadsMetricas";
import styles from "./styles";

interface ListaLeadsProps {

  carregando: boolean;
  leads: Array<Lead>;
  onVisualizarLead: (id: string) => void;
  onClickOperacoes: () => void;
  textoFiltro: string;
  onDigitarTextoFiltro: (textoFiltroDigitado: string) => void;
  onClickFiltrar: () => void;

}

// componente que representa a listagem de leads
const ListaLeads = ({
  carregando,
  leads,
  onVisualizarLead,
  onClickOperacoes,
  textoFiltro,
  onDigitarTextoFiltro,
  onClickFiltrar
}: ListaLeadsProps) => {

  const getStatusNome = (status: string): string => {

    if (status === "cliente" || status === "qualificado" || status === "desqualificado") {

      return status.charAt(0)
        .toLocaleUpperCase()
        + status.slice(1);
    }

    return "Aguardando Qualificação";
  }

  const getStatusCores = (status: string): { primaria: string, secundaria: string } => { 

    if (status === "cliente") {

      return {
        primaria: "#7C3AED",
        secundaria: "#EDE9FE"
      };
    }

    if (status === "qualificado") {

      return {
        primaria: "#3498db",
        secundaria: "#DBEAFE"
      };
    }

    if (status === "aguardando_qualificacao") {

      return {
        primaria: "#00b894",
        secundaria: "#D1FAE5"
      };
    }

    return {
      primaria: "red",
      secundaria: "#FEE2E2"
    };
  }

  // header da lista de leads
  const HeaderListaLeads = (
    <View>
      <CampoPesquisaLead
        filtroTexto={ textoFiltro }
        onDigitarTextoFiltro={ onDigitarTextoFiltro }
        onClickPesquisar={ onClickFiltrar } />
      <LeadsMetricas leads={ leads } />
    </View>
  )

  // loader de carregamento dos leads
  const LoaderCarregamentoLeads = (
    <View style={ styles.leadCarregando }>
      <ActivityIndicator color={ config.corPrimaria } size={ 40 } />
      <Text>Carregando, aguarde...</Text>
    </View>
  )

  // texto informando que não existem leads cadastrados
  const TextoNaoExistemLeads = (
    <View>
      <Text>Não existem leads cadastrados na base de dados...</Text>
    </View>
  )

  return <FlatList
    data={ leads }
    keyExtractor={ lead => lead.id ?? "" }
    renderItem={ ({ item }) => {
      const { 
        id, 
        tipoPessoa, 
        nomeCompleto, 
        razaoSocial, 
        cpf, 
        cnpj, 
        telefone, 
        email, 
        status, 
        origem, 
        dataCadastro,
        endereco
      } = { ...item };
      const cor: { primaria: string, secundaria: string } = getStatusCores(status);
      let primeiraLetraNome: string = "";

      if (nomeCompleto != undefined && tipoPessoa === TipoPessoaLead.pf) {
        primeiraLetraNome = nomeCompleto.charAt(0);
      } else if (razaoSocial != undefined && tipoPessoa === TipoPessoaLead.pj) {
        primeiraLetraNome = razaoSocial.charAt(0);
      }

      if (carregando) {

        return null;
      }

      return <View style={ styles.item }>
        <View style={ [
          styles.container,
          {
            height: 220
          }
        ] }>
          { /** primeira letra do nome do lead */ }
          <View style={ styles.containerPrimeiraLetra }>
            <View style={ [
              styles.primeiraLetra,
              {
                backgroundColor: cor.secundaria
              }
            ] }>
              <Text style={ [
                styles.primeiraLetraTexto,
                {
                  color: cor.primaria
                }
              ] }>{ primeiraLetraNome }</Text>
            </View>
          </View>
          { /** dados do lead */ }
          <View style={ styles.containerDadosLead }>
            <Text style={ styles.nome }>{ tipoPessoa === TipoPessoaLead.pf ? nomeCompleto : razaoSocial }</Text>
            <Text style={ styles.dado }>{ tipoPessoa === TipoPessoaLead.pf ? cpf : cnpj }</Text>
            <View style={ { flexDirection: "row", alignItems: "center" } }>
              <FontAwesome5 name="whatsapp" size={ 20 } color="rgba(16, 172, 132, 1.0)" />
              <Text style={ [
                styles.dado,
                {
                  marginStart: 6
                }
              ] }>{ telefone }</Text>
            </View>
            <Text style={ styles.dado }>{ email }</Text>
            <Text style={ styles.dado }>{ dataCadastro }</Text>
            <Text style={ styles.dado }>{ origem }</Text>
          </View>
          { /** container com o status, botão de ver mais detalhes e de realizar operações */ }
          <View style={ styles.containerOperacoesStatus }>
            { /** status */ }
            <View
              style={ [
                {
                  backgroundColor: cor.secundaria
                },
                styles.status
              ] }>
              <Text style={ [
                {
                  color: cor.primaria,
                  textAlign: "center",
                  fontSize: 14
                }
              ] }>{ getStatusNome(status) }</Text>
            </View>
            { /** operações */ }
            <TouchableOpacity
              onPress={ onClickOperacoes }
              style={ styles.botaoOperacoes }>
              <SimpleLineIcons name="options-vertical" size={ 20 } color="black" />
            </TouchableOpacity>
            { /** ver mais detalhes */ }
            <TouchableOpacity
              onPress={ () => {
                onVisualizarLead(id);
              } }
              style={ styles.botaoVerMaisDetalhes }>
              <Text style={ styles.txtBotaoVerMaisDetalhes }>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={ 24 } color={ config.corPrimaria } />
            </TouchableOpacity>
          </View>
        </View>
        <View style={ [
          styles.container,
          {
            borderTopWidth: 1,
            borderTopColor: config.corBordas,
            borderStyle: "solid",
            marginTop: 10,
            flexWrap: "wrap"
          }
        ] }>
          { /** endereço */ }
          <View style={ styles.dadoBaixo }>
            <EvilIcons name="location" size={ 18 } color="#6B7280" />
            <Text style={ styles.dadoBaixoTexto }>{ endereco?.logradouro ?? "" }</Text>
          </View>
          { /** cidade */ }
          <View style={ styles.dadoBaixo }>
            <MaterialCommunityIcons name="city-variant-outline" size={ 18 } color="#6B7280" />
            <Text style={ styles.dadoBaixoTexto }>{ endereco?.cidade ?? "" } - { endereco?.estado ?? "" }</Text>
          </View>
          { /** bairro */ }
          <View style={ styles.dadoBaixo }>
            <EvilIcons name="location" size={ 18 } color="#6B7280" />
            <Text style={ styles.dadoBaixoTexto }>{ endereco?.bairro ?? "" }</Text>
          </View>
          { /** número */ }
          <View style={ styles.dadoBaixo }>
            <EvilIcons name="location" size={ 18 } color="#6B7280" />
            <Text style={ styles.dadoBaixoTexto }>{ endereco?.numero ?? "s/n" }</Text>
          </View>
        </View>
      </View>
    } }
    ListHeaderComponent={ carregando ? LoaderCarregamentoLeads : (leads.length === 0 ? TextoNaoExistemLeads : HeaderListaLeads) } />
}

export default ListaLeads;