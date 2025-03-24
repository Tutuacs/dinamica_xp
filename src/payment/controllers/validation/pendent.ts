import { t } from "elysia";

export const validationSchema = {
    params: t.Object({
        clientId: t.String()
    }),

    response: {
        200: t.Object({
            total: t.Number(),
        })
    },

    detail: {
        name: "ListPendentPayments",
        method: "GET",
        description: "List all pendent payments based on client and return the total",
        tags: ["Payment"],
    }
}