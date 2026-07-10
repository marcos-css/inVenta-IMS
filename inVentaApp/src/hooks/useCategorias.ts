import { useCallback, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import {
  eliminarCategoria,
  eliminarCategoriasEnMasa,
  insertarCategorias,
  obtenerCategorias,
} from "../services/database";
import { Categoria } from "../types/index";

export function useCategorias() {
  const db = useSQLiteContext();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    if (!isEdit) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const cargarCategorias = useCallback(async () => {
    const datos = await obtenerCategorias(db);
    setCategorias(datos);
  }, [db]);

  useEffect(() => {
    cargarCategorias();
  }, [cargarCategorias]);

  const guardarCategoria = async (nombre: string) => {
    await insertarCategorias(db, nombre);
    await cargarCategorias();
  };

  const borrarCategoria = async (id: string) => {
    await eliminarCategoria(db, id);
    setCategorias((prev) => prev.filter((cat) => cat.id !== id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const borrarCategoriasBulk = async (ids: string[]) => {
    await eliminarCategoriasEnMasa(db, ids);
    setCategorias((prev) => prev.filter((cat) => !ids.includes(cat.id)));
    setSelectedIds([]);
    setIsEdit(false);
  };

  return {
    categorias,
    isEdit,
    setIsEdit,
    selectedIds,
    setSelectedIds,
    guardarCategoria,
    borrarCategoria,
    borrarCategoriasBulk,
    handleToggle,
  };
}
