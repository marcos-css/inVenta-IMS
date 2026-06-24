import type { Producto } from "../types";

export const PRODUCTOS_MOCK: Producto[] = [
  {
    id: "1",
    nombre: "Cinta Adhesiva Transparente",
    marca: "Truper",
    precio: 25.5,
    categoriaId: "cat-1",
    estadoActivo: true,
    sincronizado: false,
    fechaActualizacion: new Date().toISOString(),
  },
  {
    id: "2",
    nombre: "Pegamento Blanco 850g",
    marca: "Resistol",
    precio: 110.0,
    categoriaId: "cat-2",
    estadoActivo: true,
    sincronizado: false,
    fechaActualizacion: new Date().toISOString(),
  },
  {
    id: "3",
    nombre: "Clavos estándar 2 pulgadas",
    marca: "Truper",
    precio: 45.0,
    categoriaId: "cat-1",
    estadoActivo: true,
    sincronizado: false,
    fechaActualizacion: new Date().toISOString(),
  },
];
