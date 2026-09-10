import { prisma } from "../config/prisma";

export interface RegistrarRepuesto {
  nombre: string;
  precio_unid: number;
  stock: number;
}

export interface ActualizarRepuesto {
  nombre?: string;
  precio_unid?: number;
  stock?: number;
}

export const RepuestoModel = {
  getAll: async () => {
    return await prisma.repuesto.findMany({
      orderBy: {
        id: "asc",
      },
    });
  },

  getById: async (id: number) => {
    return await prisma.repuesto.findUnique({
      where: { id },
    });
  },

  crear: async (data: RegistrarRepuesto) => {
    return await prisma.repuesto.create({
      data,
    });
  },

  actualizar: async (id: number, data: ActualizarRepuesto) => {
    return await prisma.repuesto.update({
      where: { id },
      data,
    });
  },

  eliminar: async (id: number) => {
    return await prisma.repuesto.delete({
      where: { id },
    });
  },
};
