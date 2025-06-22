import { broker } from "../broker/broker.ts";

export const orders = await broker.createChannel();

await orders.assertQueue("orders");
