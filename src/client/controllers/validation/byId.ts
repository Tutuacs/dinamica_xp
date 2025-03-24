import { t } from "elysia";

export const validationSchema = {

    params: t.Object({
        id: t.Number()
    }),

    query: t.Object({
        includePayments: t.Optional(t.Boolean({default: false}))
    }),

    response: {
        200: t.Union([
            t.Object({
                message: t.String()
            }),
            t.Object({
                message: t.String()
            })
        ]),
        404: t.Object({
            message: t.Literal("Client not found")
        })
    },

    detail: {
        name: "ListClient",
        method: "GET",
        description: "Find a specific client with its payments or not",
        tags: ["Client"],
    }
}