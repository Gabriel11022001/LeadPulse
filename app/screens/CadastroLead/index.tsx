import AlertaErroGeral from "@/app/components/AlertaErroGeral";
import Botao from "@/app/components/Botao";
import BotaoCancelar from "@/app/components/BotaoCancelar";
import Campo, { TipoCampo } from "@/app/components/Campo";
import LeadPulseTela from "@/app/components/LeadPulseTela";
import MenuTopo, { TipoTela } from "@/app/components/MenuTopo";
import TipoPessoaLeadOpcoes from "@/app/components/TipoPessoaLeadOpcoes";
import useAuth from "@/app/hooks/useAuth";
import useDocumentoLead from "@/app/hooks/useDocumentoLead";
import { useEmail } from "@/app/hooks/useEmail";
import useLeadPulse from "@/app/hooks/useLeadPulse";
import useTelefone from "@/app/hooks/useTelefone";
import buscarLeadPeloDocumentoService from "@/app/service/buscarLeadPeloDocumento";
import buscarLeadPeloEmailService from "@/app/service/buscarLeadPeloEmail";
import buscarLeadPeloIdService from "@/app/service/buscarLeadPeloIdService";
import { Lead, TipoPessoaLead } from "@/app/types/lead";
import { Usuario } from "@/app/types/usuario";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

