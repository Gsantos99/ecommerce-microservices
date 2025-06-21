import { channels } from "../channels/index.ts";

channels.orders.consume(
  "orders",
  async message => {
    if (!message) {
      console.error("Received null message");
      return;
    }

    try {
      const data = JSON.parse(message.content.toString());
      console.log("Order created received:", data);
    } catch (error) {
      console.error("Error processing message:", error);
    }

    channels.orders.ack(message);
  },
  {
    noAck: false
  }
);
