import AlertaErroGeral from "@/app/components/AlertaErroGeral";
import Botao from "@/app/components/Botao";
import Campo, { TipoCampo } from "@/app/components/Campo";
import LeadPulseUp from "@/app/components/LeadPulseUp";
import useAuth from "@/app/hooks/useAuth";
import { Usuario } from "@/app/types/usuario";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

// tela de login do app
const Login = ({ navigation }: any) => {
 
  const [ email, setEmail ] = useState<string>("");
  const [ senha, setSenha ] = useState<string>("");
  const [ erroEmail, setErroEmail ] = useState<string>("");
  const [ erroSenha, setErroSenha ] = useState<string>("");
  const [ senhaVisivel, setSenhaVisivel ] = useState<boolean>(false);
  const [ erroGeral, setErroGeral ] = useState<string>("");
  const [ lembrar, setLembrar ] = useState<boolean>(false);

  const {
    carregandoAuth,
    autenticar
  } = useAuth();

  const onDigitarEmail = (emailDigitado: string): void => {
    setErroEmail("");
    setEmail(emailDigitado.trim());

    if (emailDigitado.trim().length === 0) {
      setErroEmail("Informe o e-mail.");
    }

  }

  const onDigitarSenha = (senhaDigitada: string): void => {
    setErroSenha("");
    setSenha(senhaDigitada.trim());

    if (senhaDigitada.trim().length === 0) {
      setErroSenha("Informe a senha.");
    }

  }

  // realizar login no app
  const efetuarLogin = async () => {
    
    try {
      setErroGeral("");
      
      const usuarioLogado: Usuario | null = await autenticar(email, senha);

      if (usuarioLogado === null) {
        setErroGeral("E-mail ou senha invalidos.");

        return;
      }

      // redirecionar o usuário para a tela home do app
      navigation.replace("home");
    } catch (e) {
      // apresentar alerta de erro para o usuário
      setErroGeral(`Erro ao tentar-se efetuar o login: ${ e }`);
    }

  }

  // salvar os dados do login em memória
  const salvarDadosLoginLocalmente = async () => {
    setLembrar(!lembrar);

    try {
      
    } catch (e) {

    }

  }

  /**
   * validar se o usuário optou por deixar salvo
   * as credenciais para fazer login
   */
  const validarOptouSalvarCredenciaisLogin = async () => {

  }

  useFocusEffect(useCallback(() => {
    validarOptouSalvarCredenciaisLogin();
  }, []));

  return (
    <SafeAreaView style={ styles.container }>
      { /** alerta de erro geral */ }
      <AlertaErroGeral
        mensagem={ erroGeral }
        apresentar={ erroGeral != "" }
        onFechar={ () => {
          setErroGeral("");
        } } />
      <ScrollView showsVerticalScrollIndicator={ false }>
        <KeyboardAvoidingView
          keyboardVerticalOffset={ 30 }
          style={ { flex: 1 } }
          behavior={ Platform.OS === "ios" ? "padding" : "height" }>
          <View style={ styles.conteudo }>
            <LeadPulseUp />
            <Text style={ styles.titulo }>Seja bem vindo</Text>
            <Text style={ styles.subtitulo }>Entre para gerenciar seus leads</Text>
            <View style={ styles.formLogin }>
              { /** campo para o usuário informar o e-mail */ }
              <Campo
                campoLogin={ true }
                valor={ email }
                onAlterarValor={ (novoEmailDigitado: string) => {
                  onDigitarEmail(novoEmailDigitado);
                } }
                erro={ erroEmail }
                habilitado={ !carregandoAuth }
                placeholder="seu@email.com"
                tipoCampo={ TipoCampo.email }
                titulo="E-mail" />
              { /** campo para o usuário informar a senha */ }
              <Campo
                campoLogin={ true }
                valor={ senha }
                onAlterarValor={ (novaSenhaDigitada: string) => {
                  onDigitarSenha(novaSenhaDigitada);
                } }
                erro={ erroSenha }
                habilitado={ !carregandoAuth }
                placeholder="******"
                tipoCampo={ TipoCampo.senha }
                titulo="Senha"
                senhaVisivel={ senhaVisivel }
                onVisualizarSenha={ () => {
                  setSenhaVisivel(!senhaVisivel);
                } } />
              <View style={ styles.containerLembrarEsqueciSenha }>
                { /** opção de recordar a senha */ }
                <View style={ styles.containerLembrar }>
                  <Pressable style={ [
                    styles.checkBoxLembrar,
                    lembrar && styles.checkBoxLembrarHabilitado
                  ] } onPress={ () => {
                    salvarDadosLoginLocalmente();
                  } }>
                    { lembrar && <Feather name="check" size={ 17 } color="#fff" /> }
                  </Pressable>
                  <Text>Lembrar-me</Text>
                </View>
                { /** botão para recuperar senha */ }
                <Pressable onPress={ () => {
                  // redirecionar a tela de recuperação de senha
                } }>
                  <Text style={ styles.txtEsqueceuSenha }>Esqueceu a senha?</Text>
                </Pressable>
              </View>
              { /** botão para efetuar login */ }
              <Botao 
                titulo="Entrar"
                botaoLogin={ true }
                habilitado={ !carregandoAuth && email != "" && senha != "" && erroEmail === "" && erroSenha === "" }
                carregando={ carregandoAuth } 
                onExecutar={ () => {
                  efetuarLogin();
                } } />
              <View style={ styles.containerNaoTemConta }>
                <Text>Ainda não têm uma conta?</Text>
                <Pressable onPress={ () => {
                  navigation.navigate("cadastro_perfil")
                } }>
                  <Text style={ styles.txtCadastrese }>Cadastre-se</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Login;