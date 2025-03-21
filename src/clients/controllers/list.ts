import Elysia from "elysia";
import { validationSchema } from "./validations/list";

export const listClientsHandler = new Elysia({ name: "listClientsHandler" })
    .get("/", ({set}) => {
        set.status = 200

        return {
            message: "list users"
        }

    }, validationSchema)