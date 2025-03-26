import Elysia from "elysia";
import { validationSchema } from "./validation/list";
import { PaymentRepository } from "../repository/repository";

export const ListPaymentController = new Elysia({name: "ListPaymentController", tags: ["Payment"]})
    .decorate("paymentRepository", new PaymentRepository())
    .get("/list", ({set, query, paymentRepository}) => {


        const consult = paymentRepository.getPayments({id: query.clientId, status: query.status});

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