import { t } from "elysia";
import { client } from "../../types";

export const validationSchema = {

    params: t.Object({
        id: t.Number()
    }),

    query: t.Object({
        includePayments: t.Optional(t.Boolean({ default: false }))
    }),

    response: {
        200: t.Object({
            client: client
        }),
        404: t.Object({
            message: t.String()
        })
    },

    detail: {
        name: "ListClient",
        method: "GET",
        description: "Find a specific client with its payments or not",
        tags: ["Client"],
    }
}