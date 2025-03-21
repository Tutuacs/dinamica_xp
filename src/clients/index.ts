import Elysia from "elysia";
import { listClientsHandler } from "./controllers/list";

export const ClientHandler = new Elysia({ name: "ClientHandler", prefix: "/clients", tags: ["Clients"] })
    .use(listClientsHandler)