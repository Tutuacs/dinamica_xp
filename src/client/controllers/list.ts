import Elysia from "elysia";
import { validationSchema } from "./validation/list";
import { ClientRepository } from "../repository/repository";

export const ListClientController = new Elysia({name: "ClientByIdControler"})
    .decorate('clientRepository', new ClientRepository())
    .get("/list", ({clientRepository}) => {

        const consult = clientRepository.getClients();

        if (consult instanceof Array) {

            return {
                clients: consult
            }
        }

        return {
            clients: [consult]
        }


    }, validationSchema);