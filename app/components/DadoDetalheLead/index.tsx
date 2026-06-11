import config from "@/app/config";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export enum TipoDadoDetalheLead {

  nome,
  telefone,
  email,
  endereco,
  documento,
  razaoSocial,
  origem,
  comentario

}

interface DadoDetalheLeadProps {

  titulo: string;
  valor: string;
  tipoDetalhe: TipoDadoDetalheLead;
  onLigarTelefone?: () => void;
  onEnviarEmail?: () => void;
  onCopiarValorDado?: () => void;
  ehNomeRazaoSocial?: boolean;
  ehUltimoDadoApresentado?: boolean;
  subvalor?: string;

}

const DadoDetalheLead = ({
  titulo,
  valor,
  tipoDetalhe,
  onLigarTelefone,
  onEnviarEmail,
  onCopiarValorDado,
  ehNomeRazaoSocial,
  ehUltimoDadoApresentado,
  subvalor = ""
}: DadoDetalheLeadProps) => {

  const getIcone = () => {

    if (tipoDetalhe === TipoDadoDetalheLead.nome) {

      return <Ionicons name="person-outline" size={ 30 } color={ config.corPrimaria } />;
    }

    if (tipoDetalhe === TipoDadoDetalheLead.email) {

      return <Fontisto name="email" size={ 30 } color={ config.corPrimaria } />;
    }

    if (tipoDetalhe === TipoDadoDetalheLead.telefone) {

      return <FontAwesome6 name="phone" size={ 30 } color={ config.corPrimaria } />;
    }

    if (tipoDetalhe === TipoDadoDetalheLead.documento) {

      return <AntDesign name="audit" size={ 30 } color={ config.corPrimaria } />;
    }

    if (tipoDetalhe === TipoDadoDetalheLead.endereco) {

      return <Feather name="map-pin" size={ 30 } color={ config.corPrimaria } />;
    }

    if (tipoDetalhe === TipoDadoDetalheLead.origem) {

      return <MaterialCommunityIcons name="map-marker-radius-outline" size={ 30 } color={ config.corPrimaria } />;
    }

    return null;
  }

  if (ehNomeRazaoSocial) {

    return (
      <View style={ styles.container }>
        <View style={ styles.containerDadoIcone }>
          { getIcone() }
          <View style={ styles.containerDado }>
            <Text style={ styles.nomeRazaoSocial }>{ titulo }</Text>
            <Text style={ styles.valorDado }>{ valor }</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={ [
      styles.container,
      ehUltimoDadoApresentado && {
        borderBottomColor: "transparent"
      }
    ] }>
      <View style={ styles.containerDadoIcone }>
        { getIcone() }
        <View style={ styles.containerDado }>
          <Text style={ styles.tituloDado }>{ titulo }</Text>
          <Text style={ styles.valorDado }>{ valor }</Text>
        </View>
      </View>
      { /** botão para enviar o e-mail */ }
      { tipoDetalhe === TipoDadoDetalheLead.email && <TouchableOpacity
        onPress={ onEnviarEmail }>
        <MaterialCommunityIcons name="email-arrow-right" size={ 30 } color={ config.corPrimaria } />
      </TouchableOpacity> }
      { /** botão para ligar para o telefone do lead */ }
      { tipoDetalhe === TipoDadoDetalheLead.telefone && <TouchableOpacity
        onPress={ onLigarTelefone }>
        <Feather name="phone-call" size={ 30 } color={ config.corPrimaria } />
      </TouchableOpacity> }
      { /** botão para copiar o número do documento do lead */ }
      { tipoDetalhe === TipoDadoDetalheLead.documento && <TouchableOpacity
        onPress={ onCopiarValorDado }>
        <Feather name="copy" size={ 30 } color={ config.corPrimaria } />
      </TouchableOpacity> }
      { /** data de cadastro do lead */ }
      { tipoDetalhe === TipoDadoDetalheLead.origem && <Text style={ styles.subvalor }>
        { subvalor }
      </Text> }
    </View>
  );
}

export default DadoDetalheLead;