import Botao from "@/app/components/Botao";
import Cabecalho from "@/app/components/Cabecalho";
import Campo, { TipoCampo } from "@/app/components/Campo";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import { useEmail } from "@/app/hooks/useEmail";
import useSenhaConfirmarSenha from "@/app/hooks/useSenhaConfirmarSenha";
import useTelefone from "@/app/hooks/useTelefone";
import { useState } from "react";
import { ScrollView, Text } from "react-native";
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
    } catch (e) {
      
    } finally {

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
    <ScrollView showsVerticalScrollIndicator={ false }>
      <Text style={ styles.titulo }>Criar conta</Text>
      <Text style={ styles.subtitulo }>Comece a gerenciar seus leads hoje</Text>
      { /** campo para o usuário informar o nome completo */ }
      <Campo
        valor={ nomeCompleto }
        erro={ erroNomeCompleto }
        habilitado={ !carregando }
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
        habilitado={ !carregando }
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
        habilitado={ !carregando }
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
        habilitado={ !carregando }
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
        habilitado={ !carregando }
        placeholder="Repita a senha..."
        tipoCampo={ TipoCampo.senha }
        titulo="Confirmar senha"
        onAlterarValor={ (senhaConfirmarDigitada: string) => {
          onDigitarConfirmarSenha(senhaConfirmarDigitada);
        } } />
      { /** botão para o usuário efetuar o cadastro */ }
      <Botao
        titulo="Criar conta"
        carregando={ carregando }
        habilitado={
          !carregando
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
  </LeadPulseTela>
}

export default CadastroPerfil;