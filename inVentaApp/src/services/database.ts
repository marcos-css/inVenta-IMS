import * as SQLite from "expo-sqlite";
import { Categoria, Producto } from "../types";

export async function getDatabaseConnection() {
  return await SQLite.openDatabaseAsync("inventa.db");
}

export async function inicializarBaseDeDatos() {
  const db = await getDatabaseConnection();

  try {
    await db.execAsync("PRAGMA foreign_keys = ON;");

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS categorias (
            id TEXT PRIMARY KEY NOT NULL,
            nombre TEXT NOT NULL,
            estadoActivo INTEGER NOT NULL DEFAULT 1,
            sincronizado INTEGER NOT NULL DEFAULT 0,
            fechaActualizacion TEXT NOT NULL
        );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS productos (
            id TEXT PRIMARY KEY NOT NULL,
            nombre TEXT NOT NULL,
            marca TEXT,
            precio REAL NOT NULL,
            categoriaId TEXT NOT NULL,
            estadoActivo INTEGER NOT NULL DEFAULT 1,
            sincronizado INTEGER NOT NULL DEFAULT 0,
            fechaActualizacion TEXT NOT NULL,
            FOREIGN KEY (categoriaId) REFERENCES categorias (id) ON DELETE RESTRICT
        );
    `);

    console.log("Base de datos SQLite inicializada correctamente");
  } catch (error) {
    console.error("Error al inicializar la base de datos local:", error);
    throw error;
  }
}

export async function obtenerProductosLocales(): Promise<Producto[]> {
  const db = await getDatabaseConnection();

  try {
    const productos = await db.getAllAsync<Producto>(
      "SELECT * FROM productos WHERE estadoActivo = 1;",
    );
    return productos;
  } catch (error) {
    console.log("Error al obtener productos: ", error);
    return [];
  }
}

export async function insertarProducto() {
  const db = await getDatabaseConnection();
  const randomID = Math.random().toString(36).substring(7);

  try {
    await db.runAsync(
      `INSERT INTO productos(id, nombre, marca, precio, categoriaId, estadoActivo, sincronizado, fechaActualizacion)
      VALUES(?,?,?,?,?,?,?,?)`,
      [
        randomID,
        `Producto ${randomID}`,
        "Marca Genérica",
        Math.floor(Math.random() * 500) + 50,
        "cat-1",
        1,
        0,
        new Date().toISOString(),
      ],
    );
    console.log("Producto ingresado correctamente");
  } catch (error) {
    console.error("Error al insertar: ", error);
    throw error;
  }
}

export async function insertarCategorias(nombre: string) {
  const db = await getDatabaseConnection();
  const id = Math.random().toString(36).substring(7); // id temporal

  try {
    await db.runAsync(
      `INSERT INTO categorias(id, nombre, estadoActivo, sincronizado, fechaActualizacion)
      VALUES(?,?,?,?,?)`,
      [id, nombre, 1, 0, new Date().toISOString()],
    );
    console.log(`Categoría ${nombre} guardada en SQLite`);
  } catch (error) {
    console.error("Error al insertar categoría:", error);
    throw error;
  }
}

export async function obtenerCategorias(): Promise<Categoria[]> {
  const db = await getDatabaseConnection();
  try {
    const categorias = await db.getAllAsync<Categoria>(
      "SELECT * FROM categorias WHERE estadoActivo = 1;",
    );
    return categorias;
  } catch (error) {
    console.log("Error al obtener categorias: ", error);
    return [];
  }
}
export async function eliminarCategoria(id: string) {
  const db = await getDatabaseConnection();

  try {
    await db.runAsync(
      "UPDATE categorias SET estadoActivo = 0, sincronizado = 0, fechaActualizacion = ? WHERE id = ?;",
      [new Date().toISOString(), id],
    );
    console.log(`Categoría marcada como inactiva`);
  } catch (error) {
    console.error("No se pudo eliminar la categoría", error);
    throw error;
  }
}
