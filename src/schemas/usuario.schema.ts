import { Role } from "../../generated/prisma/enums";
import z from "zod/v4";

export const UsuarioSchema = z.object({
  id: z.coerce.number("Registrarlo como número entero, es obligatorio.").int(),
  nombres: z
    .string()
    .min(2, "Registrar con mínimo de 2 caracteres, es obligatorio.")
    .trim()
    .max(100),
  apellidos: z
    .string()
    .min(2, "Registrar con mínimo de 2 caracteres, es obligatorio.")
    .trim()
    .max(100),
  email: z
    .email("Registrar con un formato de correo válido, es obligatorio.")
    .trim(),
  password: z
    .string()
    .min(6, "Registrar con mínimo 6 caracteres, es obligatorio.")
    .trim()
    .regex(
      /[A-Z]/,
      "Registrar con al menos una letra Mayúscula, es obligatorio.",
    )
    .regex(
      /[a-z]/,
      "Registrar con al menos una letra Minúscula, es obligatorio.",
    )
    .regex(/[0-9]/, "Registrar con al menos una número, es obligatorio.")
    // .regex(
    //   /[@#$%¿?¡!&*/+-]/,
    //   "Registrar con al menos un caracter especial (@#$%¿?¡!&*/+-), es obligatorio.",
    // )
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
