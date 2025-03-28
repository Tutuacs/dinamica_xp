import Elysia from "elysia";
import { validationSchema } from "./validation/payd";
import { PaymentRepository } from "../repository/repository";
import { ClientRepository } from "../../client/repository/repository";
import { Client } from "../../client/types";

export const PaymentPaydController = new Elysia({name: "PaymentPaydController"})
    .decorate("paymentRepository", new PaymentRepository())
    .decorate("clientRepository", new ClientRepository())
    .get("/payd", ({paymentRepository, clientRepository}) => {

        const clients = clientRepository.getClients()

        const clientsPayd: Client[] = [];

        for (const client of clients) {
            const total = paymentRepository.getPaydt(client.id);

            if (!total) {
                client.payd = 0
            }

            client.payd = total

            clientsPayd.push(client)
        }


        return {
            clients: clientsPayd
        }

    }, validationSchema);