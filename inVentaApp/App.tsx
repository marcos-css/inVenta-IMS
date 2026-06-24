import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { PRODUCTOS_MOCK } from './src/constants/mockData';
import ProductoCard from './src/components/ProductoCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { inicializarBaseDeDatos } from './src/services/database';

export default function App() {

  const [bdCargada, setBdCargada] = useState(false);

  useEffect(() => {
    async function cargarBaseDeDatos(){
      try {
        await inicializarBaseDeDatos();
        setBdCargada(true);
      } catch (error) {
        console.error(error)
      }
    }
    cargarBaseDeDatos();
  }, [])

  if(!bdCargada){
    return(
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#212529"/>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    )
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>inVenta</Text>
        <Text style={styles.subtitle}>Catálogo y Mostrador</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={PRODUCTOS_MOCK}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductoCard producto={item} />}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#868E96",
    fontWeight: "500",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#212529",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: "#868E96",
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    gap: 12,
  }
});