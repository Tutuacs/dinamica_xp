import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { treaty } from "@elysiajs/eden";
import { PaymentHandler } from "./payment";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(PaymentHandler)

app.listen(3000);

export const edenTester = treaty(app);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type app = typeof app;