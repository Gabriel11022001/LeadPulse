import Botao from "@/app/components/Botao";
import Campo, { TipoCampo } from "@/app/components/Campo";
import LeadPulseUp from "@/app/components/LeadPulseUp";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

// tela de login do app
const Login = () => {
 
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>("");
  const [ senha, setSenha ] = useState<string>("");
  const [ erroEmail, setErroEmail ] = useState<string>("");
  const [ erroSenha, setErroSenha ] = useState<string>("");
  const [ senhaVisivel, setSenhaVisivel ] = useState<boolean>(false);
  const [ erroGeral, setErroGeral ] = useState<string>("");

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

  // apresentar alerta de erro para o usuário
  const apresentarAlertaErro = (msgErro: string): void => {
    setErroGeral(msgErro.trim());
  }

  // realizar login no app
  const efetuarLogin = async () => {
    
    try {
      setCarregando(true);
      setErroGeral("");
    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  return (
    <SafeAreaView style={ styles.container }>
      <ScrollView showsVerticalScrollIndicator={ false }>
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
              habilitado={ !carregando }
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
              habilitado={ !carregando }
              placeholder="******"
              tipoCampo={ TipoCampo.senha }
              titulo="Senha"
              senhaVisivel={ senhaVisivel }
              onVisualizarSenha={ () => {
                setSenhaVisivel(!senhaVisivel);
              } } />
            <View>
              { /** opção de recordar a senha */ }
              <View>
                <Pressable />
                <Text>Lembrar-me</Text>
              </View>
              { /** botão para recuperar senha */ }
              <Pressable>
                <Text>Esqueceu a senha?</Text>
              </Pressable>
            </View>
            { /** botão para efetuar login */ }
            <Botao 
              titulo="Entrar"
              botaoLogin={ true }
              habilitado={ !carregando && email != "" && senha != "" && erroEmail === "" && erroSenha === "" }
              carregando={ carregando } 
              onExecutar={ () => {
                efetuarLogin();
              } } />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Login;