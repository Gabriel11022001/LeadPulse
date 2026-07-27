import config from "@/app/config";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export enum TipoTela {

  cadastroLead,
  perfil,
  notificacoes,
  gestaoLeads

}

interface MenuTopoProps {

  titulo: string;
  subtitulo?: string;
  onVoltar?: () => void;
  tela: TipoTela;
  onAbrirFiltro?: () => void;
  
}

// componente que representa o menu do topo das telas
const MenuTopo = ({
  titulo,
  subtitulo,
  onVoltar,
  tela,
  onAbrirFiltro
}: MenuTopoProps) => {

  const obterIconeTela = () => {

    if (tela === TipoTela.cadastroLead) {

      return <Ionicons name="person-outline" size={ 30 } color={ config.corPrimaria } />;
    }

    if (tela === TipoTela.gestaoLeads) {
      
      return <Feather name="filter" size={ 30 } color={ config.corPrimaria } />;
    }

    return <AntDesign name="menu" size={ 30 } color={ config.corPrimaria } />;
  }

  return <LinearGradient
    colors={ [ '#2563EB', '#3B82F6', '#60A5FA' ] }
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={ styles.header }>
    <View style={ styles.containerVoltar }>
      { /** botão de voltar */ }
      { onVoltar && <Pressable
        style={ styles.botaoVoltar }
        onPress={ onVoltar }>
        <AntDesign name="arrow-left" size={ 30 } color="#fff" />
      </Pressable> }
      { /** título do menu */ }
      <Text style={ styles.txtTituloBotaoVoltar }>{ titulo }</Text>
    </View>
    <View style={ styles.containerBaixo }>
      { /** titulo e subtitulo */ }
      <View>
        <Text style={ styles.tituloTela }>{ titulo }</Text>
        { subtitulo && <Text style={ styles.subtitulo }>{ subtitulo }</Text> }
      </View>
      { tela === TipoTela.gestaoLeads ? <Pressable style={ styles.containerIconeTela } onPress={ onAbrirFiltro }>
        { obterIconeTela() }
      </Pressable> : <View style={ styles.containerIconeTela }>
        { obterIconeTela() }
      </View> }
    </View>
  </LinearGradient>
}

export default MenuTopo;