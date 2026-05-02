import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import CadastroPerfil from '../screens/CadastroPerfil';
import Login from '../screens/Login';
import SplashScreen from '../screens/SplashScreen';

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
    }
  ];

  return <NavigationContainer>
    <Stack.Navigator initialRouteName='splash'>
      { telas.map(({ nome, componente }) => {

        return <Stack.Screen name={ nome } component={ componente } options={ {
          headerShown: false
        } } />
      }) }
    </Stack.Navigator>
  </NavigationContainer>
}

export default Navigation;