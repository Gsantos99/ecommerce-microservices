import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { z } from "zod";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from "fastify-type-provider-zod";

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
        amout: z.number()
      })
    }
  },
  (request, reply) => {
    const { amout } = request.body;
    console.log("Order received:", amout);
    return reply.status(201).send();
  }
);

app.listen({ port: 3333, host: "0.0.0" }).then(() => {
  console.log("App Orders is running 🚀");
});
