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
      <View style={ styles.nomeStatusContainer }>
        <Ionicons name="person" size={ 24 } color={ obterCorIconeStatus(status) } />
        <Text style={ styles.nomeLead }>{ tipoPessoa === TipoPessoaLead.pf ? nomeCompleto : razaoSocial }</Text>
      </View>
      { /** status do lead */ }
      <Text style={ [
        styles.containerStatusLead,
        getContainerStatusLeadEstilo()
      ] }>{ getStatusDescricao() }</Text>
    </View>
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