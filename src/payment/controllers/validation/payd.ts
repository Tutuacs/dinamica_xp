import { t } from "elysia";
import { client } from "../../../client/types";

export const validationSchema = {

    response: {
        200: t.Object({
            clients: t.Array(client)
        }),
    },

    detail: {
        name: "ListPendentPayments",
        method: "GET",
        description: "List all pendent payments based on client and return the total",
        tags: ["Payment"],
    }

}