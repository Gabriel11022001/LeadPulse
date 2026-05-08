import Botao from "@/app/components/Botao";
import Cabecalho from "@/app/components/Cabecalho";
import Campo, { TipoCampo } from "@/app/components/Campo";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import useDocumentoLead from "@/app/hooks/useDocumentoLead";
import { useEmail } from "@/app/hooks/useEmail";
import useTelefone from "@/app/hooks/useTelefone";
import { TipoPessoaLead } from "@/app/types/lead";
import { useState } from "react";
import { ScrollView, Text } from "react-native";
import styles from "./styles";

// tela de cadastro de lead
const CadastroLead = ({
  navigation,
  route
}: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ erroGeral, setErroGeral ] = useState<string>("");
  const [ idLead, setIdLead ] = useState<string>("");
  const { email, erroEmail, onDigitarEmail } = useEmail();
  const { telefone, erroTelefone, onDigitarTelefone } = useTelefone();
  const [ tipoPessoa, setTipoPessoa ] = useState<TipoPessoaLead>(TipoPessoaLead.pf);
  const {
    documento,
    erroDocumento,
    onDigitarDocumento
  } = useDocumentoLead(tipoPessoa);

  // prosseguir para a próxima tela
  const prosseguirDadosCompletos = async () => {

    try {
      setCarregando(true);
    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  return <LeadPulseTela>
    { /** cabeçalho do app */ }
    <Cabecalho
      habilitarBotaoVoltar={ true }
      titulo="Cadastro de Lead"
      onVoltar={ () => {
        navigation.goBack();
      } } />
    <ScrollView showsVerticalScrollIndicator={ false }>
      <Text style={ styles.titulo }>{ idLead === "" ? "Cadastrar Lead" : "Editar Lead" }</Text>
      <Text style={ styles.subtitulo }>Preencha os dados do lead</Text>
      { /** tipo de pessoa do lead */ }
      { /** campo para informar o documento do lead */ }
      <Campo
        valor={ documento }
        erro={ erroDocumento }
        habilitado={ !carregando }
        placeholder={ tipoPessoa === TipoPessoaLead.pf ? "000.000.000-00" : "" }
        tipoCampo={ tipoPessoa === TipoPessoaLead.pf ? TipoCampo.cpf : TipoCampo.cnpj }
        titulo="Documento"
        onAlterarValor={ (documentoDigitado: string) => {
          onDigitarDocumento(documentoDigitado);
        } } />
      { /** e-mail do lead */ }
      <Campo
        valor={ email }
        erro={ erroEmail }
        habilitado={ !carregando }
        placeholder="email@email.com"
        tipoCampo={ TipoCampo.email }
        titulo="E-mail"
        onAlterarValor={ (emailDigitado: string) => {
          onDigitarEmail(emailDigitado);
        } } />
      { /** telefone do lead */ }
      <Campo
        valor={ telefone }
        erro={ erroTelefone }
        habilitado={ !carregando }
        placeholder="(00) 00000-0000"
        tipoCampo={ TipoCampo.telefone }
        titulo="Telefone"
        onAlterarValor={ (telefoneDigitado: string) => {
          onDigitarTelefone(telefoneDigitado);
        } } />
      <Botao
        titulo="Prosseguir"
        margemBaixo={ 50 }
        margemTopo={ 30 }
        carregando={ carregando }
        habilitado={
          email != ""
          && telefone != ""
          && documento != ""
          && erroEmail === ""
          && erroTelefone === ""
          && erroDocumento === ""
        }
        onExecutar={ prosseguirDadosCompletos } />
    </ScrollView>
  </LeadPulseTela>
}

export default CadastroLead;