import { prisma } from "../config/prisma";
import { EstadoOrden } from "../../generated/prisma/enums";

export interface RegistrarOrden {
    descripcion: string;
    id_usuario: number;
    id_vehiculo: number;
}

export interface UpdateOrden {
    costo_mecanico: number;
    estado: EstadoOrden;
    total: number;
}
export const OrdenModel = {
  getAll: async () => {
    return await prisma.ordenServicio.findMany();
  },
  crear: async (data: RegistrarOrden) => {
    return await prisma.ordenServicio.create({
      data,
    });
  },
  update: async (data: UpdateOrden, id: number) => {
    return await prisma.ordenServicio.update({
      where: {
        id,
      },
      data,
    });
  },
};