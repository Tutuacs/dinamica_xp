import Elysia from "elysia";
import { validationSchema } from "./validation/byDate";
import { PaymentRepository } from "../repository/repository";

export const PaymentByDateController = new Elysia({name: "PaymentByDateController"})
    .decorate("paymentRepository", new PaymentRepository())
    .get("/by-date", ({paymentRepository}) => {

        const payments = paymentRepository.getByDate()

        return {
            payments: payments
        }

    },validationSchema);