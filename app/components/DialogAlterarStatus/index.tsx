import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Botao, { TipoBotao } from "../Botao";
import BotaoCancelar from "../BotaoCancelar";
import styles from "./styles";

interface DialogAlterarStatusProps {

  statusAtual: string;
  onAlterarStatus: (statusSelecionado: string) => void;
  carregandoAlterarStatus: boolean;
  apresentar: boolean;
  onFechar: () => void;

}

// dialog para alterar o status do lead
const DialogAlterarStatus = ({
  statusAtual,
  onAlterarStatus,
  carregandoAlterarStatus,
  apresentar,
  onFechar
}: DialogAlterarStatusProps) => {

  const status: Array<string> = [
    "aguardando_qualificacao",
    "qualificado",
    "desqualificado",
    "cliente"
  ];

  const getStatusLeadNome = (status: string): string => {

    if (status) {

      if (status === "qualificado") {

        return "Qualificado";
      }

      if (status === "desqualificado") {

        return "Desqualificado";
      }

      if (status === "cliente") {

        return "Cliente";
      }

      if (status === "aguardando_qualificacao") {

        return "Aguardando Qualificação";
      }

    }

    return "";
  }

  const [ statusSelecionado, setStatusSelecionado ] = useState<string>(statusAtual);

  if (!apresentar) {

    return null;
  }

  return <View style={ styles.container }>
    <View style={ styles.corpo }>
      <Text style={ styles.titulo }>Alterar o status do lead</Text>
      <Text style={ styles.subtitulo }>Selecione o novo status do Lead</Text>
      { status.map((status: string) => {

        return <View style={ styles.containerStatus }>
          <Pressable onPress={ () => {
            setStatusSelecionado(status);
          } }
          style={ [
            styles.radio,
            statusSelecionado === status && styles.radioSelecionado
          ] } />
          <Text>{ getStatusLeadNome(status) }</Text>
        </View>
      }) }
      <Botao
        titulo="Salvar"
        habilitado={ true }
        margemTopo={ 30 }
        carregando={ carregandoAlterarStatus }
        tipo={ TipoBotao.avancar }
        onExecutar={ () => {
          onAlterarStatus(statusSelecionado);
        } } />
      <BotaoCancelar
        titulo="Cancelar"
        margemBottom={ 60 }
        onCancelar={ () => {
          setStatusSelecionado(statusAtual);
          onFechar();
        } } />
    </View>
  </View>
}

export default DialogAlterarStatus;