// app/cadastro.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
// Importa as constantes
import { API_URL, AUTH_KEY } from '../src/data'; 

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !genero || !plataforma) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos do jogo.');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // A chave de autorização é essencial
          'Authorization': AUTH_KEY, 
        },
        body: JSON.stringify({
          nome: nome,
          genero: genero,
          plataforma: plataforma,
        }),
      });

      if (response.ok || response.status === 201) { 
        Alert.alert('Sucesso', `O jogo "${nome}" foi cadastrado!`);
        // Limpa os campos
        setNome('');
        setGenero('');
        setPlataforma('');
        // Retorna para a tela inicial
        router.back(); 
      } else {
        const errorData = await response.json();
        Alert.alert('Erro no Cadastro', `Falha: ${errorData.message || 'Erro desconhecido.'}`);
      }
    } catch (error) {
      Alert.alert('Erro de Conexão', 'Não foi possível conectar à API. Verifique a rede.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ScrollView para rolagem em telas menores
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🎮 Cadastro de Novo Jogo</Text>
      
      <Text style={styles.label}>Nome do Jogo:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Ex: Elden Ring"
        editable={!loading}
      />

      <Text style={styles.label}>Gênero:</Text>
      <TextInput
        style={styles.input}
        value={genero}
        onChangeText={setGenero}
        placeholder="Ex: RPG de Ação"
        editable={!loading}
      />

      <Text style={styles.label}>Plataforma:</Text>
      <TextInput
        style={styles.input}
        value={plataforma}
        onChangeText={setPlataforma}
        placeholder="Ex: PS5, Xbox Series X, PC"
        editable={!loading}
      />

      <Button 
        title={loading ? "Cadastrando..." : "Cadastrar Jogo na API"} 
        onPress={handleCadastro} 
        color="#3498db" 
        disabled={loading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, backgroundColor: '#f9f9f9' },
    header: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#2c3e50', textAlign: 'center' },
    label: { fontSize: 16, marginBottom: 5, marginTop: 10, fontWeight: '600' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16
    },
});