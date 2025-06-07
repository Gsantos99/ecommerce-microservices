import express from "express";
import cors from "cors";
import { orderSchema } from "./schemas/orderSchema";
import { validateMiddleware } from "./middlewares/validateMiddleware";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const PORT = 3000;
const app = express();

async function main() {
  app.use(cors());
  app.use(express.json());

  app.get("/health", (req, res) => {
    res.send("OK");
  });

  app.post("/orders", validateMiddleware(orderSchema), (req, res) => {
    const order = req.body;
    console.log("Pedido recebido:", order);
    res.status(201).json({ message: "Pedido criado com sucesso!", order });
  });

  app.use("/", (req, res) => {
    res.send("API de Pedidos está online!🚀");
  });

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
