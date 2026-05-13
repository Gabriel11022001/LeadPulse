import { TipoPessoaLead } from "@/app/types/lead";
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

interface TipoPessoaLeadOpcoes {

  tipoPessoaSelecionada: TipoPessoaLead;
  onSelecionar: (tipoPessoaSelecionar: TipoPessoaLead) => void;

}

// tipo de pessoa do lead
const TipoPessoaLeadOpcoes = ({ tipoPessoaSelecionada, onSelecionar }: TipoPessoaLeadOpcoes) => {

  return <View style={ styles.container }>
    { /** pessoa física */ }
    <Pressable
      onPress={ () => {
        onSelecionar(TipoPessoaLead.pf);
      } }
      style={ [
        styles.opcao,
        tipoPessoaSelecionada === TipoPessoaLead.pf && styles.opcaoSelecionada
      ] }>
      <Fontisto name="person" size={ 40 } color={
        tipoPessoaSelecionada === TipoPessoaLead.pf ? "#fff" : "#000"
      } />
      <Text style={ [
        styles.txtOpcao,
        tipoPessoaSelecionada === TipoPessoaLead.pf && styles.txtOpcaoSelecionada
      ] }>Pessoa Física</Text>
    </Pressable>
    { /** pessoa juridica */ }
    <Pressable
      onPress={ () => {
        onSelecionar(TipoPessoaLead.pj);
      } }
      style={ [
        styles.opcao,
        tipoPessoaSelecionada === TipoPessoaLead.pj && styles.opcaoSelecionada
      ] }>
      <Ionicons name="home-sharp" size={ 40 } color={
        tipoPessoaSelecionada === TipoPessoaLead.pj ? "#fff" : "#000"
      } />
      <Text style={ [
        styles.txtOpcao,
        tipoPessoaSelecionada === TipoPessoaLead.pj && styles.txtOpcaoSelecionada
      ] }>Pessoa Jurídica</Text>
    </Pressable>
  </View>
}

export default TipoPessoaLeadOpcoes;