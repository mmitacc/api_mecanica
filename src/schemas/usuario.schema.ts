import { Role } from "../../generated/prisma/enums";

export interface RegistrarUsuario {
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  role: Role;
}

export type UpdateUsuario = Partial<RegistrarUsuario>;
