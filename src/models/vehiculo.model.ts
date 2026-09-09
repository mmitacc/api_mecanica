import { prisma } from "../config/prisma";

export interface RegistrarVehiculo {
  placa: string;
  marca: string;
  modelo: string;
  idCliente: number;
}

export const VehiculoModel = {
  getAll: async () => {
    return await prisma.vehiculo.findMany({
      include: {
        clientes: true,
      },
    });
  },

  getById: async (id: number) => {
    return await prisma.vehiculo.findUnique({
      where: { id },
      include: {
        clientes: true,
      },
    });
  },

  crear: async (data: RegistrarVehiculo) => {
    return await prisma.vehiculo.create({
      data,
      include: {
        clientes: true,
      },
    });
  },
  actualizar: async (id: number, data: RegistrarVehiculo) => {
    return await prisma.vehiculo.update({
      where: { id },
      data,
      include: {
        clientes: true,
      },
    });
  },
};
