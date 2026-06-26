import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import config from '../config';
import Home from '../screens/Home';
import Notificacoes from '../screens/Notificacoes';
import Perfil from '../screens/Perfil';

// bottom navigation do app
const BottomNavigationApp = () => {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={ ({ route }) => ({ 
      headerShown: false,
      tabBarStyle: {
        height: 120,
        paddingTop: 10,
        paddingBottom: 10
      },
      tabBarIcon: ({ focused }) => {

        if (route.name === "home") {

          return <Feather name="home" color={ focused ? config.corPrimaria : "#93C5FD" } size={ 30 } />;
        }

        if (route.name === "perfil") {

          return <Ionicons name="person-outline" size={ 30 } color={ focused ? config.corPrimaria : "#93C5FD" } />;
        }

        if (route.name === "notificacoes") {

          return <Ionicons name="notifications-outline" size={ 30 } color={ focused ? config.corPrimaria : "#93C5FD" } />;
        }

      },
      tabBarLabelStyle: {
        fontSize: 12,
        marginTop: 5,
        textTransform: "capitalize"
      },
      tabBarActiveTintColor: config.corPrimaria,
      tabBarInactiveTintColor: "#93C5FD"
     }) }>
      { /** tela home do app */ }
      <Tab.Screen name="home" component={ Home } />
      { /** tela de notificações do app */ }
      <Tab.Screen name="notificacoes" component={ Notificacoes } />
      { /** tela de perfil do app */ }
      <Tab.Screen name="perfil" component={ Perfil } />
    </Tab.Navigator>
  );
}

export default BottomNavigationApp;