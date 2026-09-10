import { prisma } from "../src/config/prisma";
import { Role, EstadoServicio } from "../generated/prisma/enums";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Iniciando la siembra de datos (Seed)...");

  // Limpieza de la base de datos
  await prisma.detalleServicio.deleteMany();
  await prisma.ordenServicio.deleteMany();
  await prisma.vehiculo.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.repuesto.deleteMany();

  // Usuarios
  const hashComun = await bcrypt.hash("123456", 10);

  const manu = await prisma.usuario.create({
    data: {
      nombres: "Manu",
      apellidos: "Manu",
      email: "manu@taller.com",
      password: hashComun,
      role: Role.DUEÑO,
    },
  });

  const benjamin = await prisma.usuario.create({
    data: {
      nombres: "Benjamin",
      apellidos: "Benjamin",
      email: "benjamin@taller.com",
      password: hashComun,
      role: Role.MECANICO,
    },
  });

  const daniel = await prisma.usuario.create({
    data: {
      nombres: "Daniel",
      apellidos: "Daniel",
      email: "daniel@taller.com",
      password: hashComun,
      role: Role.MECANICO,
    },
  });

  const jarold = await prisma.usuario.create({
    data: {
      nombres: "Jarold",
      apellidos: "Jarold",
      email: "sergio.mecanico@taller.com",
      password: hashComun,
      role: Role.MECANICO,
    },
  });

  const pamela = await prisma.usuario.create({
    data: {
      nombres: "Pamela",
      apellidos: "Pamela",
      email: "pamela@taller.com",
      password: hashComun,
      role: Role.RECEPCIONISTA,
    },
  });

  // Clientes

  const carlos = await prisma.cliente.create({
    data: {
      nombres: "Carlos",
      apellidos: "Mendoza",
      email: "carlos.mendoza@email.com",
    },
  });

  const ana = await prisma.cliente.create({
    data: {
      nombres: "Ana",
      apellidos: "Gomez",
      email: "ana.gomez@email.com",
    },
  });

  const luis = await prisma.cliente.create({
    data: {
      nombres: "Luis",
      apellidos: "Rodriguez",
      email: "luis.rod@email.com",
    },
  });

  const maria = await prisma.cliente.create({
    data: {
      nombres: "Maria",
      apellidos: "Fernandez",
      email: "maria.fer@email.com",
    },
  });

  const jorge = await prisma.cliente.create({
    data: {
      nombres: "Jorge",
      apellidos: "Martinez",
      email: "jorge.mar@email.com",
    },
  });

  const lucia = await prisma.cliente.create({
    data: {
      nombres: "Lucia",
      apellidos: "Sanchez",
      email: "lucia.san@email.com",
    },
  });

  // Vehículos

  const vehiculo1 = await prisma.vehiculo.create({
    data: {
      placa: "ABC-123",
      marca: "Toyota",
      modelo: "Corolla",
      idCliente: carlos.id,
    },
  });

  const vehiculo2 = await prisma.vehiculo.create({
    data: {
      placa: "DEF-456",
      marca: "Hyundai",
      modelo: "Tucson",
      idCliente: ana.id,
    },
  });

  const vehiculo3 = await prisma.vehiculo.create({
    data: {
      placa: "GHI-789",
      marca: "Kia",
      modelo: "Rio",
      idCliente: luis.id,
    },
  });

  const vehiculo4 = await prisma.vehiculo.create({
    data: {
      placa: "JKL-101",
      marca: "Nissan",
      modelo: "Sentra",
      idCliente: maria.id,
    },
  });

  const vehiculo5 = await prisma.vehiculo.create({
    data: {
      placa: "MNO-202",
      marca: "Chevrolet",
      modelo: "Onix",
      idCliente: jorge.id,
    },
  });

  const vehiculo6 = await prisma.vehiculo.create({
    data: {
      placa: "PQR-303",
      marca: "Volkswagen",
      modelo: "Gol",
      idCliente: lucia.id,
    },
  });

  // Repuestos

  const repuesto1 = await prisma.repuesto.create({
    data: {
      nombre: "Pastillas de Freno Delanteras",
      precio_unid: 45.0,
      stock: 30,
    },
  });

  const repuesto2 = await prisma.repuesto.create({
    data: {
      nombre: "Filtro de Aceite Sintético",
      precio_unid: 15.5,
      stock: 50,
    },
  });

  const repuesto3 = await prisma.repuesto.create({
    data: {
      nombre: "Filtro de Aire Motor",
      precio_unid: 18.0,
      stock: 40,
    },
  });

  const repuesto4 = await prisma.repuesto.create({
    data: {
      nombre: "Bujía de Iridio",
      precio_unid: 12.0,
      stock: 100,
    },
  });

  const repuesto5 = await prisma.repuesto.create({
    data: {
      nombre: "Amortiguador Delantero",
      precio_unid: 85.0,
      stock: 12,
    },
  });

  const repuesto6 = await prisma.repuesto.create({
    data: {
      nombre: "Batería 12V 60Ah",
      precio_unid: 110.0,
      stock: 15,
    },
  });

  // Órdenes de Servicio

  const orden1 = await prisma.ordenServicio.create({
    data: {
      descripcion: "Cambio de pastillas de freno",
      costomecanico: 30.0,
      estado: EstadoServicio.LISTO,
      total: 120.0,
      idUsuario: benjamin.id,
      idVehiculo: vehiculo1.id,
    },
  });

  const orden2 = await prisma.ordenServicio.create({
    data: {
      descripcion: "Mantenimiento preventivo 10k",
      costomecanico: 50.0,
      estado: EstadoServicio.EN_REPARACION,
      total: 113.5,
      idUsuario: benjamin.id,
      idVehiculo: vehiculo2.id,
    },
  });

  const orden3 = await prisma.ordenServicio.create({
    data: {
      descripcion: "Cambio de bujías y limpieza",
      costomecanico: 40.0,
      estado: EstadoServicio.RECEPCIONADO,
      total: 88.0,
      idUsuario: benjamin.id,
      idVehiculo: vehiculo3.id,
    },
  });

  const orden4 = await prisma.ordenServicio.create({
    data: {
      descripcion: "Revisión sistema eléctrico",
      costomecanico: 25.0,
      estado: EstadoServicio.LISTO,
      total: 135.0,
      idUsuario: benjamin.id,
      idVehiculo: vehiculo4.id,
    },
  });

  const orden5 = await prisma.ordenServicio.create({
    data: {
      descripcion: "Reemplazo de amortiguadores",
      costomecanico: 60.0,
      estado: EstadoServicio.EN_REPARACION,
      total: 230.0,
      idUsuario: daniel.id,
      idVehiculo: vehiculo5.id,
    },
  });

  const orden6 = await prisma.ordenServicio.create({
    data: {
      descripcion: "Instalación de batería nueva",
      costomecanico: 20.0,
      estado: EstadoServicio.LISTO,
      total: 130.0,
      idUsuario: daniel.id,
      idVehiculo: vehiculo6.id,
    },
  });

  const orden7 = await prisma.ordenServicio.create({
    data: {
      descripcion: "Afinamiento completo de motor",
      costomecanico: 80.0,
      estado: EstadoServicio.RECEPCIONADO,
      total: 190.0,
      idUsuario: daniel.id,
      idVehiculo: vehiculo1.id,
    },
  });

  const orden8 = await prisma.ordenServicio.create({
    data: {
      descripcion: "Cambio de filtros y fluidos",
      costomecanico: 35.0,
      estado: EstadoServicio.EN_REPARACION,
      total: 68.5,
      idUsuario: jarold.id,
      idVehiculo: vehiculo2.id,
    },
  });

  const orden9 = await prisma.ordenServicio.create({
    data: {
      descripcion: "Cambio de pastillas traseras",
      costomecanico: 30.0,
      estado: EstadoServicio.LISTO,
      total: 120.0,
      idUsuario: jarold.id,
      idVehiculo: vehiculo3.id,
    },
  });

  const orden10 = await prisma.ordenServicio.create({
    data: {
      descripcion: "Reemplazo amortiguador trasero",
      costomecanico: 55.0,
      estado: EstadoServicio.RECEPCIONADO,
      total: 225.0,
      idUsuario: jarold.id,
      idVehiculo: vehiculo5.id,
    },
  });

  // Detalles de Servicio

  await prisma.detalleServicio.createMany({
    data: [
      {
        cantidad: 2,
        subTotal: 90.0,
        idOrdenServicio: orden1.id,
        idRepuesto: repuesto1.id,
      },
      {
        cantidad: 1,
        subTotal: 15.5,
        idOrdenServicio: orden2.id,
        idRepuesto: repuesto2.id,
      },
      {
        cantidad: 1,
        subTotal: 18.0,
        idOrdenServicio: orden2.id,
        idRepuesto: repuesto3.id,
      },
      {
        cantidad: 4,
        subTotal: 48.0,
        idOrdenServicio: orden3.id,
        idRepuesto: repuesto4.id,
      },
      {
        cantidad: 1,
        subTotal: 110.0,
        idOrdenServicio: orden4.id,
        idRepuesto: repuesto6.id,
      },
      {
        cantidad: 2,
        subTotal: 170.0,
        idOrdenServicio: orden5.id,
        idRepuesto: repuesto5.id,
      },
      {
        cantidad: 1,
        subTotal: 110.0,
        idOrdenServicio: orden6.id,
        idRepuesto: repuesto6.id,
      },
      {
        cantidad: 4,
        subTotal: 48.0,
        idOrdenServicio: orden7.id,
        idRepuesto: repuesto4.id,
      },
      {
        cantidad: 1,
        subTotal: 15.5,
        idOrdenServicio: orden7.id,
        idRepuesto: repuesto2.id,
      },
      {
        cantidad: 1,
        subTotal: 18.0,
        idOrdenServicio: orden7.id,
        idRepuesto: repuesto3.id,
      },
      {
        cantidad: 1,
        subTotal: 15.5,
        idOrdenServicio: orden8.id,
        idRepuesto: repuesto2.id,
      },
      {
        cantidad: 1,
        subTotal: 18.0,
        idOrdenServicio: orden8.id,
        idRepuesto: repuesto3.id,
      },
      {
        cantidad: 2,
        subTotal: 90.0,
        idOrdenServicio: orden9.id,
        idRepuesto: repuesto1.id,
      },
      {
        cantidad: 2,
        subTotal: 170.0,
        idOrdenServicio: orden10.id,
        idRepuesto: repuesto5.id,
      },
      {
        cantidad: 1,
        subTotal: 45.0,
        idOrdenServicio: orden1.id,
        idRepuesto: repuesto1.id,
      },
      {
        cantidad: 1,
        subTotal: 15.5,
        idOrdenServicio: orden3.id,
        idRepuesto: repuesto2.id,
      },
      {
        cantidad: 1,
        subTotal: 18.0,
        idOrdenServicio: orden4.id,
        idRepuesto: repuesto3.id,
      },
      {
        cantidad: 2,
        subTotal: 24.0,
        idOrdenServicio: orden5.id,
        idRepuesto: repuesto4.id,
      },
      {
        cantidad: 1,
        subTotal: 15.5,
        idOrdenServicio: orden6.id,
        idRepuesto: repuesto2.id,
      },
      {
        cantidad: 1,
        subTotal: 18.0,
        idOrdenServicio: orden9.id,
        idRepuesto: repuesto3.id,
      },
    ],
  });

  console.log("Base de datos sembrada con éxito.");
}

main()
  .catch((error) => {
    console.error("Error al ejecutar el seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });