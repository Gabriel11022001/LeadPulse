import config from "@/app/config";
import { Lead, TipoPessoaLead } from "@/app/types/lead";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface ListaLeadsProps {

  carregando: boolean;
  leads: Array<Lead>;
  expandirVerMaisDetalhes: boolean;
  onVisualizarLead: (id: string) => void;
  leadVisualizarAtual: Lead | null;
  carregandoVisualizarLead: boolean;

}

// componente que representa a listagem de leads
const ListaLeads = ({
  carregando,
  leads,
  onVisualizarLead,
  expandirVerMaisDetalhes,
  leadVisualizarAtual,
  carregandoVisualizarLead
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

  return <FlatList
    data={ leads }
    keyExtractor={ lead => lead.id ?? "" }
    renderItem={ ({ item }) => {
      const { id, tipoPessoa, nomeCompleto, razaoSocial, cpf, cnpj, telefone, email, status, origem, dataCadastro } = { ...item };
      const cor: { primaria: string, secundaria: string } = getStatusCores(status);

      if (carregando) {

        return null;
      }

      return <View
        style={ styles.leadItem }>
          { /** status do lead */ }
          <View
            style={ styles.statusContainer }>
            <View style={ [
              styles.status,
              {
                backgroundColor: cor.secundaria
              }
            ] }>
              <Text style={ [
                {
                  color: cor.primaria
                }
              ] }>{ getStatusNome(status) }</Text>
            </View>
          </View>
          { /** nome do lead */ }
          <Text style={ styles.nome }>{ tipoPessoa === TipoPessoaLead.pf ? nomeCompleto : razaoSocial }</Text>
          { /** documento do lead */ }
          <Text style={ styles.documento }>{ tipoPessoa === TipoPessoaLead.pf ? cpf : cnpj }</Text>
          { /** e-mail */ }
          <Text style={ styles.dado }>{ email }</Text>
          { /** telefone */ }
          <Text style={ styles.dado }>{ telefone }</Text>
          { /** data de cadastro do lead */ }
          <Text style={ styles.dado }>{ dataCadastro }</Text>
          { /** botão para expandir o container para ver mais detalhes */ }
          <TouchableOpacity onPress={ () => {
            onVisualizarLead(id);
          } }
          style={ styles.botaoVisulizarMaisDetalhes } >
            <Text style={ styles.txtVisualizarMaisDetalhes }>Ver mais detalhes</Text>
          </TouchableOpacity>
          { carregandoVisualizarLead && <View>
            <ActivityIndicator color={ config.corPrimaria } size={ 40 } />
          </View> }
          { expandirVerMaisDetalhes && leadVisualizarAtual != null && leadVisualizarAtual.id === id ? <View>
            <Text>{ origem }</Text>
          </View> : null }
      </View>
    } }
    ListHeaderComponent={ () => {

      if (carregando) {

        return <View style={ styles.leaderCarregando }>
          <ActivityIndicator color="#000" size={ 100 } />
          <Text>Carregando operação no servidor, aguarde...</Text>
        </View>
      }

      if (leads.length === 0) {

        return <View>
          <Text>Não existem leads cadastrados.</Text>
        </View>
      }

    } } />
}

export default ListaLeads;