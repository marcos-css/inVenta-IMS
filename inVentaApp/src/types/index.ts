export interface Categoria{
    id: string;
    nombre: string;
    estadoActivo: boolean;
    sincronizado: boolean;
    fechaActualizacion: string;
}

export interface Producto{
    id: string;
    nombre: string;
    marca: string;
    precio: number;
    categoriaId: string;
    estadoActivo: boolean;
    sincronizado: boolean;
    fechaActualizacion: string;
    //propiedad de navegacion opcional para mostrar el nombre de la categoria en lugar del id
    categoria?: Categoria;

}