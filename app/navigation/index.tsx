import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
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
    }
  ];

  return <NavigationContainer>
    <Stack.Navigator initialRouteName='splash'>
      { telas.map(({ nome, componente }) => {

        if (nome === "splash" || nome === "login") {

          return <Stack.Screen
            name={ nome }
            component={ componente }
            options={ {
              headerShown: false
            } } />
        }

        return <Stack.Screen name={ nome } component={ componente } />
      }) }
    </Stack.Navigator>
  </NavigationContainer>
}

export default Navigation;