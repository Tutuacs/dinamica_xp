import Elysia from "elysia";
import { validationSchema } from "./validation/byId";

export const ClientByIdControler = new Elysia({name: "ClientByIdControler"})
    .get("/byId/:id/query", ({set, params: {id}, query}) => {

        if (query.includePayments) {
            set.status = 200;
            return {
                message: `Find a specific client with its payments`
            }
        }

        set.status = 200;
        return {
            message: `Find a specific client`
        }

    }, validationSchema)