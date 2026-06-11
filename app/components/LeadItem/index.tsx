import { Lead, TipoPessoaLead } from "@/app/types/lead";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

interface LeadItemProps {

  lead: Lead;
  index: number;
  onVisualizar: () => void;
  ultimoElemento?: boolean;

}

// item que representa o lead
const LeadItem = ({ lead, onVisualizar, index, ultimoElemento }: LeadItemProps) => {

  const {
    nomeCompleto,
    telefone,
    email,
    origem,
    status,
    dataCadastro,
    anotacoes,
    tipoPessoa,
    razaoSocial
  } = { ...lead };

  const obterCorIconeStatus = (status: string): string => {

    if (status === "qualificado") {

      return "#3498db";
    }

    if (status === "aguardando_qualificacao") {

      return "#00b894";
    }

    if (status === "desqualificado") {

      return "red";
    }

    if (status === "cliente") {

      return "#6ab04c";
    }

    return "#000";
  }

  const obterCorFundoIconeStatus = (status: string): string => {

    if (status === "qualificado") {

      return "#DBEAFE";
    }

    if (status === "aguardando_qualificacao") {

      return "#D1FAE5";
    }

    if (status === "desqualificado") {

      return "#FEE2E2";
    }

    if (status === "cliente") {

      return "#EDE9FE";
    }

    return "#F1F5F9";
  }

  const getStatusDescricao = (): string => {

    if (status === "qualificado") {

      return "Qualificado";
    }

    if (status === "aguardando_qualificacao") {

      return "Em qualificação";
    }

    if (status === "desqualificado") {

      return "Desqualificado";
    }
   
    if (status === "cliente") {

      return "Cliente";
    }

    return "";
  }

  const getContainerStatusLeadEstilo = () => {

    switch(status) {

      case "qualificado":
        return styles.containerStatusLeadQualificado;
      case "desqualificado":
        return styles.containerStatusDesqualificado;
      case "cliente":
        return styles.containerStatusCliente;
      case "aguardando_qualificacao":
        return styles.containerStatusEmQualificacao;
      default:
        return null;

    }

  }

  return <Pressable style={ [
    styles.leadItem,
    index === 0 && { marginTop: 30 },
    ultimoElemento && { marginBottom: 50 }
  ] } onPress={ onVisualizar }>
    <View style={ styles.containerNomeLeadStatus }>
      { /** nome do lead */ }
      <View style={ [
        styles.statusIconeContainer,
        { backgroundColor: obterCorFundoIconeStatus(status) }
      ] }>
        <Ionicons name="person" size={ 35 } color={ obterCorIconeStatus(status) } />
      </View>
      { /** status do lead */ }
      <Text style={ [
        styles.containerStatusLead,
        getContainerStatusLeadEstilo()
      ] }>{ getStatusDescricao() }</Text>
    </View>
    <Text style={ styles.nomeLead }>{ tipoPessoa === TipoPessoaLead.pf ? nomeCompleto : razaoSocial }</Text>
    { /** telefone do lead */ }
    <Text style={ [ styles.dadoLead, { fontSize: 16, fontWeight: "bold" } ] }>{ telefone }</Text>
    { /** e-mail do lead */ }
    <Text style={ styles.dadoLead }>{ email }</Text>
    { /** origem do lead */ }
    <View style={ styles.containerOrigemLead }>
      <View style={ styles.circuloOrigem } />
      <Text style={ styles.origem }>{ origem }</Text>
      <Text>{ dataCadastro }</Text>
    </View>
    { /** ultima anotação cadastrada para o lead */ }
    { (anotacoes && anotacoes.length > 0) && <View>
      <Text>{ anotacoes[ 0 ].anotacao }</Text>
    </View> }
  </Pressable>
}

export default LeadItem;