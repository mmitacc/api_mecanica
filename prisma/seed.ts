import { prisma } from "../src/config/prisma";
import { Role, EstadoServicio } from "../generated/prisma/enums";
import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando la siembra de datos (Seed)...");

  // 1. Limpiar la base de datos para evitar duplicados (Opcional pero recomendado)
  // El orden de borrado importa debido a las restricciones de integridad relacional
  await prisma.detalleServicio.deleteMany();
  await prisma.ordenServicio.deleteMany();
  await prisma.vehiculo.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.repuesto.deleteMany();

  // 2. Insertar Usuarios (Exactamente 5)
  const hashComun = await bcrypt.hash("123456", 10);
  await prisma.usuario.createMany({
    data: [
      {
        id: 1,
        nombres: "Manu",
        apellidos: "Manu",
        email: "manu@taller.com",
        password: hashComun,
        role: Role.DUEÑO,
      },
      {
        id: 2,
        nombres: "Benjamin",
        apellidos: "Benjamin",
        email: "benjamin@taller.com",
        password: hashComun,
        role: Role.MECANICO,
      },
      {
        id: 3,
        nombres: "Daniel",
        apellidos: "Daniel",
        email: "daniel@taller.com",
        password: hashComun,
        role: Role.MECANICO,
      },
      {
        id: 4,
        nombres: "Jarold",
        apellidos: "Jarold",
        email: "sergio.mecanico@taller.com",
        password: hashComun,
        role: Role.MECANICO,
      },
      {
        id: 5,
        nombres: "Pamela",
        apellidos: "Pamela",
        email: "pamela@taller.com",
        password: hashComun,
        role: Role.RECEPCIONISTA,
      },
    ],
  });

  // 3. Insertar Clientes
  await prisma.cliente.createMany({
    data: [
      {
        id: 1,
        nombres: "Carlos",
        apellidos: "Mendoza",
        email: "carlos.mendoza@email.com",
      },
      {
        id: 2,
        nombres: "Ana",
        apellidos: "Gomez",
        email: "ana.gomez@email.com",
      },
      {
        id: 3,
        nombres: "Luis",
        apellidos: "Rodriguez",
        email: "luis.rod@email.com",
      },
      {
        id: 4,
        nombres: "Maria",
        apellidos: "Fernandez",
        email: "maria.fer@email.com",
      },
      {
        id: 5,
        nombres: "Jorge",
        apellidos: "Martinez",
        email: "jorge.mar@email.com",
      },
      {
        id: 6,
        nombres: "Lucia",
        apellidos: "Sanchez",
        email: "lucia.san@email.com",
      },
    ],
  });

  // 4. Insertar Vehículos
  await prisma.vehiculo.createMany({
    data: [
      {
        id: 1,
        placa: "ABC-123",
        marca: "Toyota",
        modelo: "Corolla",
        idCliente: 1,
      },
      {
        id: 2,
        placa: "DEF-456",
        marca: "Hyundai",
        modelo: "Tucson",
        idCliente: 2,
      },
      { id: 3, placa: "GHI-789", marca: "Kia", modelo: "Rio", idCliente: 3 },
      {
        id: 4,
        placa: "JKL-101",
        marca: "Nissan",
        modelo: "Sentra",
        idCliente: 4,
      },
      {
        id: 5,
        placa: "MNO-202",
        marca: "Chevrolet",
        modelo: "Onix",
        idCliente: 5,
      },
      {
        id: 6,
        placa: "PQR-303",
        marca: "Volkswagen",
        modelo: "Gol",
        idCliente: 6,
      },
    ],
  });

  // 5. Insertar Repuestos
  await prisma.repuesto.createMany({
    data: [
      {
        id: 1,
        nombre: "Pastillas de Freno Delanteras",
        precio_unid: 45.0,
        stock: 30,
      },
      {
        id: 2,
        nombre: "Filtro de Aceite Sintético",
        precio_unid: 15.5,
        stock: 50,
      },
      { id: 3, nombre: "Filtro de Aire Motor", precio_unid: 18.0, stock: 40 },
      { id: 4, nombre: "Bujía de Iridio", precio_unid: 12.0, stock: 100 },
      { id: 5, nombre: "Amortiguador Delantero", precio_unid: 85.0, stock: 12 },
      { id: 6, nombre: "Batería 12V 60Ah", precio_unid: 110.0, stock: 15 },
    ],
  });

  // 6. Insertar Órdenes de Servicio (Exactamente 10)
  // Nota: idUsuario solo apunta a los IDs 2, 3 y 4 (Mecánicos).
  // Mecánico 2 tiene 4 órdenes, Mecánico 3 tiene 3 órdenes, Mecánico 4 tiene 3 órdenes.
  await prisma.ordenServicio.createMany({
    data: [
      {
        id: 1,
        descripcion: "Cambio de pastillas de freno",
        costomecanico: 30.0,
        estado: EstadoServicio.LISTO,
        total: 120.0,
        idUsuario: 2,
        idVehiculo: 1,
      },
      {
        id: 2,
        descripcion: "Mantenimiento preventivo 10k",
        costomecanico: 50.0,
        estado: EstadoServicio.EN_REPARACION,
        total: 113.5,
        idUsuario: 2,
        idVehiculo: 2,
      },
      {
        id: 3,
        descripcion: "Cambio de bujías y limpieza",
        costomecanico: 40.0,
        estado: EstadoServicio.RECEPCIONADO,
        total: 88.0,
        idUsuario: 2,
        idVehiculo: 3,
      },
      {
        id: 4,
        descripcion: "Revisión sistema eléctrico",
        costomecanico: 25.0,
        estado: EstadoServicio.LISTO,
        total: 135.0,
        idUsuario: 2,
        idVehiculo: 4,
      },

      {
        id: 5,
        descripcion: "Reemplazo de amortiguadores",
        costomecanico: 60.0,
        estado: EstadoServicio.EN_REPARACION,
        total: 230.0,
        idUsuario: 3,
        idVehiculo: 5,
      },
      {
        id: 6,
        descripcion: "Instalación de batería nueva",
        costomecanico: 20.0,
        estado: EstadoServicio.LISTO,
        total: 130.0,
        idUsuario: 3,
        idVehiculo: 6,
      },
      {
        id: 7,
        descripcion: "Afinamiento completo de motor",
        costomecanico: 80.0,
        estado: EstadoServicio.RECEPCIONADO,
        total: 190.0,
        idUsuario: 3,
        idVehiculo: 1,
      },

      {
        id: 8,
        descripcion: "Cambio de filtros y fluidos",
        costomecanico: 35.0,
        estado: EstadoServicio.EN_REPARACION,
        total: 68.5,
        idUsuario: 4,
        idVehiculo: 2,
      },
      {
        id: 9,
        descripcion: "Cambio de pastillas traseras",
        costomecanico: 30.0,
        estado: EstadoServicio.LISTO,
        total: 120.0,
        idUsuario: 4,
        idVehiculo: 3,
      },
      {
        id: 10,
        descripcion: "Reemplazo amortiguador trasero",
        costomecanico: 55.0,
        estado: EstadoServicio.RECEPCIONADO,
        total: 225.0,
        idUsuario: 4,
        idVehiculo: 5,
      },
    ],
  });

  // 7. Insertar Detalles de Servicio (Exactamente 20 registros)
  // Se mantiene estrictamente en el rango del 1 al 10 sobre OrdenServicio
  await prisma.detalleServicio.createMany({
    data: [
      { id: 1, cantidad: 2, subTotal: 90.0, idOrdenServicio: 1, idRepuesto: 1 },
      { id: 2, cantidad: 1, subTotal: 15.5, idOrdenServicio: 2, idRepuesto: 2 },
      { id: 3, cantidad: 1, subTotal: 18.0, idOrdenServicio: 2, idRepuesto: 3 },
      { id: 4, cantidad: 4, subTotal: 48.0, idOrdenServicio: 3, idRepuesto: 4 },
      {
        id: 5,
        cantidad: 1,
        subTotal: 110.0,
        idOrdenServicio: 4,
        idRepuesto: 6,
      },
      {
        id: 6,
        cantidad: 2,
        subTotal: 170.0,
        idOrdenServicio: 5,
        idRepuesto: 5,
      },
      {
        id: 7,
        cantidad: 1,
        subTotal: 110.0,
        idOrdenServicio: 6,
        idRepuesto: 6,
      },
      { id: 8, cantidad: 4, subTotal: 48.0, idOrdenServicio: 7, idRepuesto: 4 },
      { id: 9, cantidad: 1, subTotal: 15.5, idOrdenServicio: 7, idRepuesto: 2 },
      {
        id: 10,
        cantidad: 1,
        subTotal: 18.0,
        idOrdenServicio: 7,
        idRepuesto: 3,
      },
      {
        id: 11,
        cantidad: 1,
        subTotal: 15.5,
        idOrdenServicio: 8,
        idRepuesto: 2,
      },
      {
        id: 12,
        cantidad: 1,
        subTotal: 18.0,
        idOrdenServicio: 8,
        idRepuesto: 3,
      },
      {
        id: 13,
        cantidad: 2,
        subTotal: 90.0,
        idOrdenServicio: 9,
        idRepuesto: 1,
      },
      {
        id: 14,
        cantidad: 2,
        subTotal: 170.0,
        idOrdenServicio: 10,
        idRepuesto: 5,
      },
      {
        id: 15,
        cantidad: 1,
        subTotal: 45.0,
        idOrdenServicio: 1,
        idRepuesto: 1,
      },
      {
        id: 16,
        cantidad: 1,
        subTotal: 15.5,
        idOrdenServicio: 3,
        idRepuesto: 2,
      },
      {
        id: 17,
        cantidad: 1,
        subTotal: 18.0,
        idOrdenServicio: 4,
        idRepuesto: 3,
      },
      {
        id: 18,
        cantidad: 2,
        subTotal: 24.0,
        idOrdenServicio: 5,
        idRepuesto: 4,
      },
      {
        id: 19,
        cantidad: 1,
        subTotal: 15.5,
        idOrdenServicio: 6,
        idRepuesto: 2,
      },
      {
        id: 20,
        cantidad: 1,
        subTotal: 18.0,
        idOrdenServicio: 9,
        idRepuesto: 3,
      },
    ],
  });

  console.log("✅ Base de datos sembrada con éxito.");
}

main()
  .catch((error) => {
    console.error("❌ Error ejecutando el seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
