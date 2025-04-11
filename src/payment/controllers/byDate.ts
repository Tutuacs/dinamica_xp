import Elysia from "elysia";
import { validationSchema } from "./validation/byDate";
import { PaymentRepository } from "../repository/repository";
import { PaymentDb } from "../repository/dbRepository";

export const PaymentByDateController = new Elysia({name: "PaymentByDateController"})
    .decorate("paymentRepository", new PaymentDb())
    .get("/by-date", async({paymentRepository}) => {

        const payments = await paymentRepository.getByDate()

        return {
            payments: payments
        }

    },validationSchema);