import { TipoPessoaLead } from "@/app/types/lead";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
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
      <View
        style={ [
          styles.containerIcone,
          tipoPessoaSelecionada === TipoPessoaLead.pf && styles.containerIconeSelecionado
        ] }>
        <Fontisto name="person" size={ 50 } color={
          tipoPessoaSelecionada === TipoPessoaLead.pf ? "#3B82F6" : "#9CA3AF"
        } />
      </View>
      <Text style={ [
        styles.txtOpcao,
        tipoPessoaSelecionada === TipoPessoaLead.pf && styles.txtOpcaoSelecionada
      ] }>Pessoa Física</Text>
      <Text style={ styles.txtOpcaoSubtitulo }>Para pessoas físicas</Text>
      { tipoPessoaSelecionada === TipoPessoaLead.pf && <View style={ styles.checkContainer }>
        <AntDesign name="check" size={ 10 } color="#fff" />
      </View> }
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
      <View style={ [
        styles.containerIcone,
        tipoPessoaSelecionada === TipoPessoaLead.pj && styles.containerIconeSelecionado
      ] }>
        <MaterialCommunityIcons name="home-city-outline" size={ 50 } color={
          tipoPessoaSelecionada === TipoPessoaLead.pj ? "#3B82F6" : "#9CA3AF"
        } />
      </View>
      <Text style={ [
        styles.txtOpcao,
        tipoPessoaSelecionada === TipoPessoaLead.pj && styles.txtOpcaoSelecionada
      ] }>Pessoa Jurídica</Text>
      <Text style={ styles.txtOpcaoSubtitulo }>Para empresas</Text>
      { tipoPessoaSelecionada === TipoPessoaLead.pj && <View style={ styles.checkContainer }>
        <AntDesign name="check" size={ 10 } color="#fff" />
      </View> }
    </Pressable>
  </View>
}

export default TipoPessoaLeadOpcoes;