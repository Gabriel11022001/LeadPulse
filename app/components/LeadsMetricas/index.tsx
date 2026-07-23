import { Lead } from "@/app/types/lead";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles";

interface LeadsMetricasProps {

  leads: Array<Lead>;

}

// componente que representa as métricas dos leads
const LeadsMetricas = ({ leads }: LeadsMetricasProps) => {

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

  const qtdEmQualificacao: number = leads.filter(l => l.status === "aguardando_qualificacao").length ?? 0;
  const qtdQualificado: number = leads.filter(l => l.status === "qualificado").length ?? 0;
  const qtdCliente: number = leads.filter(l => l.status === "cliente").length ?? 0;
  const qtdDesqualificado: number = leads.filter(l => l.status === "desqualificado").length ?? 0;

  const corEmQualificacao: { primaria: string, secundaria: string } = getStatusCores("aguardando_qualificacao");
  const corQualificado: { primaria: string, secundaria: string } = getStatusCores("qualificado");
  const corCliente: { primaria: string, secundaria: string } = getStatusCores("cliente");
  const corDesqualificado: { primaria: string, secundaria: string } = getStatusCores("desqualificado");

  return <ScrollView horizontal={ true } showsHorizontalScrollIndicator={ false }>
    { /** em qualificação */ }
    <View style={ styles.metrica }>
      <View style={ [
        styles.containerIcone,
        {
          backgroundColor: corEmQualificacao.secundaria
        }
      ] }>
        <Ionicons name="timer-outline" size={ 30 } color={ corEmQualificacao.primaria } />
      </View>
      <View style={ styles.containerMetricas }>
        <Text style={ styles.tituloStatus }>Aguardando Qualificação</Text>
        <Text style={ styles.quantidade }>{ qtdEmQualificacao.toString() }</Text>
      </View>
    </View>
    { /** qualificados */ }
    <View style={ styles.metrica }>
      <View style={ [
        styles.containerIcone,
        {
          backgroundColor: corQualificado.secundaria
        }
      ] }>
        <AntDesign name="check-circle" size={ 30 } color={ corQualificado.primaria } />
      </View>
      <View style={ styles.containerMetricas }>
        <Text style={ styles.tituloStatus }>Qualificado</Text>
        <Text style={ styles.quantidade }>{ qtdQualificado.toString() }</Text>
      </View>
    </View>
    { /** clientes */ }
    <View style={ styles.metrica }>
      <View style={ [
        styles.containerIcone,
        {
          backgroundColor: corCliente.secundaria
        }
      ] }>
        <Ionicons name="person-outline" size={ 30 } color={ corCliente.primaria } />
      </View>
      <View style={ styles.containerMetricas }>
        <Text style={ styles.tituloStatus }>Cliente</Text>
        <Text style={ styles.quantidade }>{ qtdCliente.toString() }</Text>
      </View>
    </View>
    { /** desqualificados */ }
    <View style={ styles.metrica }>
      <View style={ [
        styles.containerIcone,
        {
          backgroundColor: corDesqualificado.secundaria
        }
      ] }>
        <AntDesign name="close-circle" size={ 30 } color={ corDesqualificado.primaria } />
      </View>
      <View style={ styles.containerMetricas }>
        <Text style={ styles.tituloStatus }>Desqualificado</Text>
        <Text style={ styles.quantidade }>{ qtdDesqualificado.toString() }</Text>
      </View>
    </View>
  </ScrollView>
}

export default LeadsMetricas;