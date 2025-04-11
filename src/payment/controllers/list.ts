import Elysia from "elysia";
import { validationSchema } from "./validation/list";
import { PaymentRepository } from "../repository/repository";
import { PaymentDb } from "../repository/dbRepository";

export const ListPaymentController = new Elysia({name: "ListPaymentController", tags: ["Payment"]})
    .decorate("paymentRepository", new PaymentDb())
    .get("/list", async({set, query, paymentRepository}) => {

        const consult = await paymentRepository.getPayments({id: query.clientId, status: query.status});

        if (consult.length === 0) {
            set.status = 404;
            return {
                message: "This client has no payments"
            }
        }

        return {
            payments: consult,
        }

    }, validationSchema);