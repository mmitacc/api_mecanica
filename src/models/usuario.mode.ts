import { prisma } from "../config/prisma";
import type {
  RegistrarUsuario,
  UpdateUsuario,
} from "../schemas/usuario.schema";

export const UsuarioModel = {
  getAll: async () => {
    return await prisma.usuario.findMany({ omit: { password: true } });
  },
  create: async (data: RegistrarUsuario) => {
    return await prisma.usuario.create({ data, omit: { password: true } });
  },
  findId: async (id: number) => {
    return await prisma.usuario.findUnique({
      where: { id },
      omit: { password: true },
    });
  },
  findEmail: async (email: string) => {
    return await prisma.usuario.findUnique({ where: { email } });
  },
  getMecanicoOrden: async (id: number) => {
    return await prisma.usuario.findUnique({
      where: { id, role: "MECANICO" },
      include: { orden_servicios: true },
      omit: { password: true },
    });
  },
  update: async (id: number, data: UpdateUsuario) => {
    return await prisma.usuario.update({
      where: { id },
      data,
      omit: {
        password: true,
      },
    });
  },
  updatePassword: async (id: number, passwordHash: string) => {
    return await prisma.usuario.update({
      where: { id },
      data: { password: passwordHash },
    });
  },
  delete: async (id: number) => {
    return await prisma.usuario.delete({ where: { id } });
  },
};
