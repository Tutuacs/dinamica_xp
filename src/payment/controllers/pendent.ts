import Elysia from "elysia";
import { validationSchema } from "./validation/pendent";
import { PaymentRepository } from "../repository/repository";

export const PaymentPendentController = new Elysia({name: "PaymentPendentController"})
    .decorate("paymentRepository", new PaymentRepository())
    .get("/pendent/:clientId", ({params: {clientId}, paymentRepository}) => {

        const total = paymentRepository.getPendent(clientId);

        return {
            total,
        }

    },validationSchema);