import express from "express";

import authRouter from "./routes/auth.routes";
import ordenRouter from "./routes/ordenservicio.route";
import detallesrouter from "./routes/detalles.routes";
import usuarioRouter from "./routes/usuario.route";
import repuestoRouter from "./routes/repuesto.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json" assert { type: "json" };

import { verifyToken } from "./middlewares/auth.middleware";

import clienteRouter from "./routes/cliente.routes";
import vehiculoRouter from "./routes/vehiculo.routes";

const app = express();

app.use(express.json());

// Middleware para documentación con Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoints
app.use("/auth", authRouter);
app.use(
  "/usuarios",
  verifyToken,
  /* #swagger.security = [{ "bearerAuth": [] }] */
  usuarioRouter,
);
app.use(
  "/repuestos",
  verifyToken,
  /* #swagger.security = [{ "bearerAuth": [] }] */
  repuestoRouter,
);
app.use(
  "/detalles",
  verifyToken,
  /* #swagger.security = [{ "bearerAuth": [] }] */
  detallesrouter,
);
app.use(
  "/ordenservicio",
  verifyToken,
  /* #swagger.security = [{ "bearerAuth": [] }] */
  ordenRouter,
);

app.use(
  "/clientes",
  verifyToken,
  /* #swagger.security = [{ "bearerAuth": [] }] */
  clienteRouter,
);
app.use(
  "/vehiculos",
  verifyToken,
  /* #swagger.security = [{ "bearerAuth": [] }] */
  vehiculoRouter,
);

// Inicializador de servidor
// console.clear();
app.listen(3000, () => {
  console.log(`[[<API>]]: Servidor corriendo en http://localhost:3000`);
  console.log(
    "[Swagger]: Cargada exitosamente en => http://localhost:3000/api-docs",
  );
});
