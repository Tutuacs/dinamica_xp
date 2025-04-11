import Elysia from "elysia";
import { validationSchema } from "./validation/payd";
import { PaymentRepository } from "../repository/repository";
import { ClientRepository } from "../../client/repository/repository";
import { Client } from "../../client/types";
import { PaymentDb } from "../repository/dbRepository";
import { ClientDb } from "../../client/repository/dbRepository";

export const PaymentPaydController = new Elysia({name: "PaymentPaydController"})
    .decorate("paymentRepository", new PaymentDb())
    .decorate("clientRepository", new ClientDb())
    .get("/payd", async({paymentRepository, clientRepository}) => {

        const clients = await clientRepository.getClients()

        const clientsPayd: Client[] = [];

        for (const client of clients) {
            const total = await paymentRepository.getPaydt(client.id);

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