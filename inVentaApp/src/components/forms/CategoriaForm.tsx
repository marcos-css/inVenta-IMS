import {
  Alert,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import React, { useCallback, useEffect, useState } from "react";
import {
  eliminarCategoria,
  insertarCategorias,
  obtenerCategorias,
} from "../../services/database";
import { Categoria } from "../../types";
import { Colors } from "../../constants/colors";
import Checkbox from "expo-checkbox";

export const CategoriaForm = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isValid = inputValue.trim().length >= 3;

  const cargarCategorias = useCallback(async () => {
    const datos = await obtenerCategorias();
    setCategorias(datos);
  }, []);

  useEffect(() => {
    cargarCategorias();
  }, [cargarCategorias]);

  const handleGuardar = async () => {
    if (!isValid) {
      setError("El nombre debe tener al menos 3 caracteres");
      return;
    }
    if (
      categorias.some(
        (cat) => cat.nombre.toUpperCase() === inputValue.trim().toUpperCase(),
      )
    ) {
      setError("Esta categoría ya existe.");
      return;
    }
    setError("");

    try {
      await insertarCategorias(inputValue.trim());
      setInputValue("");
      await cargarCategorias();
    } catch (error) {
      console.error("Error al guardar en BD:", error);
      Alert.alert("Error", "No se pudo guardar la categoría localmente.");
    }
  };

  const handleTextChange = (texto: string) => {
    const textoNormalizado = texto.toUpperCase();
    setInputValue(textoNormalizado);
    if (error && textoNormalizado.trim().length >= 3) setError("");
  };

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleEliminar = async (id: string) => {
    Alert.alert(
      "Confirmar eliminación",
      "Se eliminarán todos los productos asociados a esta categoría.",
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => console.log("Cancelado"),
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await eliminarCategoria(id);

              setCategorias((prev) => prev.filter((cat) => cat.id !== id));
              setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
            } catch (err) {
              Alert.alert("Error", "No se pudo eliminar la categoría.");
            }
          },
        },
      ],
    );
  };

  const renderCategoriaItem = ({ item }: { item: Categoria }) => {
    const isChecked = selectedIds.includes(item.id);

    const selectedStyle = isChecked ? { borderColor: Colors.primary } : {};

    return (
      <Pressable
        style={[styles.itemContainer, selectedStyle]}
        onPress={() => handleToggle(item.id)}
      >
        <View style={styles.itemLeftContainer}>
          {isEdit && (
            <Checkbox
              value={isChecked}
              onValueChange={() => handleToggle(item.id)}
              color={isChecked ? Colors.primary : undefined}
            />
          )}
          <Text style={styles.listText}>{item.nombre}</Text>
        </View>

        {!!isEdit && !isChecked && (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              handleEliminar(item.id);
            }}
          >
            <Text style={styles.deleteButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formSection}>
        <Input
          label="Nueva Categoría"
          placeholder="Ejemplo: BEBIDAS"
          value={inputValue}
          onChangeText={handleTextChange}
          error={error}
        />
        <Button text="Guardar Categoría" onPress={handleGuardar} />
      </View>

      {/* lista */}
      <View style={styles.listSection}>
        <View style={styles.row}>
          <Text style={styles.title}>Categorías Registradas</Text>
          <TouchableOpacity
            onPress={() => {
              setIsEdit(!isEdit);
              setSelectedIds([]);
            }}
          >
            <Text style={[isEdit ? styles.cancelButton : styles.editButton]}>
              {isEdit ? "Cancelar" : "Editar"}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={categorias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategoriaItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No hay categorías creadas todavía.
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  formSection: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  listSection: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  editButton: {
    color: Colors.link,
    textDecorationLine: "underline",
    fontSize: 16,
  },
  cancelButton: {
    color: Colors.error,
    textDecorationLine: "underline",
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  itemLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  deleteButtonText: {
    color: Colors.error,
    fontSize: 16,
    fontWeight: "bold",
    borderColor: Colors.error,
    borderWidth: 1,
    flex: 1,
  },
  listText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.gray600,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 14,
  },
});
