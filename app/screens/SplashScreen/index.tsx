import LeadPulseUp from '@/app/components/LeadPulseUp';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from './styles';

// tela Splash Screen do app
const SplashScreen = ({ navigation }: any) => {

  // redirecionar o usuário para a tela de login
  const redirecionarUsuarioTelaLogin = (): void => {

    setTimeout(() => {
      navigation.replace("login");
    }, 4000);

  }

  useFocusEffect(useCallback(() => {
    redirecionarUsuarioTelaLogin();
  }, []));

  return <SafeAreaView style={ styles.container }>
    <LeadPulseUp />
    <Text style={ styles.nomeApp }>LeadPulse</Text>
    <Text style={ styles.subTitulo }>Gestão inteligente de leads</Text>
    <ActivityIndicator color="#fff" size={ 70 } />
  </SafeAreaView>
}

export default SplashScreen;