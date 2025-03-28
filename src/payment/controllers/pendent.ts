import Elysia from "elysia";
import { validationSchema } from "./validation/pendent";
import { PaymentRepository } from "../repository/repository";
import { ClientRepository } from "../../client/repository/repository";
import { Client } from "../../client/types";

export const PaymentPendentController = new Elysia({name: "PaymentPendentController"})
    .decorate("paymentRepository", new PaymentRepository())
    .decorate("clientRepository", new ClientRepository())
    .get("/pendent", ({paymentRepository, clientRepository}) => {

        const clients = clientRepository.getClients()

        const clientsPending: Client[] = [];

        for (const client of clients) {
            const total = paymentRepository.getPendent(client.id);

            if (total === 0 || !total) {
                continue
            }

            client.pendent = total

            clientsPending.push(client)
        }


        return {
            clients: clientsPending
        }

    },validationSchema);