import express from "express";
import type { Request, Response } from "express";

import ordenRouter from "./routes/ordenservicio.route"
import usuarioRouter from "./routes/usuario.route";
import authRouter from "./routes/auth.routes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json" assert { type: "json" };

import { verifyToken } from "./middlewares/auth.middleware";

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
  "/ordenservicio",
  verifyToken,
  /* #swagger.security = [{ "bearerAuth": [] }] */
  ordenRouter,
);


// Inicializador de servidor
app.listen(3000, () => {
  console.log(`[[<API>]]: Servidor corriendo en http://localhost:3000`);
  console.log(
    "[Swagger]: Cargada exitosamente en => http://localhost:3000/api-docs",
  );
});
