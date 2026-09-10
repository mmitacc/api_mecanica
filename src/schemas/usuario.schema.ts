import { Role } from "../../generated/prisma/enums";
import z from "zod/v4";

export const UsuarioSchema = z.object({
  id: z.int("Registrar el ID como número entero, es obligatorio."),
  nombres: z
    .string()
    .min(1, "Registrar los nombres, es obligatorio.")
    .trim()
    .max(100),
  apellidos: z
    .string()
    .min(1, "Registrar los apellidos, es obligatorio.")
    .trim()
    .max(100),
  email: z
    .email("Registrar un formato de correo válido, es obligatorio.")
    .trim(),
  password: z
    .string()
    .min(6, "Registrar el password al menos con 6 caracteres, es obligatorio.")
    .trim()
    .regex(
      /[A-Z]/,
      "Registrar el password con al menos una letra Mayúscula, es obligatorio.",
    )
    .regex(
      /[a-z]/,
      "Registrar el password con al menos una letra Minúscula, es obligatorio.",
    )
    .regex(
      /[0-9]/,
      "Registrar el password con al menos una número, es obligatorio.",
    )
    .regex(
      /[@#$%¿?¡!&*/+-]/,
      "Registrar el password con al menos un caracter especial (@#$%¿?¡!&*/+-), es obligatorio.",
    )
    .max(100)
    .max(50),
  role: z.enum(
    Role,
    "Registrar el role correcto (MECANICO, RECEPCIONISTA, DUEÑO), es obligatorio.",
  ),
});

export const CreateUsuarioSchema = UsuarioSchema.omit({ id: true });

export const UpdateUsuarioSchema = UsuarioSchema.omit({
  id: true,
  password: true,
}).partial();

export const IdUsuarioSchema = UsuarioSchema.pick({ id: true });

export const AuthUsuarioSchema = UsuarioSchema.pick({
  email: true,
  password: true,
});

export type RegistrarUsuario = z.infer<typeof CreateUsuarioSchema>;

export type UpdateUsuario = Partial<RegistrarUsuario>;
