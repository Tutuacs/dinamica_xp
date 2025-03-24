import Elysia from "elysia";
import { validationSchema } from "./validation/list";
import { PaymentQueryStatus } from "../types";

export const ListPaymentController = new Elysia({name: "ListPaymentController", tags: ["Payment"]})
    .get("/list", ({set, query}) => {

        const message = "List all payments based on query status && client";

        if (query.status) {
            if (query.status === PaymentQueryStatus.PAID) {
                console.log("FILTER BY PAID")
            } else if (query.status === PaymentQueryStatus.PENDING) {
                console.log("FILTER BY PENDING")
            }

            if (!query.clientId) {
                console.log("RETURN ALL PAYMENTS")
            }
        }

        if (query.clientId) {
            console.log("FILTER BY CLIENT ID")
        }

        set.status = 200;
        return {
            message,
        }
    }, validationSchema);