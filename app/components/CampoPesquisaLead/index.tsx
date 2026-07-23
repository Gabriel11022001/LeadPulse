import Feather from "@expo/vector-icons/Feather";
import { Pressable, TextInput, View } from "react-native";
import styles from "./styles";

interface CampoPesquisaLeadProps {
  
  filtroTexto: string;
  onDigitarTextoFiltro: (textoFiltroDigitado: string) => void;
  onClickPesquisar: () => void;
  
}

// componente que representa o campo para pesquisar os leads pelo nome, e-mail ou telefone
const CampoPesquisaLead = ({ filtroTexto, onDigitarTextoFiltro, onClickPesquisar }: CampoPesquisaLeadProps) => {

  return <View style={ styles.containerCampo }>
    { /** campo para digitar o texto do filtro */ }
    <TextInput
      style={ styles.campo }
      value={ filtroTexto }
      onChangeText={ (txtFiltro: string) => {
        onDigitarTextoFiltro(txtFiltro);
      } }
      inputMode="search"
      keyboardType="default"
      placeholder="Buscar lead por nome, telefone ou e-mail..." />
    { /** botão para filtrar */ }
    <Pressable
      onPress={ onClickPesquisar } >
      <Feather name="search" size={ 27 } color="#94A3B8" />
    </Pressable>
  </View>
}

export default CampoPesquisaLead;