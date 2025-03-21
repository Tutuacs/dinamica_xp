import { Elysia } from "elysia";
import { treaty } from '@elysiajs/eden'
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { ClientHandler } from "./clients";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(ClientHandler)

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export const api = treaty(app)