import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import CadastroCompletoPessoaFisica from '../screens/CadastroCompleto/PessoaFisica';
import CadastroEndereco from '../screens/CadastroEndereco';
import CadastroLead from '../screens/CadastroLead';
import CadastroPerfil from '../screens/CadastroPerfil';
import DetalhesLead from '../screens/DetalhesLead';
import Login from '../screens/Login';
import SplashScreen from '../screens/SplashScreen';
import BottomNavigationApp from './bottomNavigation';

const Stack = createNativeStackNavigator();

type Tela = {

  nome: string;
  componente: any;

}

const Navigation = () => {

  // telas do app
  const telas: Array<Tela> = [
    {
      nome: "splash",
      componente: SplashScreen
    },
    {
      nome: "login",
      componente: Login
    },
    {
      nome: "cadastro_perfil",
      componente: CadastroPerfil
    },
    {
      nome: "cadastro_lead",
      componente: CadastroLead
    },
    {
      nome: "dados_completos_pf",
      componente: CadastroCompletoPessoaFisica
    },
    {
      nome: "cadastro_endereco",
      componente: CadastroEndereco
    },
    {
      nome: "detalhes_lead",
      componente: DetalhesLead
    }
  ];

  return <NavigationContainer>
    <Stack.Navigator initialRouteName='splash'>
      <Stack.Screen name="main" component={ BottomNavigationApp } options={ {
        headerShown: false
      } } />
      { telas.map(({ nome, componente }) => {

        return <Stack.Screen name={ nome } component={ componente } options={ {
          headerShown: false
        } } />
      }) }
    </Stack.Navigator>
  </NavigationContainer>
}

export default Navigation;