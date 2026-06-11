import Foundation from '@expo/vector-icons/Foundation';
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

interface AlertaErroGeralProps {

  mensagem: string;
  apresentar: boolean;
  onFechar: () => void;

}

// alerta de erro geral
const AlertaErroGeral = ({
  mensagem,
  apresentar,
  onFechar
}: AlertaErroGeralProps) => {

  if (!apresentar) {

    return null;
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.corpoAlerta }>
        <Foundation name="alert" size={ 60 } color="rgba(191, 219, 254, 0.5)" />
        <Text style={ [ styles.titulo, styles.texto ] }>Atenção!</Text>
        { /** mensagem de erro */ }
        <Text style={ [ styles.texto, styles.mensagem ] }>{ mensagem }</Text>
        { /** botão ok */ }
        <Pressable
          style={ styles.btnOk }
          onPress={ onFechar }>
          <Text style={ styles.txtBtnOk }>OK</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default AlertaErroGeral;