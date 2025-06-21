import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { z } from "zod";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from "fastify-type-provider-zod";
import { channels } from "../channels/index.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", (request, reply) => {
  return reply.status(200).send("Hello from Orders!");
});

app.post(
  "/orders",
  {
    schema: {
      body: z.object({
        amount: z.coerce.number()
      })
    }
  },
  async (request, reply) => {
    const { amount } = request.body;
    console.log("Order received:", amount);
    channels.orders.sendToQueue(
      "orders",
      Buffer.from(JSON.stringify({ amount }))
    );
    return reply.status(201).send();
  }
);

app.listen({ port: 3333, host: "0.0.0" }).then(() => {
  console.log("App Orders is running 🚀");
});
