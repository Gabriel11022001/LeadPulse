import config from "@/app/config";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Campo, { TipoCampo } from "../Campo";
import styles from "./styles";

interface FiltroLeadsProps {

  apresentar: boolean;
  onFiltrar: () => void;
  telefone: string;
  email: string;
  nome: string;
  documento: string;
  onDigitar: (campoFiltro: string, valor: string) => void;
  erroNome: string;
  erroTelefone: string;
  erroEmail: string;
  erroDocumento: string;
  onLimparFiltro: () => void;
  onFechar: () => void;

}

// filtro dos leads
const FiltroLeads = ({
  apresentar,
  onFiltrar,
  telefone,
  email,
  nome,
  documento,
  onDigitar,
  erroNome,
  erroDocumento,
  erroTelefone,
  erroEmail,
  onLimparFiltro,
  onFechar
}: FiltroLeadsProps) => {

  if (!apresentar) {

    return null;
  }

  return <View style={ styles.container }>
    <View style={ styles.corpo }>
      <ScrollView>
        <View style={ styles.separadorTopoContainer }>
          <View style={ styles.separadorTopo } />
        </View>
        <View style={ styles.containerBotaoFechar }>
          <Pressable style={ styles.botaoFechar } onPress={ onFechar }>
            <EvilIcons name="close" size={ 30 } color="black" />
          </Pressable>
        </View>
        <Text style={ styles.titulo }>Filtro de leads</Text>
        <Text style={ styles.subtitulo }>Refine sua busca e encontre os leads desejados.</Text>
        { /** nome ou razão social do lead */ }
        <Campo
          titulo="Nome/Razão Social"
          placeholder="Digite o nome/razsão social..."
          erro={ erroNome }
          habilitado={ true }
          tipoCampo={ TipoCampo.default }
          valor={ nome }
          onAlterarValor={ (nomeDigitado: string) => {
            onDigitar("nome", nomeDigitado);
          } } />
        { /** documento do lead */ }
        <Campo
          titulo="CPF/CNPJ"
          placeholder="Digite o cpf/cnpj..."
          erro={ erroDocumento }
          habilitado={ true }
          tipoCampo={ TipoCampo.default }
          valor={ documento }
          onAlterarValor={ (documentoDigitado: string) => {
            onDigitar("documento", documentoDigitado);
          } } />
        { /** email do lead */ }
        <Campo
          titulo="E-mail"
          placeholder="Digite o e-mail..."
          erro={ erroEmail }
          habilitado={ true }
          tipoCampo={ TipoCampo.email }
          valor={ email }
          onAlterarValor={ (emailDigitado: string) => {
            onDigitar("email", emailDigitado);
          } } />
        { /** telefone do lead */ }
        <Campo
          titulo="Telefone"
          placeholder="Digite o telefone..."
          erro={ erroTelefone }
          habilitado={ true }
          tipoCampo={ TipoCampo.telefone }
          valor={ telefone }
          onAlterarValor={ (telefoneDigitado: string) => {
            onDigitar("telefone", telefoneDigitado);
          } } />
        <View style={ styles.containerBotoes }>
          <TouchableOpacity style={ styles.botaoAplicarFiltro } onPress={ onFiltrar }>
            <Text style={ styles.txtBotaoAplicarFiltro }>Aplicar Filtro</Text>
            <Feather name="filter" size={ 24 } color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={ styles.botaoLimparFiltro } onPress={ onLimparFiltro }>
            <Text style={ styles.txtBotaoLimparFiltro }>Limpar Filtro</Text>
            <MaterialIcons name="delete-outline" size={ 24 } color={ config.corPrimaria } />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  </View>
}

export default FiltroLeads;