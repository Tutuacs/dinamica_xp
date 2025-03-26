import { t } from "elysia";
import { client } from "../../../client/types";

export const validationSchema = {
    params: t.Object({
        clientId: client.properties.id,
    }),

    response: {
        200: t.Object({
            total: t.Number({default: 0}),
        }),
    },

    detail: {
        name: "ListPendentPayments",
        method: "GET",
        description: "List all pendent payments based on client and return the total",
        tags: ["Payment"],
    }

}