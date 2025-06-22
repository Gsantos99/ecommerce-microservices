import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { custom, z } from "zod";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from "fastify-type-provider-zod";
import { channels } from "../channels/index.ts";
import { db } from "../db/client.ts";
import { schema } from "../db/schema/index.ts";
import { dispathOrderCreated } from "../broker/messages/order-created.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, { origin: "*" });

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

    dispathOrderCreated({
      amount,
      orderId: crypto.randomUUID(),
      customer: {
        id: "e69ae63a-adf6-4dca-903a-6be85814a92c"
      }
    });

    await db.insert(schema.orders).values({
      id: crypto.randomUUID(),
      customerId: "e69ae63a-adf6-4dca-903a-6be85814a92c",
      amount,
      createdAt: new Date()
    });

    return reply.status(201).send();
  }
);

app.listen({ port: 3333, host: "0.0.0" }).then(() => {
  console.log("App Orders is running 🚀");
});
