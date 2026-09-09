import { prisma } from "../config/prisma";
import { Role } from "../../generated/prisma/enums";

export interface RegistrarUsuario {
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  role: Role;
}

export const UsuarioModel = {
  getAll: async () => {
    return await prisma.usuario.findMany();
  },
  crear: async (data: RegistrarUsuario) => {
    return await prisma.usuario.create({
      data,
      omit: {
        password: true,
      },
    });
  },
};
