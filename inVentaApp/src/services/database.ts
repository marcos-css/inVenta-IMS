import * as SQLite from "expo-sqlite";

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
