import { trace } from "@opentelemetry/api";

if (!process.env.OTEL_SERVICE_NAME) {
  throw new Error("OTEL_SERVICE_NAME must be set to enable tracing");
}

export const tracer = trace.getTracer(process.env.OTEL_SERVICE_NAME);
