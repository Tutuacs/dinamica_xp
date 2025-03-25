import Elysia from "elysia";
import { ListClientController } from "./controllers/list";
import { ClientByIdControler } from "./controllers/byId";

export const ClientHandler = new Elysia({ name: "ClientHandler", prefix: "/client", tags: ["Client"] })
    .use(ListClientController)
    .use(ClientByIdControler);
