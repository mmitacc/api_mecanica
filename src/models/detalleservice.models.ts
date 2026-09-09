import {prisma} from "../config/prisma";

export const detallesModels = {
    findall: async () => {
        return await prisma.detalleServicio.findMany({
            include:{
                repuestos: true
            }
        })
        
    },
    creardetalle: async (cantidad:number, idOrdenServicio:number, idRepuesto: number) => {
        return  await prisma.$transaction(async(tx) => {
            const repuesto = await tx.repuesto.findUnique({
                where:{ id:idRepuesto}
            })
            if(!repuesto)throw new Error("Repuesto no encontrado")
                const repuestonumber = repuesto.precio_unid.toNumber()
            const subTotal = cantidad * repuestonumber

            return await tx.detalleServicio.create({
                data: {
                    cantidad,
                    idOrdenServicio,
                    idRepuesto
                }
            })
        })
    },
    updatedetalle: async(id_detalle:number, cantidad:number) => {
        return await prisma.$transaction(async(tx) => {
            const detalle = await tx.detalleServicio.findUnique({
                where:{ id: id_detalle}
            })
            if(!detalle) throw new Error("Detalle no encontrado")

            const preciounitariohistorico = detalle.subTotal.toNumber() / detalle.cantidad
            const nuevoTotal = cantidad * preciounitariohistorico

            return await tx.detalleServicio.update({
                where:{id: id_detalle},
                data:{
                    cantidad:cantidad,
                    subTotal: nuevoTotal
                }
            })
        })
    },
    deletedetalle: async(id_detalle:number) => {
        return await prisma.detalleServicio.delete({
            where:{id: id_detalle}
        })
    }
}