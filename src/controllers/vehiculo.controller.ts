import type { Request, Response } from "express";
import { VehiculoModel } from "../models/vehiculo.model";
import { ClienteModel } from "../models/cliente.model";

export const getVehiculos = async (req: Request, res: Response) => {
  try {
    const vehiculos = await VehiculoModel.getAll();

    return res.status(200).json({
      data: vehiculos,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error al obtener los vehículos",
    });
  }
};

export const getVehiculoPorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "El ID debe ser un número",
      });
    }

    const vehiculo = await VehiculoModel.getById(id);

    if (!vehiculo) {
      return res.status(404).json({
        message: "Vehículo no encontrado",
      });
    }

    return res.status(200).json({
      data: vehiculo,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error al obtener el vehículo",
    });
  }
};

export const postVehiculo = async (req: Request, res: Response) => {
  try {
    const { placa, marca, modelo, idCliente } = req.body;
    if (
      typeof placa !== "string" ||
      typeof marca !== "string" ||
      typeof modelo !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "La placa, marca y modelo deben ser texto" });
    }
    const placaLimpia = placa.trim();
    const marcaLimpia = marca.trim();
    const modeloLimpio = modelo.trim();
    if (!placaLimpia || !marcaLimpia || !modeloLimpio) {
      return res
        .status(400)
        .json({ message: "La placa, marca y modelo no pueden estar vacíos" });
    }
    const clienteId = Number(idCliente);
    if (!Number.isInteger(clienteId) || clienteId <= 0) {
      return res.status(400).json({
        message: "El idCliente debe ser un número entero mayor que 0",
      });
    }
    const cliente = await ClienteModel.getById(clienteId);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    const vehiculo = await VehiculoModel.crear({
      placa: placaLimpia,
      marca: marcaLimpia,
      modelo: modeloLimpio,
      idCliente: clienteId,
    });
    return res
      .status(201)
      .json({ message: "Vehículo creado con éxito", data: vehiculo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al crear el vehículo" });
  }
};
export const putVehiculo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res
        .status(400)
        .json({ message: "El ID debe ser un número entero mayor que 0" });
    }
    const { placa, marca, modelo, idCliente } = req.body;
    if (
      typeof placa !== "string" ||
      typeof marca !== "string" ||
      typeof modelo !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "La placa, marca y modelo deben ser texto" });
    }
    const placaLimpia = placa.trim();
    const marcaLimpia = marca.trim();
    const modeloLimpio = modelo.trim();
    if (!placaLimpia || !marcaLimpia || !modeloLimpio) {
      return res
        .status(400)
        .json({ message: "La placa, marca y modelo no pueden estar vacíos" });
    }
    const clienteId = Number(idCliente);
    if (!Number.isInteger(clienteId) || clienteId <= 0) {
      return res
        .status(400)
        .json({
          message: "El idCliente debe ser un número entero mayor que 0",
        });
    }
    const cliente = await ClienteModel.getById(clienteId);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    const vehiculo = await VehiculoModel.actualizar(id, {
      placa: placaLimpia,
      marca: marcaLimpia,
      modelo: modeloLimpio,
      idCliente: clienteId,
    });
    return res
      .status(200)
      .json({ message: "Vehículo actualizado con éxito", data: vehiculo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al actualizar el vehículo" });
  }
};
