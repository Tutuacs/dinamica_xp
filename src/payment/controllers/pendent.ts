import Elysia from "elysia";
import { validationSchema } from "./validation/pendent";

export const PaymentPendentController = new Elysia({name: "PaymentPendentController"})
    .get("/pendent/:clientId", ({set, params: {clientId}}) => {

        set.status = 200;
        return {
            total: 10,
        }

    },validationSchema);