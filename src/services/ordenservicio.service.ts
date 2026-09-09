import { prisma } from "../config/prisma";
import { Prisma } from "../../generated/prisma/client";


export async function getReporte(
    minFecha: any,
    maxFecha: any,
) {
    const where: Prisma.OrdenServicioWhereInput = {
        fechacreacion: {
            gte: new Date(minFecha),
            lte: new Date(maxFecha),
        },
        estado: {
            equals: "LISTO",
        },
    };

    const [ordenes, totales] = await Promise.all([
        prisma.ordenServicio.findMany({
            where,
        }),

        prisma.ordenServicio.aggregate({
            where,
            _sum: {
                total: true,
                costomecanico: true,
            },
        }),
    ]);

    return {
        ordenes,
        totalGeneral: totales._sum.total ?? 0,
        totalCostoMecanico: totales._sum.costomecanico ?? 0,
    };
}