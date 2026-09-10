import { prisma } from "../config/prisma";
import { EstadoServicio } from "../../generated/prisma/enums";

export interface RegistrarOrden {
    descripcion: string;
    idUsuario: number;
    idVehiculo: number;
}

export interface UpdateOrden {
    costomecanico: number;
    estado: EstadoServicio;
    total: number;
    fechacreacion: Date;
}
export const OrdenModel = {
  getAll: async () => {
    return await prisma.ordenServicio.findMany();
  },
  crear: async (data: RegistrarOrden) => {
    return await prisma.ordenServicio.create(
      {data},
    );
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