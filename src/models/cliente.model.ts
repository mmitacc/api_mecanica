import { prisma } from "../config/prisma";

export interface RegistrarCliente {
  nombres: string;
  apellidos: string;
  email: string;
}

export const ClienteModel = {
  getAll: async () => {
    return await prisma.cliente.findMany();
  },

  getById: async (id: number) => {
    return await prisma.cliente.findUnique({
      where: { id },
    });
  },

  crear: async (data: RegistrarCliente) => {
    return await prisma.cliente.create({
      data,
    });
  },

  actualizar: async (id: number, data: RegistrarCliente) => {
    return await prisma.cliente.update({
      where: { id },
      data,
    });
  },
};
