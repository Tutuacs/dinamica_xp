import Elysia from "elysia";
import { validationSchema } from "./validation/byId";
import { ClientRepository } from "../repository/repository";
import { client } from "../types";

export const ClientByIdControler = new Elysia({name: "ClientByIdControler"})
    .decorate('clientRepository', new ClientRepository())
    .get("/byId/:id", ({set, params: {id}, query, clientRepository}) => {

        const consult = clientRepository.getClient(id, query.includePayments);

        if (!consult || consult instanceof Array && consult.length === 0) {
            set.status = 404;
            return {
                message: `Client ${id} not found`
            }
        }

        if (consult instanceof Array) {
            return {
                client: consult[0]
            }
        }

        return {
            client: consult
        }

    }, validationSchema)