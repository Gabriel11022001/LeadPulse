import AlertaErroGeral from "@/app/components/AlertaErroGeral";
import Botao from "@/app/components/Botao";
import Cabecalho from "@/app/components/Cabecalho";
import Campo, { TipoCampo } from "@/app/components/Campo";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import useAuth from "@/app/hooks/useAuth";
import { useEmail } from "@/app/hooks/useEmail";
import useSenhaConfirmarSenha from "@/app/hooks/useSenhaConfirmarSenha";
import useTelefone from "@/app/hooks/useTelefone";
import { buscarUsuarioPeloEmailService } from "@/app/service/buscarUsuarioPeloEmailService";
import cadastrarUsuarioService from "@/app/service/cadastrarUsuarioService";
import { Usuario } from "@/app/types/usuario";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import styles from "./styles";

// tela de cadastro de perfil
const CadastroPerfil = ({ navigation }: any) => {

  const [ erroGeral, setErroGeral ] = useState<string>("");
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ nomeCompleto, setNomeCompleto ] = useState<string>("");
  const [ erroNomeCompleto, setErroNomeCompleto ] = useState<string>("");
  const { email, erroEmail, onDigitarEmail } = useEmail();
  const { telefone, erroTelefone, onDigitarTelefone } = useTelefone();

  const {
    senha,
    senhaConfirmar,
    erroSenha,
    erroSenhaConfirmar,
    onDigitarSenha,
    onDigitarConfirmarSenha
  } = useSenhaConfirmarSenha();

  const {
    carregandoAuth,
    autenticar
  } = useAuth();

  const onDigitarNome = (nome: string): void => {
    setNomeCompleto(nome);
    setErroNomeCompleto("");

    if (nome.trim().length === 0) {
      setErroNomeCompleto("Informe o nome completo.");
    }

  }

  // cadastrar o usuário na base de dados
  const cadastrar = async () => {

    try {
      setCarregando(true);
      setErroGeral("");

      // validar se já existe um perfil cadastrado com o e-mail informado
      const usuarioCadastradoMesmoEmail: Usuario | null = await buscarUsuarioPeloEmailService(email.trim());

      if (usuarioCadastradoMesmoEmail != null) {
        // apresentar alerta informando duplicação de e-mail

        setErroGeral("Informe outro e-mail.");
        return;
      }

      const usuario: Usuario = {
        id: "",
        nomeCompleto: nomeCompleto.trim(),
        ativo: true,
        email: email.trim(),
        telefone: telefone.trim(),
        senha: senha.trim(),
        dataCadastro: "",
        dataUltimoLogin: ""
      }

      await cadastrarUsuarioService(usuario);

      // realizar a autenticação do usuário que acabou de ser cadastrado
      const usuarioLogado = await autenticar(
        usuario.email,
        usuario.senha ?? ""
      );

      if (usuarioLogado != null) {
        // redirecionar o usuário para a tela home do app
        navigation.replace("home");
      }

    } catch (e) {
      // registrar no log de erro
      setErroGeral("Erro ao tentar-se cadastrar o perfil, tente novamente.");
    } finally {
      setCarregando(false);
    }

  }

  return <LeadPulseTela>
    { /** cabeçalho no topo da tela do app */ }
    <Cabecalho
      titulo="Cadastro"
      habilitarBotaoVoltar={ true }
      onVoltar={ () => {
        navigation.goBack();
      } } />  
    <AlertaErroGeral
      apresentar={ erroGeral != "" }
      mensagem={ erroGeral }
      onFechar={ () => { setErroGeral("") } } />
    <KeyboardAvoidingView style={ { flex: 1 } } keyboardVerticalOffset={ 20 } behavior={ Platform.OS === "ios" ? "padding" : "height" }>
      <ScrollView showsVerticalScrollIndicator={ false }>
        <Text style={ styles.titulo }>Criar conta</Text>
        <Text style={ styles.subtitulo }>Comece a gerenciar seus leads hoje</Text>
        { /** campo para o usuário informar o nome completo */ }
        <Campo
          valor={ nomeCompleto }
          erro={ erroNomeCompleto }
          habilitado={ !carregando && !carregandoAuth }
          placeholder="Digite o nome completo..."
          titulo="Nome completo"
          tipoCampo={ TipoCampo.default }
          onAlterarValor={ (nomeCompletoDigitado: string) => {
            onDigitarNome(nomeCompletoDigitado);
          } } />
        { /** campo para o usuário informar o e-mail */ }
        <Campo
          valor={ email }
          erro={ erroEmail }
          habilitado={ !carregando && !carregandoAuth }
          placeholder="seu@email.com"
          tipoCampo={ TipoCampo.email }
          titulo="E-mail"
          onAlterarValor={ (emailDigitado: string) => {
            onDigitarEmail(emailDigitado);
          } } />
        { /** campo para o usuário informar o telefone */ }
        <Campo
          valor={ telefone }
          erro={ erroTelefone }
          habilitado={ !carregando && !carregandoAuth }
          placeholder="ex: (00) 00000-0000"
          tipoCampo={ TipoCampo.telefone }
          titulo="Telefone"
          onAlterarValor={ (telefoneDigitado: string) => {
            onDigitarTelefone(telefoneDigitado);
          } } />
        { /** campo para o usuário informar a senha */ }
        <Campo
          valor={ senha }
          erro={ erroSenha }
          habilitado={ !carregando && !carregandoAuth }
          placeholder="Digite a senha..."
          tipoCampo={ TipoCampo.senha }
          titulo="Senha"
          onAlterarValor={ (senhaDigitada: string) => {
            onDigitarSenha(senhaDigitada);
          } } />
        { /** campo para o usuário informar a senha de confirmação */ }
        <Campo
          valor={ senhaConfirmar }
          erro={ erroSenhaConfirmar }
          habilitado={ !carregando && !carregandoAuth }
          placeholder="Repita a senha..."
          tipoCampo={ TipoCampo.senha }
          titulo="Confirmar senha"
          onAlterarValor={ (senhaConfirmarDigitada: string) => {
            onDigitarConfirmarSenha(senhaConfirmarDigitada);
          } } />
        { /** botão para o usuário efetuar o cadastro */ }
        <Botao
          titulo="Criar conta"
          carregando={ carregando || carregandoAuth }
          habilitado={
            !carregando
            && !carregandoAuth
            && nomeCompleto != ""
            && email != ""
            && erroNomeCompleto === ""
            && erroEmail === ""
            && telefone != ""
            && erroTelefone === ""
            && senha != ""
            && erroSenha === ""
            && senhaConfirmar != ""
            && erroSenhaConfirmar === ""
          }
          onExecutar={ cadastrar }
          margemBaixo={ 70 }
          margemTopo={ 25 } />
      </ScrollView>
    </KeyboardAvoidingView>
  </LeadPulseTela>
}

export default CadastroPerfil;