import { ActivityIndicator, Text, View } from "react-native";
import Botao, { TipoBotao } from "../Botao";
import BotaoCancelar from "../BotaoCancelar";
import styles from "./styles";

interface DialogConfirmarProps {

  apresentar: boolean;
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
  carregandoOperacao: boolean;

}

// dialog de confirmar algo
const DialogConfirmar = ({
  mensagem,
  onCancelar,
  onConfirmar,
  apresentar,
  carregandoOperacao = false
}: DialogConfirmarProps) => {

  if (!apresentar) {

    return null;
  }

  return <View style={ styles.container }>
    <View style={ styles.corpo }>
      <Text style={ styles.titulo }>Atenção!</Text>
      <Text style={ styles.texto }>{ mensagem }</Text>
      { carregandoOperacao && <View style={ styles.containerLoader }>
        <ActivityIndicator color="#000" size={ 50 } />
        <Text style={ styles.txtAguarde }>Aguarde...</Text>
      </View> }
      { !carregandoOperacao && <View>
        <Botao margemTopo={ 30 } habilitado={ true } titulo="Confirmar" tipo={ TipoBotao.confirmar } onExecutar={ onConfirmar } />
        <BotaoCancelar titulo="Cancelar" onCancelar={ onCancelar } />
      </View> }
    </View>
  </View>
}

export default DialogConfirmar;