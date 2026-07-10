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
import React, { useState } from "react";
import { Categoria } from "../../types";
import { Colors } from "../../constants/colors";
import Checkbox from "expo-checkbox";
import { useCategorias } from "../../hooks/useCategorias";

export function CategoriaForm() {
  const {
    categorias,
    isEdit,
    setIsEdit,
    selectedIds,
    setSelectedIds,
    guardarCategoria,
    borrarCategoria,
    borrarCategoriasBulk,
    handleToggle,
  } = useCategorias();

  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const isValid = inputValue.trim().length >= 3;

  const handleTextChange = (texto: string) => {
    const textoNormalizado = texto.toUpperCase();
    setInputValue(textoNormalizado);
    if (error && textoNormalizado.trim().length >= 3) setError("");
  };

  const handleGuardar = async () => {
    if (!isValid) return setError("El nombre debe tener al menos 3 caracteres");

    if (
      categorias.some(
        (cat) => cat.nombre.toUpperCase() === inputValue.trim().toUpperCase(),
      )
    )
      return setError("Esta categoría ya existe.");

    setError("");
    try {
      await guardarCategoria(inputValue);
      setInputValue("");
    } catch (error) {
      console.error("Error al guardar categoría:", error);
      Alert.alert("Error", "No se pudo guardar la categoría.");
    }
  };

  const handleEliminar = async (id: string, nombre: string) => {
    Alert.alert(
      "Eliminar categoría",
      `¿Está seguro de eliminar la categoría "${nombre}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await borrarCategoria(id);
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la categoría.");
            }
          },
        },
      ],
    );
  };

  const handleEliminarSeleccionados = async (ids: string[]) => {
    const s = ids.length > 1 ? "s" : "";
    Alert.alert(
      "Eliminar categorías",
      `¿Está seguro de eliminar ${ids.length} categoría${s}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await borrarCategoriasBulk(ids);
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar las categorías.");
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
        onLongPress={() => {
          setIsEdit(true);
          setSelectedIds((prev) =>
            prev.includes(item.id) ? prev : [...prev, item.id],
          );
        }}
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
              handleEliminar(item.id, item.nombre);
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
        <Button
          text={`Eliminar ${selectedIds.length} categoría${selectedIds.length === 1 ? "" : "s"}`}
          onPress={() => handleEliminarSeleccionados(selectedIds)}
          variant="danger"
          style={[
            styles.deleteAllButton,
            selectedIds.length ? { display: "flex" } : { display: "none" },
          ]}
        />
      </View>
    </View>
  );
}

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
  deleteAllButton: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    height: 55,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },
  listContent: {
    paddingBottom: 150,
  },
  itemContainer: {
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    gap: 10,
    height: 55,
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
    height: "100%",
    textAlignVertical: "center",
    paddingHorizontal: 10,
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
