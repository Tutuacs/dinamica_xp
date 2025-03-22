import Elysia from "elysia";
import { validationSchema } from "./validation/list";

export const ListClientController = new Elysia({name: "ClientByIdControler"})
    .get("/list", ({set}) => {
        set.status = 200;
        
        return {
            message: "List all clients"
        }
    }, validationSchema);