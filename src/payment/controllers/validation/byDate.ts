import { t } from "elysia";
import { client } from "../../../client/types";
import { paymentByDate } from "../../types";

export const validationSchema = {

    response: {
        200: t.Object({
            payments: t.Array(paymentByDate)
        }),
    },

    detail: {
        name: "ListPendentPayments",
        method: "GET",
        description: "List all pendent payments based on client and return the total",
        tags: ["Payment"],
    }

}