import * as z from "zod"

export const creardetalleschema = z.object({
    cantidad: z
    .number({message: "la cantidad tiene que ser un numero"})
    .int({message: "la cantidad tiene que ser un numero entero"})
    .positive({message: "la cantidad tiene que ser un numero positivo "}),
    idOrdenServicio: z
    .number({message: "la cantidad tiene que ser un numero"})
    .int({message: "la cantidad tiene que ser un numero entero"})
    .positive({message: "la cantidad tiene que ser un numero positivo "}),
    idRepuesto: z
    .number({message: "la cantidad tiene que ser un numero"})
    .int({message: "la cantidad tiene que ser un numero entero"})
    .positive({message: "la cantidad tiene que ser un numero positivo "}),

})
export const updatedetalleschema = z.object({
    cantidad: z
    .number({message: "la cantidad tiene que ser un numero"})
    .int({message: "la cantidad tiene que ser un numero entero"})
    .positive({message: "la cantidad tiene que ser un numero positivo "}),

})