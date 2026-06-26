import Botao, { TipoBotao } from "@/app/components/Botao";
import Campo, { TipoCampo } from "@/app/components/Campo";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import Loader from "@/app/components/Loader";
import MenuTopo, { TipoTela } from "@/app/components/MenuTopo";
import config from "@/app/config";
import useAuth from "@/app/hooks/useAuth";
import alterarSenhaUsuarioService from "@/app/service/alterarSenhaUsuarioService";
import buscarUsuarioPeloIdSenha from "@/app/service/buscarUsuarioPeloIdSenha";
import { Usuario } from "@/app/types/usuario";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import styles from "./styles";

// tela de perfil do app
const Perfil = ({ navigation }: any) => {

  const { getUsuarioLogado, logout } = useAuth();
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ usuarioLogado, setUsuarioLogado ] = useState<Usuario | null>();
  const [ senhaAtual, setSenhaAtual ] = useState<string>("");
  const [ novaSenha, setNovaSenha ] = useState<string>("");
  const [ apresentarContainerAlterarSenha, setApresentarContainerAlterarSenha ] = useState<boolean>(false);
  const [ erroSenhaAtual, setErroSenhaAtual ] = useState<string>("");
  const [ erroNovaSenha, setErroNovaSenha ] = useState<string>("");
  const [ apresentarSenhaAtual, setApresentarSenhaAtual ] = useState<boolean>(false);
  const [ apresentarNovaSenha, setApresentarNovaSenha ] = useState<boolean>(false);

  // consultar usuário logado
  const consultarUsuarioLogado = async () => {
    const usuarioLogadoApp: Usuario = await getUsuarioLogado();

    setUsuarioLogado(usuarioLogadoApp);
  }

  // efetuar logout no app
  const efetuarLogoutApp = async () => {
    await logout();
    navigation.replace("login");
  }

  // alterar a senha do usuário logado
  const alterarSenha = async () => {

    try {
      setCarregando(true);

      const idUsuarioLogado: string = usuarioLogado?.id ?? "";

      const usuario: Usuario | null = await buscarUsuarioPeloIdSenha(idUsuarioLogado, senhaAtual);

      if (!usuario) {
        // apresentar alerta informando que a senha atual está incorreta
      } else {
        await alterarSenhaUsuarioService(idUsuarioLogado, novaSenha);

        Alert.alert("Atenção!", "Sua senha foi alterada com sucesso, realize login novamente para poder continuar utilizando o aplicativo.", [
          {
            style: "default",
            text: "OK",
            onPress: () => {
              // efetuar logout
              efetuarLogoutApp();
            }
          }
        ]);
      }

    } catch (e) {
      console.log(`Erro ao tentar-se alterar a senha: ${ e }`);
      // apresentar um alerta de erro para o usuário
    } finally {
      setCarregando(false);
    }

  }

  const onDigitarSenhaAtual = (senhaAtualDigitada: string) => {
    setSenhaAtual(senhaAtualDigitada);
    setErroSenhaAtual("");

    if (senhaAtualDigitada.trim().length === 0) {
      setErroSenhaAtual("Informe a senha atual.");
    } else if (novaSenha.trim().length > 0) {

      if (senhaAtualDigitada.trim() != novaSenha.trim()) {
        setErroSenhaAtual("As senhas não correspondem.");
      }

    }

  }

  const onDigitarNovaSenha = (novaSenhaDigitada: string) => {
    setNovaSenha(novaSenhaDigitada);
    setErroNovaSenha("");

    if (novaSenhaDigitada.trim().length === 0) {
      setErroNovaSenha("Informe a nova senha.");
    } else if (senhaAtual.trim().length > 0) {

      if (novaSenhaDigitada.trim() != senhaAtual.trim()) {
        setErroNovaSenha("As senhas não correspondem.");
      }

    }

  }

  const getIconeContainerAlterarSenha = () => {

    if (!apresentarContainerAlterarSenha) {

      return <MaterialIcons name="keyboard-arrow-down" size={ 35 } color={ config.corPrimaria } />;
    }

    return <MaterialIcons name="keyboard-arrow-up" size={ 35 } color={ config.corPrimaria } />;
  }

  useFocusEffect(useCallback(() => {
    consultarUsuarioLogado();
  }, []));

  return <LeadPulseTela>
    <Loader carregando={ carregando } />
    <MenuTopo
      titulo="Perfil"
      tela={ TipoTela.perfil }
      subtitulo="Gerencie seu perfil"
      onVoltar={ () => {
        navigation.goBack();
      } } />
    <ScrollView showsVerticalScrollIndicator={ false }>
      { /** container para o usuário alterar a senha */ }
      <View style={ styles.containerAlterarSenha }>
        <Pressable style={ styles.containerAlterarSenhaTopo } onPress={ () => {
          setSenhaAtual("");
          setNovaSenha("");
          setErroSenhaAtual("");
          setErroNovaSenha("");
          setApresentarContainerAlterarSenha(!apresentarContainerAlterarSenha);
        } }>
          <Text style={ styles.containerAlterarSenhaTopoTitulo }>Alterar Senha</Text>
          { getIconeContainerAlterarSenha() }
        </Pressable>
        { apresentarContainerAlterarSenha && <View style={ styles.containerAlterarSenhaCorpo }>
          { /** campo para o usuário informar a senha atual */ }
          <Campo
            titulo="Senha Atual"
            erro={ erroSenhaAtual }
            habilitado={ true }
            placeholder="Digite a senha atual..."
            tipoCampo={ TipoCampo.senha }
            valor={ senhaAtual }
            onAlterarValor={ (senhaAtualDigitada: string) => {
              onDigitarSenhaAtual(senhaAtualDigitada);
            } }
            senhaVisivel={ apresentarSenhaAtual }
            onVisualizarSenha={ () => {
              setApresentarSenhaAtual(!apresentarSenhaAtual);
            } } />
          { /** campo para o usuário informar a nova senha */ }
          <Campo
            titulo="Nova Senha"
            erro={ erroNovaSenha }
            habilitado={ true }
            placeholder="Digite a nova senha..."
            tipoCampo={ TipoCampo.senha }
            valor={ novaSenha }
            onAlterarValor={ (novaSenhaDigitada: string) => {
              onDigitarNovaSenha(novaSenhaDigitada);
            } }
            senhaVisivel={ apresentarNovaSenha }
            onVisualizarSenha={ () => {
              setApresentarNovaSenha(!apresentarNovaSenha);
            } } />
          <Botao
            tipo={ TipoBotao.editar }
            carregando={ false }
            onExecutar={ () => {
              alterarSenha();
            } }
            titulo="Alterar Senha"
            habilitado={ senhaAtual.trim().length > 0 && novaSenha.trim().length > 0 && erroSenhaAtual === "" && erroNovaSenha === "" } />
        </View> }
      </View>
      { /** botão para efetuar o logout no app */ }
      <Botao
        titulo="Sair"
        botaoLogin={ false }
        tipo={ TipoBotao.logout }
        carregando={ false }
        habilitado={ true }
        margemBaixo={ 50 }
        onExecutar={ () => {
          efetuarLogoutApp();
        } } />
    </ScrollView>
  </LeadPulseTela>
}

export default Perfil;