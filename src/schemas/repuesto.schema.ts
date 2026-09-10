import { z } from "zod";

export const repuestoSchema = z.object({
    nombre: z.string().trim().min(1, "el nombre no puede estar vacío")
    .max(50, "el nombre no puede superar los 50 caracteres"),
    precio_unid: z.number({
        error: "el precio debe ser un número"
    })
    .min(0, "El precio no puede ser negativo"),
    stock: z.number({
        error: "El stock debe ser un número",
    })
    .int("El stock debe ser un numero entero")
    .min(0, "El stock no puede ser un numero negativo"),
});

export const repuestoUpdateSchema = repuestoSchema
.partial()
.refine((data)=>
    data.nombre !== undefined ||
data.precio_unid !== undefined ||
data.stock !== undefined,
{
    message: "Debe enviarse al menos un dato par actualizar",
}
);

export const repuestoIdSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un número positivo"),
});
