import config from '@/app/config';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from "react-native";
import styles from './styles';

interface MenuHomeProps {

  nomeUsuarioLogado: string;
  leadsEncontrados: number;
  possuiNotificacoes: boolean;
  onVoltar: () => void;
  onRedirecionarAdicionarLead: () => void;
  onRedirecionarNotificacoes: () => void;
}

// menu da tela home do app
const MenuHome = ({
  nomeUsuarioLogado,
  leadsEncontrados,
  possuiNotificacoes = false,
  onVoltar,
  onRedirecionarAdicionarLead,
  onRedirecionarNotificacoes
}: MenuHomeProps) => {

  return <LinearGradient 
    colors={ [ '#2563EB', '#3B82F6', '#60A5FA' ] }
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={ styles.header } >
    { /** container com o botão de voltar e visualizar notificações */ }
    <View style={ styles.containerBotaoVoltarBotaoNotificacoes }>
      { /** botão de voltar */ }
      <Pressable
        style={ styles.botaoOperacaoHome }
        onPress={ onVoltar }>
          <AntDesign name="arrow-left" size={ 30 } color="#fff" />
      </Pressable>
      { /** botão para redirecionar a tela de notificações do app */ }
      <Pressable
        style={ styles.botaoOperacaoHome }
        onPress={ onRedirecionarNotificacoes }>
          { possuiNotificacoes && <View style={ styles.notificacao } >
            <FontAwesome6 name="exclamation" size={ 10 } color="#fff" />
          </View> }
          <Ionicons name="notifications-outline" size={ 30 } color="#fff" />
      </Pressable>
    </View>
    { /** container com o nome do usuário logado e um subtitulo */ }
    <View> 
      <View>
        <Text style={ styles.titulo }>Olá { nomeUsuarioLogado }</Text>
      </View>
      <Text style={ styles.subtitulo }>Bem-vindo de volta!</Text>
    </View>
    <View style={ styles.containerLeadsEncontradosBotaoAdicionar }>
      { /** container contendo a quantidade de leads encontrados */ }
      <View style={ styles.containerLeadsEncontrados }> 
        <Octicons name="person" size={ 24 } color="#fff" />
        <Text style={ styles.txtLeadsEncontrados }>{ leadsEncontrados.toString() } { leadsEncontrados == 1 ? "Lead encontrado" : "Leads encontrados" }</Text>
      </View>
      { /** botão para redirecionar o usuário para a tela de cadastro de lead */ }
      <Pressable
        style={ styles.btnRedirecionarAdicionarLead }
        onPress={ onRedirecionarAdicionarLead }>
          <FontAwesome6 name="add" size={ 40 } color={
            config.corPrimaria
          } />
      </Pressable>
    </View>
  </LinearGradient>
}

export default MenuHome;