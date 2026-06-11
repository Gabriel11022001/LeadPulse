import config from "@/app/config";
import { Anotacao } from "@/app/types/lead";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Foundation from "@expo/vector-icons/Foundation";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ActivityIndicator, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface AnotacoesLeadListaProps {

  apresentar: boolean;
  anotacoes: Array<Anotacao>;
  carregando: boolean;
  onAdicionarAnotacao: () => void;
  onDeletarAnotacao: (anotacaoId: string) => void;
  onEditarAnotacao: (anotacaoId: string, anotacaoAtual: string) => void;
  onControlarApresentarAnotacoes: () => void;
  anotacao: string;
  onDigitarAnotacao: (anotacao: string) => void;
  carregandoSalvar: boolean;

}

// componente que representa a lista de anotações do lead
const AnotacoesLeadLista = ({
  anotacoes,
  carregando,
  onAdicionarAnotacao,
  onEditarAnotacao,
  onDeletarAnotacao,
  apresentar,
  onControlarApresentarAnotacoes,
  anotacao,
  onDigitarAnotacao,
  carregandoSalvar
}: AnotacoesLeadListaProps) => {

  return (
    <View style={ styles.container }>
      { /** topo da lista */ }
      <Pressable
        style={ styles.containerExpandir }
        onPress={ onControlarApresentarAnotacoes }>
          <Text style={ styles.titulo }>Anotações</Text>
          <MaterialIcons name={ apresentar ? "arrow-circle-up" : "arrow-circle-down" } size={ 40 } color={ config.corPrimaria } />
      </Pressable>
      <View>
        { /** separador */ }
        <View style={ styles.separadorBaixo } />
        { /** campo para o usuário cadastrar/editar uma anotação */ }
        <View style={ styles.containerCampoSalvarAnotacao }>
          <View style={ styles.iconeAnotacao }>
            <Foundation name="clipboard-notes" size={ 30 } color={ config.corPrimaria } />
          </View>
          <TextInput
            style={ styles.campoAnotacao }
            value={ anotacao }
            onChangeText={ (anotacaoDigitadaCampo: string) => {
              onDigitarAnotacao(anotacaoDigitadaCampo);
            } }
            placeholder="Digite sua anotação..."
            keyboardType="default"
            inputMode="text" />
          { /** botão para cadastrar/editar a anotação */ }
          { !carregandoSalvar ? <TouchableOpacity
            onPress={ () => {
              onAdicionarAnotacao();
            } }>
              <AntDesign name="check" size={ 25 } color={ config.corPrimaria } />
          </TouchableOpacity> : <ActivityIndicator color="#000" size={ 35 } /> }
        </View>
        { /** loader de carregamento das anotaçoes */ }
        { (carregando && apresentar) && <View style={ styles.loader }>
          <ActivityIndicator size={ 50 } color={ config.corPrimaria } />
          <Text style={ styles.txtCarregando }>Carregando as anotações do lead, aguarde...</Text>
        </View> }
        { /** corpo da lista com os itens */ }
        { (apresentar && anotacoes.length > 0 && !carregando) && <View>
          { anotacoes.map(({ id, anotacao, dataCadastro }: Anotacao) => (
            <View style={ styles.anotacaoItem } key={ id ?? "" }>
              <View style={ styles.containerDataCadastro }>
                { /** data de cadastro da anotação */ }
                <FontAwesome5 name="calendar-alt" size={ 24 } color={ config.corPrimaria } />
                <Text style={ styles.txtDataCadastro }>{ dataCadastro }</Text>
              </View>
              <View style={ styles.containerAnotacaoOperacoes }>
                <View style={ styles.containerTextoOperacao }>
                  { /** anotação */ }
                  <Text style={ styles.txtAnotacao }>{ anotacao }</Text>
                </View>
                { /** operações */ }
                <View style={ styles.containerOperoes }>
                  { /** editar */ } 
                  <TouchableOpacity
                    style={ [ styles.operacao, styles.editar ] }
                    onPress={ () => {
                      onEditarAnotacao(id ?? "", anotacao.trim());
                    } }>
                    <Feather name="edit" size={ 30 } color="#2563EB" />
                  </TouchableOpacity>
                  { /** deletar */ } 
                  <TouchableOpacity
                    style={ [ styles.operacao, styles.deletar ] }
                    onPress={ () => {
                      onDeletarAnotacao(id ?? "");
                    } }>
                    <MaterialIcons name="delete-outline" size={ 30 } color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )) }
        </View> }
        { /** alerta informando que não existem anotações na base de dados */ }
        { (!carregando && anotacoes.length === 0 && apresentar) && <View style={ styles.containerNaoExistemAnotacoes }>
          <Text style={ styles.txtNaoExistemAnotacoes }>Não existem anotações cadastradas na base de dados.</Text>
        </View> } 
      </View>
    </View>
  );
}

export default AnotacoesLeadLista;