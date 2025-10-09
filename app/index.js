// app/index.js
import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
// Se estiver usando Expo Router, use useRouter
import { useRouter } from 'expo-router'; 
// Se estiver usando React Navigation puro, use:
// import { useNavigation } from '@react-navigation/native';

export default function Home() {
  // Inicializa o roteador para navegação
  const router = useRouter(); 
  // const navigation = useNavigation(); // Alternativa React Navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕹️ Gerenciador de Jogos (API)</Text>
      <Button
        title="1. Acessar Tela de Cadastro"
        // Navegação para o arquivo 'cadastro.js'
        onPress={() => router.push('/cadastro')} 
        color="#3498db"
      />
      <View style={{ marginVertical: 15 }} /> 
      <Button
        title="2. Acessar Tela de Consulta"
        // Navegação para o arquivo 'consulta.js'
        onPress={() => router.push('/consulta')} 
        color="#2ecc71"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#34495e'
  }
});