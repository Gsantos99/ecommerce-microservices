import "../broker/subscriber.ts";

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

app.register(fastifyCors, { origin: "*" });

app.get("/health", (_, reply) => {
  return reply.status(200).send("Hello from Orders!");
});

app.listen({ port: 3334, host: "0.0.0" }).then(() => {
  console.log("App Invoices is running 🚀");
});
