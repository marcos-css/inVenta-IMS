import { StyleSheet, Text, View } from "react-native";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import React, { useEffect, useState } from "react";

export const CategoriaForm = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const isValid = inputValue.trim().length >= 3;
  const [error, setError] = useState<string>("");

  const handleGuardar = () => {
    if (!isValid) {
      setError(
        "Error, el nombre de la categoría debe tener al menos 3 caracteres",
      );
      return;
    } else {
      setError("");
    }
    console.log("Guardando categoria: ", inputValue);
  };

  const handleTextChange = (texto: string) => {
    const textoNormalizado = texto.toUpperCase();
    setInputValue(textoNormalizado);

    if (error && textoNormalizado.trim().length >= 3) setError("");
  };

  return (
    <View style={styles.container}>
      <Input
        label="Ingresa el nombre de la categoria"
        placeholder="Ejemplo: Bebidas"
        value={inputValue}
        onChangeText={handleTextChange}
        error={error}
      />
      <Button text="Guardar" onPress={handleGuardar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
});
