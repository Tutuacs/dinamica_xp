import Elysia from "elysia";
import { ListClient } from "./controllers/list";

export const ClientHandler = new Elysia({name: "ClientHandler", prefix: "/client", tags: ["Client"]})
    .use(ListClient)