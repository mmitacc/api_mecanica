import z from "zod";

export const crearVehiculoSchema = z.object({
  placa: z.string().trim().min(1, "La placa es obligatoria"),

  marca: z.string().trim().min(2, "La marca debe tener al menos 2 caracteres"),

  modelo: z.string().trim().min(1, "El modelo es obligatorio"),

  idCliente: z
    .number()
    .int("El idCliente debe ser un número entero")
    .positive("El idCliente debe ser mayor que 0"),
});

export const actualizarVehiculoSchema = z.object({
  placa: z.string().trim().min(1, "La placa es obligatoria"),

  marca: z.string().trim().min(2, "La marca debe tener al menos 2 caracteres"),

  modelo: z.string().trim().min(1, "El modelo es obligatorio"),

  idCliente: z
    .number()
    .int("El idCliente debe ser un número entero")
    .positive("El idCliente debe ser mayor que 0"),
});
