import Elysia from "elysia";
import { validationSchema } from "./validation/pendent";
import { PaymentRepository } from "../repository/repository";
import { ClientRepository } from "../../client/repository/repository";
import { Client } from "../../client/types";
import { PaymentDb } from "../repository/dbRepository";
import { ClientDb } from "../../client/repository/dbRepository";

export const PaymentPendentController = new Elysia({name: "PaymentPendentController"})
    .decorate("paymentRepository", new PaymentDb())
    .decorate("clientRepository", new ClientDb())
    .get("/pendent", async({paymentRepository, clientRepository}) => {

        const clients = await clientRepository.getClients()

        const clientsPending: Client[] = [];

        for (const client of clients) {
            const total = await paymentRepository.getPendent(client.id);

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