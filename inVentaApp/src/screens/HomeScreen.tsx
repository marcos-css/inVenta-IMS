// src/screens/HomeScreen.tsx
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

import ProductoCard from "../components/ProductoCard";
import { useProductos } from "../hooks/useProductos";
import { Colors } from "../constants/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const { productos, agregarProductoPrueba } = useProductos();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>inVenta</Text>
          <Text style={styles.subtitle}>Catálogo de productos</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CategoriaForm")}
        >
          <Text style={styles.buttonText}>+ Categoría</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductoCard producto={item} />}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>El catálogo está vacío.</Text>
            {/* Llamamos directo a la función expuesta por el hook */}
            <TouchableOpacity
              style={styles.inlineButton}
              onPress={agregarProductoPrueba}
            >
              <Text style={styles.inlineButtonText}>
                Generar producto de prueba
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 40,
    backgroundColor: Colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: -1,
  },
  subtitle: { fontSize: 14, color: Colors.textMuted, marginTop: 2 },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: { color: Colors.textLight, fontWeight: "600", fontSize: 13 },
  listContainer: { padding: 16, gap: 12 },
  emptyContainer: {
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 40,
  },
  emptyText: { color: Colors.gray300, fontSize: 16, textAlign: "center" },
  inlineButton: { marginTop: 12 },
  inlineButtonText: { color: Colors.link, fontWeight: "600", fontSize: 15 },
});
