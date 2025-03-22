import Elysia from "elysia";
import { validationSchema } from "./validation/list";

export const ListClient = new Elysia({name: "ListClient"})
    .get("/list", ({set}) => {
        set.status = 200;
        
        return {
            message: "List all clients"
        }
    }, validationSchema);