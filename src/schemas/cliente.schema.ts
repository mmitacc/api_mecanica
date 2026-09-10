import z from "zod";

export const crearClienteSchema = z.object({
  nombres: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres"),

  apellidos: z
    .string()
    .trim()
    .min(2, "Los apellidos deben tener al menos 2 caracteres"),

  email: z.email("El email no tiene un formato válido").trim(),
});

export const actualizarClienteSchema = z.object({
  nombres: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres"),

  apellidos: z
    .string()
    .trim()
    .min(2, "Los apellidos deben tener al menos 2 caracteres"),

  email: z.email("El email no tiene un formato válido").trim(),
});
