import express from "express";
import usuarioRouter from "./routes/usuario.route";
import ticketRouter from "./routes/ticket.route";
import authRouter from "./routes/auth.routes";
const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/usuarios", usuarioRouter);
app.use("/tickets", ticketRouter);

app.listen(3000, () => {
  console.log(`servidor corriendo en http://localhost:3000`);
});
