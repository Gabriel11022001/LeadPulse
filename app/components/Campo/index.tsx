import config from '@/app/config';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, TextInput, View } from "react-native";
import styles from "./styles";

export enum TipoCampo {

  email,
  senha,
  default,
  telefone,
  data,
  genero

}

interface CampProps {

  valor: string;
  placeholder: string;
  habilitado: boolean;
  onAlterarValor: (novoValor: string) => void;
  tipoCampo: TipoCampo;
  titulo: string;
  erro: string;
  campoLogin?: boolean;
  onVisualizarSenha?: () => void;
  senhaVisivel?: boolean;

}

// componete que representa o campo
const Campo = ({
  valor,
  placeholder,
  habilitado,
  onAlterarValor,
  tipoCampo = TipoCampo.default,
  titulo,
  erro,
  campoLogin = false,
  onVisualizarSenha,
  senhaVisivel = false
}: CampProps) => {

  const getIconeCampo = () => {
    const corIcone: string = !erro ? config.corBordas : "red";

    // icone do campo de e-mail
    if (tipoCampo === TipoCampo.email) {

      return <MaterialCommunityIcons name="email-outline" size={ 24 } color={ corIcone } />;
    }

    // icone do campo de senha
    if (tipoCampo === TipoCampo.senha) {

      return <AntDesign name="lock" size={ 24 } color={ corIcone } />;
    }

    // icone do campo de telefone
    if (tipoCampo === TipoCampo.telefone) {

      return <Feather name="phone-call" size={ 24 } color={ corIcone } />;
    }

    return <MaterialIcons name="abc" size={ 24 } color={ corIcone } />;
  }

  return <View style={ [
    styles.campo,
    campoLogin && { width: "100%", marginStart: 0, marginEnd: 0 }
  ] }>
    <Text style={ styles.titulo }>{ titulo }</Text>
    <View style={ [
      styles.containerConteudoIcone,
      erro && styles.campoComErro,
      !habilitado && styles.campoDesabilitado
    ] }>
      { getIconeCampo() }
      <TextInput
        style={ styles.campoConteudo }
        value={ valor }
        onChangeText={ (valorDigitado: string) => {
          onAlterarValor(valorDigitado);
        } }
        placeholder={ placeholder }
        editable={ habilitado }
        secureTextEntry={ tipoCampo === TipoCampo.senha && !senhaVisivel } />
      { /** botão para o usuário visualizar senha */ }
      { tipoCampo === TipoCampo.senha && <Pressable onPress={ onVisualizarSenha }>
        { !senhaVisivel ? 
          <AntDesign name="eye" size={ 24 } color="#000" /> : 
          <AntDesign name="eye-invisible" size={ 24 } color="#000" /> }
      </Pressable> }
    </View>
    { erro && <Text style={ styles.erro }>{ erro }</Text> }
  </View>
}

export default Campo;