// tela de cadastro de lead
const CadastroLead = ({
  navigation,
  route
}: any) => {

  const {
    getUsuarioLogado
  } = useAuth();
  const {
    lead,
    atualizarDadosLead,
    limparDadosLead
  } = useLeadPulse();
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ erroGeral, setErroGeral ] = useState<string>("");
  const [ idLead, setIdLead ] = useState<string>("");
  const { email, erroEmail, onDigitarEmail } = useEmail();
  const { telefone, erroTelefone, onDigitarTelefone } = useTelefone();
  const [ tipoPessoa, setTipoPessoa ] = useState<TipoPessoaLead>(TipoPessoaLead.pf);
  const {
    documento,
    erroDocumento,
    onDigitarDocumento,
    setDocumento,
    setErroDocumento
  } = useDocumentoLead(tipoPessoa);

  // prosseguir para a próxima tela
  const prosseguirDadosCompletos = async () => {

    try {
      setCarregando(true);
      setErroGeral("");

      const documentoValidar: string = documento.trim();

      const leadMesmoDocumento: Lead | null = await buscarLeadPeloDocumentoService(
        documentoValidar,
        tipoPessoa
      );

      if (leadMesmoDocumento != null) {

        if (lead?.id != "") {

          if (lead?.id != leadMesmoDocumento.id) {
            
            if (tipoPessoa === TipoPessoaLead.pf) {
              setErroGeral("Já existe outro lead cadastrado com o mesmo cpf!");

              return;
            } else {
              setErroGeral("Já existe outro lead cadastrado com o mesmo cnpj!");

              return;
            }

          }

        } else {

          if (tipoPessoa === TipoPessoaLead.pf) {
            setErroGeral("Já existe outro lead cadastrado com o mesmo cpf!");

            return;
          } else {
            setErroGeral("Já existe outro lead cadastrado com o mesmo cnpj!");

            return;
          }

        }

      }
      
      const leadMesmoEmail: Lead | null = await buscarLeadPeloEmailService(email.trim(), tipoPessoa);

      if (leadMesmoEmail != null) {

        if (lead?.id != "") {

          if (lead?.id != leadMesmoEmail.id) {
            setErroGeral("Já existe outro lead cadastrado com o mesmo e-mail!");
            
            return;
          }

        } else {
          setErroGeral("Já existe outro lead cadastrado com o mesmo e-mail!");

          return;
        }

      }

      // obter o id do usuário logado
      const usuarioLogado: Usuario = await getUsuarioLogado();

      if (lead != null) {
        atualizarDadosLead({
          id: lead.id ?? "",
          email: email.trim(),
          telefone: telefone.trim(),
          dataCadastro: lead.dataCadastro,
          origem: lead.origem,
          status: lead.status,
          tipoPessoa: tipoPessoa,
          cpf: tipoPessoa === TipoPessoaLead.pf ? documento.trim() : "",
          cnpj: tipoPessoa === TipoPessoaLead.pj ? documento.trim() : "",
          anotacoes: lead.anotacoes ?? [],
          dataFundacao: lead.dataFundacao ?? "",
          dataNascimento: lead.dataNascimento ?? "",
          genero: lead.genero ?? "",
          nomeCompleto: lead.nomeCompleto ?? "",
          razaoSocial: lead.razaoSocial ?? "",
          rg: lead.rg ?? "",
          idUsuario: usuarioLogado.id ?? "",
          endereco: {
            cep: lead.endereco?.cep ?? "",
            complemento: lead.endereco?.complemento ?? "",
            logradouro: lead.endereco?.logradouro ?? "",
            cidade: lead.endereco?.cidade ?? "",
            bairro: lead.endereco?.bairro ?? "",
            estado: lead.endereco?.estado ?? "",
            leadId: lead.id ?? "",
            numero: lead.endereco?.numero ?? ""
          }
        });
      } else {
        atualizarDadosLead({
          id: "",
          tipoPessoa: tipoPessoa,
          email: email.trim(),
          telefone: telefone.trim(),
          origem: "Aplicativo",
          dataCadastro: "",
          status: "aguardando_qualificacao",
          cpf: tipoPessoa === TipoPessoaLead.pf ? documento.trim() : "",
          cnpj: tipoPessoa === TipoPessoaLead.pj ? documento.trim() : "",
          anotacoes: [],
          endereco: {
            cep: "",
            complemento: "",
            logradouro: "",
            leadId: "",
            bairro: "",
            cidade: "",
            estado: "",
            numero: ""
          },
          dataFundacao: "",
          dataNascimento: "",
          genero: "",
          nomeCompleto: "",
          razaoSocial: "",
          rg: "",
          idUsuario: usuarioLogado.id ?? ""
        });
      }

      if (tipoPessoa === TipoPessoaLead.pf) {
        navigation.navigate("dados_completos_pf");
      }

    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  // consultar o lead no servidor
  const buscarLead = async (idLead: string) => {

    try {
      setCarregando(true);

      const leadEncontrado: Lead | null = await buscarLeadPeloIdService(idLead);

      if (leadEncontrado != null) {
        atualizarDadosLead(leadEncontrado);
      }

    } catch (e) {
      console.log("Erro ao tentar-se consultar o lead pelo id: " + e);
    } finally {
      setCarregando(false);
    }

  }

  // cancelar cadastro do lead
  const cancelarCadastro = (): void => {
    limparDadosLead();

    navigation.replace("main");
  }

  useEffect(() => {
    setDocumento("");
    setErroDocumento("");
  }, [ tipoPessoa ]);

  useFocusEffect(useCallback(() => {  

    if (lead != null) {
      setTipoPessoa(lead.tipoPessoa);
      onDigitarDocumento((lead.tipoPessoa == TipoPessoaLead.pf ? lead.cpf : lead.cnpj) ?? "");
      onDigitarEmail(lead.email);
      onDigitarTelefone(lead.telefone);
    } else if (route.params && route.params.idLeadEditar) {
      // consultar o lead no servidor para edição dos dados cadastrais
      buscarLead(route.params.idLeadEditar ?? "");
    }

  }, [ lead ]));

  return <LeadPulseTela>
    { /** menu do topo */ }
    <MenuTopo
      titulo="Cadastro de Lead"
      subtitulo="Preencha os dados do lead"
      tela={ TipoTela.cadastroLead }
      onVoltar={ () => {
        cancelarCadastro();
      } } />
    <AlertaErroGeral 
      apresentar={ erroGeral != "" }
      mensagem={ erroGeral }
      onFechar={ () => {
        setErroGeral("");
      } } />
    <KeyboardAvoidingView
      style={ { flex: 1 } }
      keyboardVerticalOffset={ 20 }
      behavior={ Platform.OS === "ios" ? "padding" : "height" }>
      <ScrollView showsVerticalScrollIndicator={ false }>
        { /** tipo de pessoa do lead */ }
        <TipoPessoaLeadOpcoes
          tipoPessoaSelecionada={ tipoPessoa }
          onSelecionar={ (tipoPessoaSelecionada: TipoPessoaLead) => {
            setTipoPessoa(tipoPessoaSelecionada);
          } } />
        { /** campo para informar o documento do lead */ }
        <Campo
          valor={ documento }
          erro={ erroDocumento }
          habilitado={ !carregando }
          placeholder={ tipoPessoa === TipoPessoaLead.pf ? "000.000.000-00" : "00.000.000/0000-00" }
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
        { /** botão para ´prosseguir com o cadastro do lead */ }
        <Botao
          titulo="Prosseguir"
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
        { /** botão para cancelar o cadastro do lead */ }
        <BotaoCancelar 
          titulo="Cancelar" 
          onCancelar={ cancelarCadastro } 
          margemBottom={ 50 } />
      </ScrollView>
    </KeyboardAvoidingView>
  </LeadPulseTela>
}

export default CadastroLead;