// src/hooks/useProductos.ts
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { Producto } from "../types";
import {
  obtenerProductosLocales,
  insertarProducto,
} from "../services/database";

export function useProductos() {
  const db = useSQLiteContext();
  const [productos, setProductos] = useState<Producto[]>([]);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductosLocales(db);
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos locales:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarProductos();
    }, []),
  );

  const agregarProductoPrueba = async () => {
    try {
      await insertarProducto(db);
      await cargarProductos();
    } catch (error) {
      console.error("Error al insertar producto de prueba:", error);
    }
  };

  return {
    productos,
    cargarProductos,
    agregarProductoPrueba,
  };
}
