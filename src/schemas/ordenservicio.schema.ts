import z from "zod";
import { EstadoServicio } from "../../generated/prisma/enums";
export const createOrdenSchema = z.object({
    descripcion: z.string(),
    idUsuario: z.number(),
    idVehiculo: z.number()
});

export const UpdateOrdenSchema = z.object({
    costomecanico: z.number(),
    estado: z.enum(EstadoServicio),
    total: z.number()
});
