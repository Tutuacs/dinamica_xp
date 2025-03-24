import Elysia from "elysia";
import { validationSchema } from "./validation/byId";
import { ClienteRepository } from "../repository/repository";

export const ClientByIdControler = new Elysia({name: "ClientByIdControler"})
    .get("/byId/:id", ({set, params: {id}, query}) => {

        const clienteRepository = new ClienteRepository();

        if (query.includePayments) {
            clienteRepository.getClientes({clientId: id, includePayments: query.includePayments});
            set.status = 200;
            return {
                message: `Find a specific client with its payments`
            }
        }


        clienteRepository.getClientes({clientId: id});

        set.status = 200;
        return {
            message: `Find a specific client`
        }

    }, validationSchema)