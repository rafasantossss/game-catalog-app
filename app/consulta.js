// app/consulta.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert, RefreshControl } from 'react-native';
// Importa as constantes
import { API_URL, AUTH_KEY } from '../src/data'; 

export default function Consulta() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); 

  const fetchJogos = async () => {
    setLoading(true); 
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': AUTH_KEY, 
        },
      });

      if (response.ok) {
        const data = await response.json(); 
        setJogos(data); 
      } else {
        const errorData = await response.json();
        Alert.alert('Erro na Consulta', `Falha ao buscar dados: ${errorData.message || 'Erro desconhecido.'}`);
        setJogos([]);
      }
    } catch (error) {
      Alert.alert('Erro de Conexão', 'Não foi possível buscar os dados da API. Verifique sua rede.');
      setJogos([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Carrega os dados na montagem
  useEffect(() => {
    fetchJogos();
  }, []);

  // Função para "Puxar para Atualizar"
  const onRefresh = () => {
    setRefreshing(true);
    fetchJogos();
  };

  if (loading && jogos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Carregando Jogos da API...</Text>
      </View>
    );
  }

  return (
    // ScrollView para rolagem e RefreshControl para atualização
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.header}>🎮 Lista de Jogos Cadastrados ({jogos.length})</Text>
      
      {jogos.length > 0 ? (
        // O MÉTODO MAP é utilizado para iterar e listar os dados
        jogos.map((jogo) => (
          // O `key` é essencial para listas
          <View key={jogo.id} style={styles.card}>
            <Text style={styles.cardTitle}>{jogo.nome}</Text>
            <Text style={styles.cardText}>Gênero: <Text style={styles.cardValue}>{jogo.genero}</Text></Text>
            <Text style={styles.cardText}>Plataforma: <Text style={styles.cardValue}>{jogo.plataforma}</Text></Text>
            <Text style={styles.cardId}>ID: {jogo.id}</Text> 
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>Nenhum jogo encontrado. Puxe para atualizar ou cadastre um novo!</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#eef5f9' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#34495e', textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#2ecc71',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#2c3e50' },
  cardText: { fontSize: 14, color: '#34495e', marginTop: 2 },
  cardValue: { fontWeight: '600' },
  cardId: { fontSize: 12, color: '#95a5a6', marginTop: 5, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 5, textAlign: 'right' },
  emptyText: { textAlign: 'center', marginTop: 30, fontSize: 16, color: '#7f8c8d' },
});